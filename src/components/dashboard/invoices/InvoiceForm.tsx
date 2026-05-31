"use client";

import React, { useState, useEffect } from "react";
import { 
  LuPlus, 
  LuTrash2, 
  LuDownload, 
  LuSave, 
  LuMail, 
  LuMessageCircle,
  LuChevronDown,
  LuCalendar,
  LuArrowLeft
} from "react-icons/lu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { useRouter } from "next/navigation";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

interface InvoiceFormProps {
  initialData?: any;
  mode: "create" | "edit";
}

const InvoiceForm = ({ initialData, mode }: InvoiceFormProps) => {
  const router = useRouter();
  const [lineItems, setLineItems] = useState<LineItem[]>(
    initialData?.lineItems || [
      { id: "1", description: "", qty: 1, rate: 0, amount: 0 }
    ]
  );
  const [applyGst, setApplyGst] = useState(initialData?.applyGst ?? true);
  const [formData, setFormData] = useState({
    deal: initialData?.deal || "TechBrand Q3 Sponsorship (Deliverable 2/2)",
    invoiceNumber: initialData?.invoiceNumber || "INV-2023-089",
    issueDate: initialData?.issueDate || "10/24/2023",
    dueDate: initialData?.dueDate || "11/07/2023",
    from: {
      legalName: initialData?.from?.legalName || "Priya Sharma",
      upiId: initialData?.from?.upiId || "priya@upi",
      accountNo: initialData?.from?.accountNo || "XXXX-XXX",
      ifsc: initialData?.from?.ifsc || "HDFC000123"
    },
    billTo: {
      brandName: initialData?.billTo?.brandName || "TechBrand India Pvt. Ltd.",
      contact: initialData?.billTo?.contact || "accounting@techbrand.in",
      gstin: initialData?.billTo?.gstin || "27ABCDE1234F1Z5"
    }
  });

  const subtotal = lineItems.reduce((acc, item) => acc + item.amount, 0);
  const gstAmount = applyGst ? subtotal * 0.18 : 0;
  const total = subtotal + gstAmount;

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Math.random().toString(), description: "", qty: 1, rate: 0, amount: 0 }
    ]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const handleUpdateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          updatedItem.amount = Number(updatedItem.qty) * Number(updatedItem.rate);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const goBack = () => router.push('/dashboard/invoices');

  const downloadPDF = async () => {
    const input = document.getElementById("invoice-form-printable");
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // ULTRA-AGGRESSIVE FIX: html2canvas has a fragile CSS parser that crashes on 'oklch'.
          // We don't just remove styles, we globally purge any oklch string from the clone.
          
          // 1. Remove all external/internal styles that might contain oklch
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(s => s.remove());

          // 2. Clear all inline styles that might use oklch or complex modern CSS
          const allElements = clonedDoc.body.querySelectorAll('*');
          allElements.forEach((el: any) => {
            const styleAttr = el.getAttribute('style') || '';
            if (styleAttr.includes('oklch')) {
              el.setAttribute('style', styleAttr.replace(/oklch\([^)]*\)/g, '#101828'));
            }
            // Ensure contrast for specific components
            if (el.classList.contains('bg-brand-500')) el.style.backgroundColor = '#465fff';
            if (el.classList.contains('text-white')) el.style.color = '#ffffff';
            el.style.boxShadow = 'none';
          });

          // 3. Inject a standard-compliant, legacy-safe base stylesheet
          const minimalStyle = clonedDoc.createElement('style');
          minimalStyle.innerHTML = `
            * { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important; 
              border-color: #e2e8f0 !important; 
              color-scheme: light !important;
            }
            .font-black { font-weight: 900 !important; }
            .uppercase { text-transform: uppercase !important; }
            .italic { font-style: italic !important; }
            .bg-brand-500 { background-color: #465fff !important; color: #ffffff !important; }
            .bg-emerald-500 { background-color: #10b981 !important; color: #ffffff !important; }
            .text-slate-900 { color: #0f172a !important; }
            .text-slate-400 { color: #94a3b8 !important; }
            .bg-white { background-color: #ffffff !important; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .border-slate-900 { border-color: #0f172a !important; }
            input, select { background-color: #f8fafc !important; border-radius: 8px !important; }
          `;
          clonedDoc.head.appendChild(minimalStyle);
        }
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("PDF Generation error:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 px-4 sm:px-6">
      {/* Header with Go Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white uppercase tracking-[0.3em] transition-colors mb-4 italic"
          >
            <LuArrowLeft size={14} />
            Back to Dashboard
          </button>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
            {mode === 'edit' ? 'Edit' : 'New'} Invoice
          </h1>
          <p className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] italic">Manage your professional billing</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-2 rounded-3xl border border-slate-200 dark:border-white/10 self-start sm:self-auto">
          <div className="px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-none border border-slate-200 dark:border-white/5">
            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest italic">{formData.invoiceNumber}</span>
          </div>
          <div className="px-5 py-3">
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest italic">Draft Mode</span>
          </div>
        </div>
      </div>

      <div id="invoice-form-printable" className="space-y-6">
        {/* Link to Deal Section */}
        <div className="bg-white dark:bg-gray-800/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 space-y-4">
          <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.25em] italic">Link to Deal</label>
          <div className="relative">
            <select 
              className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4.5 text-sm font-black text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none italic"
              value={formData.deal}
              onChange={(e) => setFormData({...formData, deal: e.target.value})}
            >
              <option>{formData.deal}</option>
              <option>Project Alpha Sponsorship</option>
              <option>Nike Campaign Q4</option>
            </select>
            <LuChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Invoice Meta Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Invoice Number", value: formData.invoiceNumber, key: 'invoiceNumber' },
            { label: "Issue Date", value: formData.issueDate, key: 'issueDate', isDate: true },
            { label: "Due Date", value: formData.dueDate, key: 'dueDate', isDate: true }
          ].map((item) => (
            <div key={item.key} className="bg-white dark:bg-gray-800/40 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/10 space-y-3">
              <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.25em] italic">{item.label}</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={item.value}
                  onChange={(e) => setFormData({...formData, [item.key]: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                />
                {item.isDate && <LuCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
              </div>
            </div>
          ))}
        </div>

        {/* Parties Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* From */}
          <div className="bg-white dark:bg-gray-800/40 p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] italic">From</h3>
              <button className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] italic">Edit Profile</button>
            </div>
            <div className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">Legal Name</label>
                <input 
                  type="text" 
                  value={formData.from.legalName}
                  onChange={(e) => setFormData({...formData, from: {...formData.from, legalName: e.target.value}})}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">UPI ID</label>
                <input 
                  type="text" 
                  value={formData.from.upiId}
                  onChange={(e) => setFormData({...formData, from: {...formData.from, upiId: e.target.value}})}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">Account No.</label>
                  <input 
                    type="text" 
                    value={formData.from.accountNo}
                    className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">IFSC</label>
                  <input 
                    type="text" 
                    value={formData.from.ifsc}
                    className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="bg-white dark:bg-gray-800/40 p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] italic">Bill To</h3>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/5 italic">Auto-filled</span>
            </div>
            <div className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">Brand / Agency Name</label>
                <input 
                  type="text" 
                  value={formData.billTo.brandName}
                  onChange={(e) => setFormData({...formData, billTo: {...formData.billTo, brandName: e.target.value}})}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic opacity-70"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">Contact Person / Email</label>
                <input 
                  type="text" 
                  value={formData.billTo.contact}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] italic">GSTIN (Optional)</label>
                <input 
                  type="text" 
                  value={formData.billTo.gstin}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Section */}
        <div className="bg-white dark:bg-gray-800/40 p-6 sm:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/10 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] italic">Line Items</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-6 px-4 hidden sm:grid opacity-60">
              <div className="col-span-6 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic">Description</div>
              <div className="col-span-1 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic text-center">Qty</div>
              <div className="col-span-2 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic text-center">Rate (₹)</div>
              <div className="col-span-2 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic text-right">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {lineItems.map((item) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-slate-50/50 dark:bg-gray-900/30 p-4 sm:p-2 rounded-3xl sm:rounded-none border border-slate-100 dark:border-white/5 sm:border-none">
                <div className="col-span-1 sm:col-span-6">
                  <input 
                    type="text" 
                    placeholder="E.g. Brand Collaboration / Video Production"
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-black text-slate-900 dark:text-white focus:outline-none italic"
                    value={item.description}
                    onChange={(e) => handleUpdateLineItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <input 
                    type="number" 
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/5 rounded-2xl px-2 py-4 text-sm font-black text-center text-slate-900 dark:text-white focus:outline-none italic"
                    value={item.qty}
                    onChange={(e) => handleUpdateLineItem(item.id, 'qty', e.target.value)}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <input 
                    type="number" 
                    className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-4 text-sm font-black text-center text-slate-900 dark:text-white focus:outline-none italic"
                    value={item.rate}
                    onChange={(e) => handleUpdateLineItem(item.id, 'rate', e.target.value)}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 text-right">
                  <div className="space-y-0.5 px-2">
                    <p className="text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-widest italic leading-none">Total</p>
                    <p className="text-base font-black text-slate-900 dark:text-white italic">₹{item.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-1 flex justify-center">
                  <button 
                    onClick={() => handleRemoveLineItem(item.id)}
                    className="p-3 rounded-2xl text-slate-400 dark:text-gray-600 active:scale-95 border border-slate-200 dark:border-white/10"
                  >
                    <LuTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button 
              onClick={handleAddLineItem}
              className="w-full py-5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] italic flex items-center justify-center gap-3 transition-colors"
            >
              <LuPlus size={16} />
              Add line item
            </button>
          </div>

          <div className="pt-10 space-y-6 border-t border-slate-100 dark:border-white/5">
            <div className="flex flex-col gap-6">
              {/* Subtotal Row - Extreme Left */}
              <div className="flex justify-between items-center w-full px-4 border-l-4 border-slate-900 dark:border-white py-2 bg-slate-50 dark:bg-white/5">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic">Subtotal</span>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Net Amount Before Tax</p>
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter italic">₹{subtotal.toLocaleString()}</span>
              </div>
              
              {/* GST Block - Repositioned/Refined */}
              <div className="flex justify-between items-center w-full px-6 py-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="peer hidden" 
                      checked={applyGst}
                      onChange={(e) => setApplyGst(e.target.checked)}
                    />
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-900 dark:border-white peer-checked:bg-brand-500 peer-checked:border-brand-500 flex items-center justify-center transition-all shadow-none">
                      <LuPlus className={`text-white transition-opacity duration-200 ${applyGst ? 'opacity-100' : 'opacity-0'}`} size={14} strokeWidth={4} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] italic">Apply 18% GST</span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Integrated Goods and Services Tax</p>
                  </div>
                </label>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 dark:text-gray-600 uppercase tracking-widest italic leading-none mb-1">Tax Amount</p>
                  <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">+ ₹{gstAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Due Section - Clean & Prominent */}
              <div className="w-full pt-10 border-t-2 border-slate-900 dark:border-white flex justify-between items-end px-4">
                <div className="space-y-1">
                  <span className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] italic leading-tight">Total Due</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Invoice Final Settlement</p>
                </div>
                <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-10">
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-5 rounded-[2rem] border-2 border-slate-900 dark:border-white text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] bg-white dark:bg-transparent transition-all active:scale-95 italic">
          <LuSave size={20} />
          Save Draft
        </button>
        <button 
          onClick={downloadPDF}
          className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-5 rounded-[2rem] border-2 border-slate-900 dark:border-white text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] bg-white dark:bg-transparent transition-all active:scale-95 italic"
        >
          <LuDownload size={20} />
          Download PDF
        </button>
        <div className="flex w-full sm:w-auto gap-4">
          <button className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] bg-emerald-500 text-white text-[11px] font-black uppercase tracking-[0.2em] italic shadow-none">
            <LuMessageCircle size={18} />
            WhatsApp
          </button>
          <button className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] bg-brand-500 text-white text-[11px] font-black uppercase tracking-[0.2em] italic shadow-none">
            <LuMail size={18} />
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
