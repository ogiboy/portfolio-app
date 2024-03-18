import { sql, db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`SELECT * FROM pets`

    if (result.rows.length === 0) {
      console.log('No pets found')
    } else {
      console.log('Pets found:', result.rows)
    }

    const pets = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      owner: row.owner,
      image: row.image,
    }))

    return new NextResponse(JSON.stringify(pets), { status: 200 })
  } catch (error) {
    console.log('error fetching data', error)
    return new NextResponse('failed to fetch pets', { status: 500 })
  }
}
