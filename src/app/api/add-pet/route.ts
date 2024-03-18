import { db, sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id, petName, ownerName } = await request.json()

    await sql`INSERT INTO pets (id, name, owner) VALUES ('${id}', '${petName}', '${ownerName}')`

    return new NextResponse('Pet added successfully', { status: 200 })
  } catch (error) {
    console.error('Error adding pet:', error)
    return new NextResponse('Failed to add pet', {
      status: 500,
    })
  }
}
