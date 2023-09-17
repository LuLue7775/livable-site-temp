import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import Providers from '@/utils/provider'

import { EB_Garamond, Ysabeau_Office, Noto_Serif_HK } from '@next/font/google'
import localFont from '@next/font/local'

const sometimes = localFont({
  src: [
    {
      path: '../public/SometimesTimesRegular.woff2',
    },
  ],
  variable: '--sometimes',
})

const eb_garamond = EB_Garamond({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--eb_garamond',
})
const ysabeau_office = Ysabeau_Office({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--ysabeau_office',
})
const noto_serif_hk = Noto_Serif_HK({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--noto_serif_hk',
})

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`${sometimes.variable} ${eb_garamond.variable} ${ysabeau_office.variable} ${noto_serif_hk.variable} relative font-serif`}
      >
        <Providers>
          {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
