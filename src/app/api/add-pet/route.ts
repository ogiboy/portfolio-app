import { db, sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import defaultImage from '../../../../public/windows_slanted-1.png'

export async function POST(request: Request) {
  try {
    const { petName, ownerName } = await request.json()

    const imagePath = '/windows_slanted-1.png'

    await sql`INSERT INTO pets (name, owner, image) VALUES (${petName}, ${ownerName}, ${imagePath})`

    return new NextResponse('Pet added successfully', { status: 200 })
  } catch (error) {
    console.error('Error adding pet:', error)
    return new NextResponse('Failed to add pet', { status: 500 })
  }
}
