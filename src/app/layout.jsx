import '@/app/global.css'
import Providers from '@/providers/provider'
import { Layout } from '@/components/dom/Layout'

import { EB_Garamond, Ysabeau, Noto_Serif_HK } from 'next/font/google'
import localFont from 'next/font/local'

const sometimes = localFont({
  src: [
    {
      path: '../../public/SometimesTimesRegular.woff2',
    },
  ],
  variable: '--sometimes',
})

const eb_garamond = EB_Garamond({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--eb_garamond',
})
const ysabeau = Ysabeau({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--ysabeau',
})
const noto_serif_hk = Noto_Serif_HK({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--noto_serif_hk',
})

export const metadata = {
  title: 'The Livable Studio',
  description: 'A website created by The Livable Studio.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <head>
        <meta charSet='UTF-8' />
        <meta
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
          name='viewport'
        />
      </head>
      <body
        className={`${sometimes.variable} ${eb_garamond.variable} ${ysabeau.variable} ${noto_serif_hk.variable} relative font-serif`}
      >
        <Providers>
          {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
