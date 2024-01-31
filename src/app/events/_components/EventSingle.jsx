import Button from '@/components/Button'
import { setRefs } from '@/utils/functions'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { sanitize } from 'isomorphic-dompurify'

const EventSingle = ({
  index,
  toggleEvent,
  item,
  openedId,
  eventHeadRefs,
  eventBodyRefs,
  horizontalRefs,
  eventBodyMoreTextRefs,
}) => {
  const routerMiddleware = useDelayRouting()

  return (
    <div className='flex flex-col items-end'>
      <div className={'event-item-head relative h-[52px] w-[min(90%,1000px)]'}>
        <p
          ref={(element) => setRefs(element, item?.id, horizontalRefs)}
          style={{ opacity: 0 }}
          className='relative w-3/4  max-w-[1000px] border-t border-green-900/60'
        />
        <div
          ref={(element) => setRefs(element, item?.id, eventHeadRefs)}
          style={{ opacity: 0 }}
          className='flex w-3/4 justify-end'
        >
          <a
            data-testid='event-expand'
            id={`${item?.id}`}
            className='cursor-pointer font-mono text-green-900 hover:text-red-400'
            onClick={(e) => toggleEvent(e)}
          >
            {openedId !== item?.id?.replace(' ', '') ? '[more]' : '[x]'}
          </a>
        </div>
      </div>
      <div className='flex w-[min(90%,1000px)] items-end'>
        <div
          ref={(element) => setRefs(element, item?.id, eventBodyRefs)}
          style={{ opacity: 0 }}
          className={`${
            index === 0 && `event-item-body-1st-elem`
          } event-item-body relative mb-4 inline-flex h-[120px] w-full translate-x-[-53px] 
                  translate-y-[1px]  gap-4 border-l border-green-900/60`}
        >
          <div className='relative grid h-[60px] w-1/3 min-w-[90px] max-w-[200px] grid-cols-3 px-2 text-green-900'>
            <div data-testid='event-date' className='text-center'>
              <p>{item?.event_date?.start?.date}</p>
              <p>{item?.event_date?.start?.month}</p>
            </div>
            {item?.event_date?.end && <p className='long-dash relative w-full' />}
            <div className='text-center'>
              <p>{item?.event_date?.end?.date}</p>
              <p>{item?.event_date?.end?.month}</p>
            </div>
          </div>
          <div className='border-l border-green-900/60 pl-2 text-green-900'>
            <p className='font-mono text-[10px] leading-[2px]'> {item?.category} </p>
            <div data-testid='event-title' className='pb-2'>
              <h3 className='font-bold'> {item?.title?.en} </h3>
              <h3 className='font-bold'> {item?.title?.zh} </h3>
            </div>

            <div
              ref={(element) => setRefs(element, item?.id, eventBodyMoreTextRefs)}
              className='h-0 w-full min-w-[200px] max-w-[250px] overflow-hidden font-mono md:max-w-[1000px]'
            >
              <p className='zh' dangerouslySetInnerHTML={{ __html: sanitize(item?.description?.zh) }} />
              <p dangerouslySetInnerHTML={{ __html: sanitize(item?.description?.en) }} />

              {item?.host?.zh ? <p className='zh pt-4'>藝術家: {item?.host?.zh}</p> : ''}
              {item?.host?.en ? <p>Artist: {item?.host?.en}</p> : ''}

              <p className='zh' dangerouslySetInnerHTML={{ __html: sanitize(item?.host_bio?.zh) }} />
              <p dangerouslySetInnerHTML={{ __html: sanitize(item?.host_bio?.en) }} />
              <a
                data-testid='event-signup'
                className='mt-2 flex justify-end hover:text-red-400'
                onClick={() => routerMiddleware.push(`/events/${item?.id}`)}
              >
                <Button>SIGN UP -&gt;</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventSingle
