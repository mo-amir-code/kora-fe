"use client"
import DeadlineCard from "@/components/dashboard/home/deadline"
import Greeting from "@/components/dashboard/home/greeting"
import PaymentStatus from "@/components/dashboard/home/paymentstatus"
import RecentActivity from "@/components/dashboard/home/recent-activity"
import ActiveDeals from "@/components/dashboard/home/active-deals"
import { LuWallet, LuClock, LuCircleAlert, LuCircleCheck, LuFileText, LuBell, LuSparkles } from "react-icons/lu"
import { LoadingSpinner } from "@/components/common"

import { useEffect, useState } from "react"
import { DeadlineDetailsModal } from "@/components/dashboard/home/deadline"
import api from "@/lib/axios"

// ... (Existing ACTIVITIES and ACTIVE_DEALS constants)

const DashboardHome = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<{ brandName: string; items: any[] } | null>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/home")
        if (response.data.success) {
          setData(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const getStatus = (dueDate: string): "today" | "tomorrow" | "upcoming" => {
    const d = new Date(dueDate)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    if (isNaN(target.getTime())) return "upcoming"

    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) return "today"
    if (diffDays === 1) return "tomorrow"
    return "upcoming"
  }

  const getStatusLabel = (dueDate: string): string => {
    if (!dueDate) return "Pending"
    const status = getStatus(dueDate)
    if (status === "today") return "Due Today"
    if (status === "tomorrow") return "Due Tomorrow"
    return new Date(dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'DEAL_CREATED': return LuSparkles
      case 'DELIVERABLE_COMPLETED': return LuCircleCheck
      case 'INVOICE_SENT': return LuFileText
      case 'PAYMENT_RECEIVED': return LuWallet
      default: return LuBell
    }
  }

  const formatActivities = (activities: any[]) => {
    const mapActivityTypeToUI = (type: string): "delivered" | "invoice" | "reminder" | "pitch" => {
      switch (type) {
        case 'DELIVERABLE_COMPLETED': return "delivered";
        case 'INVOICE_SENT':
        case 'INVOICE_CREATED':
        case 'PAYMENT_RECEIVED': return "invoice";
        case 'REMINDER_SENT': return "reminder";
        default: return "pitch";
      }
    }

    return activities.map(act => ({
      id: act.id,
      type: mapActivityTypeToUI(act.type),
      entityName: act.deal?.title || "Activity",
      prefix: act.type.replace(/_/g, ' ').toLowerCase(),
      time: new Date(act.createdAt).toLocaleDateString(),
      icon: getActivityIcon(act.type),
      amount: act.amount ? formatCurrency(act.amount) : undefined
    }))
  }

  const mapDealStageToStatus = (stage: string): "pitched" | "in-progress" | "delivered" => {
    const pitchedStages = ['LEAD', 'OUTREACH', 'NEGOTIATION', 'PROPOSAL_SENT', 'CONTRACT_SENT'];
    const inProgressStages = ['APPROVED', 'IN_PROGRESS'];
    const deliveredStages = ['COMPLETED'];

    if (pitchedStages.includes(stage)) return "pitched";
    if (inProgressStages.includes(stage)) return "in-progress";
    if (deliveredStages.includes(stage)) return "delivered";

    return "pitched";
  }

  const formatActiveDeals = (deals: any[]) => {
    return deals.map(deal => ({
      id: deal.id,
      dealName: deal.dealName,
      brandName: deal.brandName,
      logoUrl: deal.logoUrl,
      status: mapDealStageToStatus(deal.stage),
      progress: deal.progress,
      amount: formatCurrency(deal.amount || 0),
      dueStatus: "Active", // Placeholder or can fetch real due status
      logoInitial: deal.brandName.charAt(0)
    }))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <Greeting name={data?.user?.name || "Priya"} />

      {/* Payment Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PaymentStatus
          title="Total Earned"
          amount={formatCurrency(data?.stats?.totalEarned || 0)}
          icon={LuWallet}
          variant="success"
          subtitle="All time from paid invoices"
        />

        <PaymentStatus
          title="Pending Payments"
          amount={formatCurrency(data?.stats?.pendingPayments || 0)}
          icon={LuCircleAlert}
          variant="warning"
          subtitle="Awaiting client action"
        />

        <PaymentStatus
          title="Overdue"
          amount={formatCurrency(data?.stats?.overdue || 0)}
          icon={LuClock}
          variant="danger"
          subtitle="Needs immediate follow-up"
        />
      </div>

      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-10">
          {/* Deadline Section */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
              Deadlines in next 7 days
            </h2>

            {!data?.deadlines || data.deadlines.length === 0 ? (
              <div className="p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-4">🚀</span>
                <p className="text-gray-500 font-medium">All caught up! No deadlines for the next 7 days.</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                {data.deadlines.map((group: any, idx: number) => (
                  <DeadlineCard
                    key={idx}
                    brandName={group.brand.name}
                    itemCount={group.items.length}
                    itemType={group.items.length === 1 ? group.items[0].type.split('_').pop()?.toLowerCase() || 'item' : 'Items'}
                    status={getStatus(group.dueDate)}
                    statusLabel={getStatusLabel(group.dueDate)}
                    avatarUrl={group.brand.logoUrl}
                    items={group.items}
                    onViewDetails={(items) => setSelectedGroup({ brandName: group.brand.name, items })}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Active Deals Section */}
          <section>
            <ActiveDeals
              deals={formatActiveDeals(data?.activeDeals || [])}
              totalCount={data?.activeDeals?.length || 0}
            />
          </section>
        </div>

        {/* Recent Activity Side Bar */}
        <aside className="xl:w-[350px] w-full shrink-0">
          <RecentActivity activities={formatActivities(data?.activities || [])} />
        </aside>
      </div>

      {/* Details Modal */}
      <DeadlineDetailsModal
        isOpen={!!selectedGroup}
        onClose={() => setSelectedGroup(null)}
        brandName={selectedGroup?.brandName || ""}
        items={selectedGroup?.items || []}
      />
    </div>
  )
}

export default DashboardHome