import { useQuery } from '@tanstack/react-query';
import { calendarService } from '@/services/calendar.service';

export function useCalendarEvents(startDate: Date, endDate: Date) {
  return useQuery({
    queryKey: ['calendar-events', startDate.toISOString(), endDate.toISOString()],
    queryFn: () => calendarService.getEvents(startDate, endDate),
  });
}
