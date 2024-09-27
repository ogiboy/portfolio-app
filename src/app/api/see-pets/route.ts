import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

// export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = await db.connect()

    const { rows } = await client.sql`SELECT * FROM petlist LIMIT 500`

    // console.log(rows)

    const pets = rows.map((row: any) => ({
      date: new Date(row.date),
      petName: row.petname,
      owner: row.owner,
    }))

    return new NextResponse(JSON.stringify(pets), { status: 200 })
  } catch (error) {
    console.log('error fetching data', error)
    return new NextResponse('failed to fetch pets', { status: 500 })
  }
}
