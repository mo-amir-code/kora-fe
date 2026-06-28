import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

import { formatCurrencyAmount } from "../../../lib/currency";

/**
 * Common formatting for Invoice Currency
 */
export const formatInvoiceCurrency = (amount: number | string, currencyCode: string = "USD") => {
  const value = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
  return formatCurrencyAmount(value || 0, currencyCode);
};

/**
 * Standardized Date Formatting for Invoices (en-GB/en-IN style)
 */
export const formatInvoiceDate = (date: string | Date) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return String(date);
  return parsed.toLocaleDateString("en-GB", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric" 
  });
};

/**
 * Centralized PDF Generation Logic
 * Fixes "blank PDF" issues by ensuring proper capture settings and cloning
 */
export const generateInvoicePDF = async (elementId: string, filename: string) => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  const toastId = toast.loading("Generating PDF...");

  try {
    // We use a small delay to ensure any dynamic content/images are rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      // Important for blank PDF fix: Ensure we capture even if scrolled
      windowWidth: 820, 
      windowHeight: 1150,
      onclone: (clonedDoc) => {
        // ULTRA-AGGRESSIVE FIX: html2canvas can crash on 'oklch' or modern CSS
        const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach(s => s.remove());

        const allElements = clonedDoc.body.querySelectorAll('*');
        allElements.forEach((el: any) => {
          const styleAttr = el.getAttribute('style') || '';
          if (styleAttr.includes('oklch')) {
            el.setAttribute('style', styleAttr.replace(/oklch\([^)]*\)/g, '#101828'));
          }
          // Fix for visibility in clone
          if (el.id === elementId) {
             el.style.position = 'static';
             el.style.left = '0';
             el.style.visibility = 'visible';
          }
          if (el.classList.contains('bg-brand-500')) el.style.backgroundColor = '#465fff';
          if (el.classList.contains('text-white')) el.style.color = '#ffffff';
          el.style.boxShadow = 'none';
        });

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
        `;
        clonedDoc.head.appendChild(minimalStyle);
      }
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename || 'invoice'}.pdf`);
    
    toast.success("PDF generated!", { id: toastId });
  } catch (error) {
    console.error("PDF Generation error:", error);
    toast.error("Failed to generate PDF", { id: toastId });
  }
};
