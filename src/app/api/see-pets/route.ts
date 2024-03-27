import { sql, db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await db.connect()
  try {
    const { rows } = await client.sql`select * from petlist limit 500`

    console.log(rows)

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
