import type { EarningsCurrency, EarningsDashboard } from '@/services/earnings.service';

export function currentMonthKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function shiftMonth(month: string, offset: number) {
  const [year, monthNumber] = month.split('-').map(Number);
  const date = new Date(year, monthNumber - 1 + offset, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatMonth(month: string) {
  return new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatEarningsCurrency(amount: number, currency: EarningsCurrency) {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactCurrency(amount: number, currency: EarningsCurrency) {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

export function formatEarningsDate(date: string | null) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeCsv(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function downloadEarningsCsv(data: EarningsDashboard) {
  const rows = [
    ['Brand', 'Deal', 'Value', 'Currency', 'Platform', 'Status', 'Paid Date'],
    ...data.recentDeals.map((deal) => [
      deal.brandName,
      deal.dealTitle,
      deal.value,
      deal.currency,
      deal.platforms.join(' | '),
      deal.status,
      deal.paidDate ? formatEarningsDate(deal.paidDate) : '',
    ]),
  ];
  const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `kora-earnings-${data.period}-${data.filter}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
