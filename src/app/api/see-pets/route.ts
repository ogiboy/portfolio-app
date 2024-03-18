import { sql, db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`SELECT * FROM pets LIMIT 10`

    const pets = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      owner: row.owner,
    }))

    console.log(JSON.stringify(pets))

    return new NextResponse(JSON.stringify(pets), { status: 200 })
  } catch (error) {
    console.log('error fetching data', error)
    return new NextResponse('failed to fetch pets', { status: 500 })
  }
}
