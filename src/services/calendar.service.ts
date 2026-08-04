import api from "@/lib/axios";

export interface CalendarEvent {
  id: string;
  type: "DELIVERABLE" | "PAYMENT_DUE_SOON" | "EXCLUSIVITY_END" | "INVOICE_DUE" | "FOLLOW_UP";
  date: string;
  title: string;
  subtitle?: string;
  status: "brand" | "success" | "warning" | "danger";
  meta: any;
}

export const calendarService = {
  getEvents: async (startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
    const response = await api.get("/calendar", {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data.data;
  },
};
