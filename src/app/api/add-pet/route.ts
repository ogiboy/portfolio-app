import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { petName } = await request.json()

    if (!petName) throw new Error('Pet and owner names required')

    await sql`INSERT INTO Pets (Name) VALUES (${petName}})`
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  try {
    const pets = await sql`SELECT * FROM Pets`
    return NextResponse.json({ pets }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
