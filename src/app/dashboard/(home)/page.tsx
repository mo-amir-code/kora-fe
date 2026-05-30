"use client"
import DeadlineCard from "@/components/dashboard/home/deadline"
import Greeting from "@/components/dashboard/home/greeting"
import PaymentStatus from "@/components/dashboard/home/paymentstatus/PaymentStatus"
import RecentActivity from "@/components/dashboard/home/recent-activity"
import ActiveDeals from "@/components/dashboard/home/active-deals"
import { LuWallet, LuClock, LuCircleAlert, LuCircleCheck, LuFileText, LuBell, LuSparkles } from "react-icons/lu"

const ACTIVITIES = [
  {
    id: 1,
    type: "delivered" as const,
    entityName: "Spotify Promo",
    suffix: "delivered",
    time: "2 hours ago",
    icon: LuCircleCheck,
  },
  {
    id: 2,
    type: "invoice" as const,
    prefix: "Invoice sent to",
    entityName: "Zomato",
    amount: "₹35,000",
    time: "5 hours ago",
    icon: LuFileText,
  },
  {
    id: 3,
    type: "reminder" as const,
    prefix: "Reminder sent to",
    entityName: "Nykaa",
    time: "Yesterday, 14:30",
    icon: LuBell,
  },
  {
    id: 4,
    type: "pitch" as const,
    prefix: "New deal pitched:",
    entityName: "Bumble",
    time: "Yesterday, 10:15",
    icon: LuSparkles,
  },
];

const ACTIVE_DEALS = [
  {
    id: 1,
    dealName: "Nykaa Summer Campaign",
    brandName: "Nykaa",
    status: "pitched" as const,
    progress: "1/3",
    amount: "₹45,000",
    dueStatus: "Due: 28 May",
    logoInitial: "N",
  },
  {
    id: 2,
    dealName: "Nike Run Club Reel",
    brandName: "Nike",
    status: "in-progress" as const,
    progress: "2/3",
    amount: "₹30,000",
    dueStatus: "Due: Tomorrow",
    dueStatusType: "urgent" as const,
    logoInitial: "N",
  },
  {
    id: 3,
    dealName: "Spotify Playlist Promo",
    brandName: "Spotify",
    status: "delivered" as const,
    progress: "3/3",
    amount: "₹25,000",
    dueStatus: "Awaiting Invoice",
    logoInitial: "S",
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <Greeting name="Priya" />

      {/* Payment Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PaymentStatus
          title="Total Earned"
          amount="₹42,000"
          icon={LuWallet}
          variant="success"
          trendAmount="+₹8,000 vs last month"
          trendType="up"
        />

        <PaymentStatus
          title="Pending Payments"
          amount="₹26,000"
          icon={LuCircleAlert}
          variant="warning"
          subtitle="3 invoices pending"
        />

        <PaymentStatus
          title="Overdue"
          amount="₹18,000"
          icon={LuClock}
          variant="danger"
          subtitle="2 deals need follow-up"
        />
      </div>

      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-10">
          {/* Deadline Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
              Deadlines this week
            </h2>
            <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
              <DeadlineCard
                brandName="Brand A"
                itemCount={5}
                itemType="Reels"
                status="today"
                statusLabel="Due Today"
                avatarUrl="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=100&h=100&auto=format&fit=crop"
              />
              <DeadlineCard
                brandName="Brand B"
                itemCount={3}
                itemType="Stories"
                status="tomorrow"
                statusLabel="Due Tomorrow"
                avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
              />
              <DeadlineCard
                brandName="Brand C"
                itemCount={2}
                itemType="Invoices"
                status="upcoming"
                statusLabel="Oct 12"
                avatarUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop"
              />
              <DeadlineCard
                brandName="Brand D"
                itemCount={1}
                itemType="Reel"
                status="today"
                statusLabel="Due Today"
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
              />
            </div>
          </section>

          {/* Active Deals Section */}
          <section>
            <ActiveDeals deals={ACTIVE_DEALS} totalCount={5} />
          </section>
        </div>

        {/* Recent Activity Side Bar */}
        <aside className="xl:w-[350px] w-full shrink-0">
          <RecentActivity activities={ACTIVITIES} />
        </aside>
      </div>
    </div>
  )
}

export default DashboardHome