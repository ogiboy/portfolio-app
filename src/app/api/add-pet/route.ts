import { db, sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { date, petName, ownerName } = await request.json()

    // console.log('id: ' + id, 'petName: ' + petName, 'owner: ' + ownerName)

    await sql`INSERT INTO petlist (date, petname, owner) VALUES (${date}, ${petName}, ${ownerName})`

    return new NextResponse('Pet added successfully', { status: 200 })
  } catch (error) {
    console.error('Error adding pet:', error)
    return new NextResponse('Failed to add pet', {
      status: 500,
    })
  }
}
