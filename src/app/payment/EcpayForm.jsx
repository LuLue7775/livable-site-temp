'use client'
import { useEffect } from 'react'
import parse from 'html-react-parser'

const EcpayForm = ({ html }) => {
  useEffect(() => {
    if (html) {
      window.location.reload(true)
    }
  }, [html])

  return html ? parse(html) : <> wait a moment pls </>
}
export default EcpayForm
