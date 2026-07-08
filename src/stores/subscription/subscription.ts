import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { billingService } from "@/services/billing.service";

export interface Transaction {
  id: string;
  amount: string;
  status: "Succeeded" | "Pending" | "Failed";
  date: string;
}

export interface SubscriptionState {
  plan: "FREE" | "PRO";
  billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY" | null;
  planExpiresAt: string | null;
  status: string | null;
  cancelAtPeriodEnd: boolean;
  transactions: Transaction[];
  isLoading: boolean;
  isProcessingPayment: boolean;
  setProcessingPayment: (val: boolean) => void;
  fetchUserPlanOnly: () => Promise<void>;
  fetchCurrentPlan: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  upgrade: (cycle: "MONTHLY" | "QUARTERLY" | "YEARLY") => Promise<void>;
  cancelSubscription: () => Promise<void>;
  resetToFree: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      plan: "FREE",
      billingCycle: null,
      planExpiresAt: null,
      status: null,
      cancelAtPeriodEnd: false,
      transactions: [],
      isLoading: false,
      isProcessingPayment: false,
      setProcessingPayment: (val) => set({ isProcessingPayment: val }),

      fetchUserPlanOnly: async () => {
        try {
          const { profileService } = await import("@/services/profile.service");
          const userData = await profileService.getMe();
          set({ plan: userData.plan as "FREE" | "PRO" });
        } catch (error) {
          console.error("Failed to fetch user plan only:", error);
        }
      },

      fetchCurrentPlan: async () => {
        try {
          const planData = await billingService.getCurrentPlan();
          set({
            plan: planData.plan,
            billingCycle: planData.billingCycle,
            planExpiresAt: planData.planExpiresAt
              ? new Date(planData.planExpiresAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : null,
            status: planData.status || null,
            cancelAtPeriodEnd: planData.cancelAtPeriodEnd || false,
          });
        } catch (error) {
          console.error("Failed to fetch current plan:", error);
        }
      },

      fetchTransactions: async () => {
        try {
          const txs = await billingService.getTransactions();
          set({ transactions: txs });
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      },

      upgrade: async (cycle) => {
        set({ isLoading: true });
        try {
          const state = useSubscriptionStore.getState();
          const isCancelledAndActive = state.plan === "PRO" && (state.status === "CANCELLED" || state.cancelAtPeriodEnd);
          const isFree = state.plan === "FREE";

          if (isCancelledAndActive || isFree) {
            const res = await billingService.createCheckoutSession(cycle);
            if (res && res.checkoutUrl) {
              // Set isProcessingPayment to true ONLY before redirecting
              set({ isProcessingPayment: true });
              window.location.href = res.checkoutUrl;
              return;
            }
          } else {
            await billingService.changePlan(cycle);
          }
          const planData = await billingService.getCurrentPlan();
          set({
            plan: planData.plan,
            billingCycle: planData.billingCycle,
            planExpiresAt: planData.planExpiresAt
              ? new Date(planData.planExpiresAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : null,
            status: planData.status || null,
            cancelAtPeriodEnd: planData.cancelAtPeriodEnd || false,
          });
          const txs = await billingService.getTransactions();
          set({ transactions: txs });
        } catch (error) {
          console.error("Failed to upgrade subscription:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      cancelSubscription: async () => {
        set({ isLoading: true });
        try {
          await billingService.cancelSubscription();
          const planData = await billingService.getCurrentPlan();
          set({
            plan: planData.plan,
            billingCycle: planData.billingCycle,
            planExpiresAt: planData.planExpiresAt
              ? new Date(planData.planExpiresAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : null,
            status: planData.status || null,
            cancelAtPeriodEnd: planData.cancelAtPeriodEnd || false,
          });
          const txs = await billingService.getTransactions();
          set({ transactions: txs });
        } catch (error) {
          console.error("Failed to cancel subscription:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetToFree: () =>
        set({
          plan: "FREE",
          billingCycle: null,
          planExpiresAt: null,
          status: null,
          cancelAtPeriodEnd: false,
          transactions: [],
          isProcessingPayment: false,
        }),
    }),
    {
      name: "kora-subscription",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
