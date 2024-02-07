import { Suspense } from 'react'
import LoadingIcon from '@/components/LoadingIcon'
import CommonAnimationLayout from '@/components/CommonAnimationLayout'
import { getDocFromFirestore } from '@/utils/firebase/firebase.utils'
import { sanitize } from 'isomorphic-dompurify'

export const metadata = {
  title: 'The Livable Studio Privacy Policy',
  description: 'Privacy Policy for The Livable Studio.',
}

const PrivacyPolicy = async () => {
  const policies = await getDocFromFirestore('policies', '8Q76wmnvfycKrcpQwozJ')

  return (
    <Suspense fallback={<LoadingIcon />}>
      <CommonAnimationLayout>
        <div className='mb-8 px-8'>
          <h1> 隱私權條款 Privacy Policy</h1>
          <div
            className='zh mb-8 max-w-[1000px] font-mono'
            dangerouslySetInnerHTML={{ __html: sanitize(policies?.privacy_policy?.zh) }}
          />
          <div
            className='zh max-w-[1000px] font-mono'
            dangerouslySetInnerHTML={{ __html: sanitize(policies?.privacy_policy?.en) }}
          />
        </div>
      </CommonAnimationLayout>
    </Suspense>
  )
}
export default PrivacyPolicy
