import cookie from 'cookie'

const handler = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('PaymentSession', JSON.stringify(req.body.paymentData ?? ''), {
      httpOnly: true,
      // SameSite: None,
      // secure: 'development' !== process.env.NODE_ENV,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 1 day
    }),
  )

  res.status(200).json({ success: Boolean(req.body) })
}
export default handler
