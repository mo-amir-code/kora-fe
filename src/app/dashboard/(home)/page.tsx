"use client"
import DeadlineCard from "@/components/dashboard/home/deadline"
import Greeting from "@/components/dashboard/home/greeting"
import PaymentStatus from "@/components/dashboard/home/paymentstatus"
import RecentActivity from "@/components/dashboard/home/recent-activity"
import ActiveDeals from "@/components/dashboard/home/active-deals"
import { LuWallet, LuClock, LuCircleAlert, LuCircleCheck, LuFileText, LuBell, LuSparkles, LuBriefcase } from "react-icons/lu"
import { LoadingSpinner } from "@/components/common"

import { useEffect, useState } from "react"
import { DeadlineDetailsModal } from "@/components/dashboard/home/deadline"
import api from "@/lib/axios"
import { useCurrency } from "@/hooks/useCurrency"

const DashboardHome = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<{ brandName: string; items: any[] } | null>(null)
  const { format } = useCurrency();

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
    return format(amount);
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
      dueStatus: "Active",
      logoInitial: deal.brandName.charAt(0)
    }))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <Greeting name={data?.user?.name || "User"} />

      {/* Payment Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PaymentStatus
          title="Total Earned (Last 30 Days)"
          amount={formatCurrency(data?.stats?.totalEarnedLast30 || 0)}
          icon={LuWallet}
          variant="success"
          subtitle="Received in the last 30 days"
        />

        <PaymentStatus
          title="Pending Cash (Next 30 Days)"
          amount={formatCurrency(data?.stats?.pendingCashNext30 || 0)}
          icon={LuClock}
          variant="warning"
          subtitle="Scheduled in the next 30 days"
        />

        <PaymentStatus
          title="Active Collaborations"
          amount={data?.stats?.activeCollaborationsCount || 0}
          icon={LuBriefcase}
          variant="neutral"
          subtitle="Ongoing brand campaigns"
        />
      </div>

      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-10">
          {/* Deadline Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Upcoming Deadlines
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tasks and deliverables requiring your attention in the next 7 days
                </p>
              </div>
            </div>
            {data?.deadlinesGrouped && Object.keys(data.deadlinesGrouped).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data.deadlinesGrouped).map(([brandName, items]: [string, any]) => (
                  <DeadlineCard
                    key={brandName}
                    brandName={brandName}
                    itemCount={items.length}
                    itemType={items.length === 1 ? (items[0]?.title || 'Deliverable') : 'Deliverables'}
                    status={items[0]?.dueDate ? getStatus(items[0].dueDate) : 'upcoming'}
                    statusLabel={items[0]?.dueDate ? getStatusLabel(items[0].dueDate) : 'Pending'}
                    avatar={brandName.charAt(0)}
                    items={items}
                    onViewDetails={() => setSelectedGroup({ brandName, items })}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">No upcoming deadlines for the next 7 days.</p>
              </div>
            )}
          </div>

          {/* Active Deals Section */}
          {data?.activeDeals && data.activeDeals.length > 0 && (
            <div>
              <ActiveDeals deals={formatActiveDeals(data.activeDeals)} totalCount={data.activeDeals.length} />
            </div>
          )}
        </div>

        {/* Right Sidebar: Recent Activity */}
        <div className="w-full xl:w-80 shrink-0">
          {data?.activities && (
            <RecentActivity activities={formatActivities(data.activities)} />
          )}
        </div>
      </div>

      {/* Deadline Modal */}
      {selectedGroup && (
        <DeadlineDetailsModal
          isOpen={!!selectedGroup}
          onClose={() => setSelectedGroup(null)}
          brandName={selectedGroup.brandName}
          items={selectedGroup.items}
        />
      )}
    </div>
  )
}

export default DashboardHome