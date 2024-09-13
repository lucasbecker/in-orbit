import type { WeekSummary } from '../types/week-summary'

export async function getWeekSummary(): Promise<WeekSummary> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/week-summary`)

  if (!response.ok) throw new Error('Fetch response is not ok!')

  return await response.json()
}
