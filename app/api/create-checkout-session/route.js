import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const res = NextResponse.json({ successs: Boolean(body) }, { status: 200 })

  res.cookies.set({
    name: 'PaymentSession',
    value: JSON.stringify(body ?? ''),
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 1, // 1 day
  })
  return res
}
