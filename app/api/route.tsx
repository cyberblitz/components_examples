import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url); // Extract query params from the request URL
  const name = searchParams.get('name') || 'stranger';

  return NextResponse.json({ message: `Hello, ${name}!` });
}
