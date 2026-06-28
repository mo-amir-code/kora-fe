import { useProfile } from './useProfile';
import { getCurrencySymbol, formatCurrencyAmount } from '@/lib/currency';

export function useCurrency() {
  const { data: profile } = useProfile();
  const baseCurrency = profile?.settings?.baseCurrency || 'USD';
  const symbol = getCurrencySymbol(baseCurrency);

  const format = (amount: number | string, itemCurrency?: string) => {
    return formatCurrencyAmount(amount, itemCurrency || baseCurrency);
  };

  return {
    baseCurrency,
    symbol,
    format,
  };
}
