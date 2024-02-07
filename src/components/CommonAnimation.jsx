import useCommonMainAnimation from '@/utils/hooks/useCommonMainAnimation'
import React from 'react'

const CommonAnimationLayout = ({ mainScopeRef, children  }) => {
  useCommonMainAnimation({ mainScopeRef })

  return (
    <>
      <div
        className={
          'content-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <div
          style={{ opacity: 0 }}
          className='horizontal-line relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        style={{ opacity: 0 }}
        className='content-body relative 
                    bottom-0  
                    min-h-[600px] w-full min-w-[350px] translate-x-[-4px] 
                    translate-y-[1px] border-l border-green-900/60 md:w-[calc(100%-200px)]
                    '
      >
        {children}
      </div>
    </>
  )
}

export default CommonAnimationLayout
