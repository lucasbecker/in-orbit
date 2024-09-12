import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'
import { db } from '../db'

import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompletionInWeek = db.$with('goal_completaion_counts').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as(
          'completedAtDate'
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goal_completeted_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletionInWeek.completedAtDate,
        completions: sql`
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${goalsCompletionInWeek.id},
                'title', ${goalsCompletionInWeek.title},
                'completedAt', ${goalsCompletionInWeek.completedAt}
              )
            )
          `.as('completions'),
      })
      .from(goalsCompletionInWeek)
      .groupBy(goalsCompletionInWeek.completedAtDate)
  )

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletionInWeek, goalsCompletedByWeekDay)
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletionInWeek})`
        .mapWith(Number)
        .as('completed'),
      total:
        sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`
          .mapWith(Number)
          .as('total'),
      goalsPerDay: sql`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
        )
      `,
    })
    .from(goalsCompletedByWeekDay)

  return result[0]
}
