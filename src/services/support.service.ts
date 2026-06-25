import api from "@/lib/axios";

export interface SupportInquiryPayload {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export const supportService = {
  submitInquiry: (data: SupportInquiryPayload) =>
    api.post("/support", data),
};
