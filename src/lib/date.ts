/**
 * Centralized date utility functions for formatting and due date state tracking.
 */

export function formatDateShort(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export function formatDateMedium(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeLeft(dueDate: string | Date | null | undefined): string {
  if (!dueDate) return "No due date";
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  if (isNaN(due.getTime())) return "No due date";
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return "Due today";
  return `${diffDays} day${diffDays > 1 ? "s" : ""} remaining`;
}

export function getDueDateStatus(dueDate: string | Date | null | undefined): "today" | "tomorrow" | "upcoming" {
  if (!dueDate) return "upcoming";
  const d = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  if (isNaN(d.getTime())) return "upcoming";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "tomorrow";
  return "upcoming";
}

export function getDueDateStatusLabel(dueDate: string | Date | null | undefined): string {
  if (!dueDate) return "Pending";
  const status = getDueDateStatus(dueDate);
  if (status === "today") return "Due Today";
  if (status === "tomorrow") return "Due Tomorrow";
  return formatDateShort(dueDate);
}
