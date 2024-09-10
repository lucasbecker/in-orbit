import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const goalsResult = await db
    .insert(goals)
    .values([
      {
        title: 'Wake up early',
        desiredWeeklyFrequency: 5,
      },
      {
        title: 'Study',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Run',
        desiredWeeklyFrequency: 3,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: goalsResult[2].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: goalsResult[0].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: goalsResult[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => client.end())
