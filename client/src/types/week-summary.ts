export type WeekSummary = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    Array<{ id: string; title: string; completedAt: string }>
  >
}
