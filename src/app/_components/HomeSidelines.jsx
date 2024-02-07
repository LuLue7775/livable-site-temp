import useHomeAnimation from '@/utils/hooks/useHomeAnimation'

const HomeSidelines = ({ introScopeRef }) => {
  useHomeAnimation({ introScopeRef })

  return (
    <section
      style={{ opacity: '0' }}
      className='home-sidelines detail-wrapper absolute mt-24 flex h-full w-full items-start justify-end pr-6 text-right text-green-900 opacity-40 lg:opacity-100'
    >
      <div className='max-h-[120px] w-auto max-w-[300px] text-xl'>
        <p>
          “Inframince”, a term coined by Marcel Duchamp, refers to ephemeral, ultra-thin, and undecidable phenomena –
          such as the warmth that remains on a chair after a person gets up.
        </p>
      </div>
    </section>
  )
}
export default HomeSidelines
