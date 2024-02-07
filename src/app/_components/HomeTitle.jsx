import useHomeAnimation from '@/utils/hooks/useHomeAnimation'

const HomeTitle = ({ introScopeRef }) => {
  useHomeAnimation({ introScopeRef })

  return (
    <section
      style={{ opacity: '0' }}
      className='home-title pointer-events-none absolute bottom-8 z-10 flex h-full w-full select-none items-end justify-start text-green-900'
    >
      <div className='title-wrapper my-4 flex h-1/2 flex-col items-start justify-end p-6 font-light leading-tight '>
        <div className='homepage-long-dash relative inline-flex gap-32  '>
          <p className=' w-8 text-lg  lg:w-14 lg:text-4xl'> 14 OCT</p>
          <p className=' w-8 text-lg  lg:w-14 lg:text-4xl'> 22 OCT</p>
        </div>
        <h1 className='m-0 my-4 flex items-center text-4xl font-bold leading-tight lg:text-6xl '>SOFT RE-OPENING</h1>
      </div>
    </section>
  )
}
export default HomeTitle
