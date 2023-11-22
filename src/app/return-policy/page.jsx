import { Suspense } from 'react'
import LoadingIcon from '@/components/LoadingIcon'
import CommonFrameLayout from '@/components/CommonFrameLayout'
import { getDocFromFirestore } from '@/utils/firebase/firebase.utils'
import { sanitize } from 'isomorphic-dompurify'

const PrivacyPolicy = async () => {
  const policies = await getDocFromFirestore('policies', '8Q76wmnvfycKrcpQwozJ')

  return (
    <Suspense fallback={<LoadingIcon />}>
      <CommonFrameLayout>
        <div className='px-8 mb-8'>
          <h1> 退款政策 Return Policy</h1>
          <div
            className='zh max-w-[1000px] font-mono  mb-8'
            dangerouslySetInnerHTML={{ __html: sanitize(policies?.return_policy?.zh) }}
          />
          <div
            className='zh max-w-[1000px] font-mono'
            dangerouslySetInnerHTML={{ __html: sanitize(policies?.return_policy?.en) }}
          />
        </div>
      </CommonFrameLayout>
    </Suspense>
  )
}
export default PrivacyPolicy
