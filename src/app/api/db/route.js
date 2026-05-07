import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/db'

export async function GET() {
  try {
    await connectToDatabase()
    return NextResponse.json({ status: 'MongoDB connected successfully' })
  } catch (err) {
    return NextResponse.json({ status: 'MongoDB connection failed' }, { status: 500 })
  }
}
