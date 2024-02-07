const { default: EventsFilterButtons } = require('./EventsFilterButtons')
import useEventAnimation from '@/utils/hooks/useEventAnimation'
const EventIntro = ({ introScopeRef, events, eventsFilters, setEventsFilters }) => {
  useEventAnimation({ introScopeRef })

  return (
    <div className='relative grid h-auto w-full grid-cols-1 justify-between pb-4 md:h-2/5 md:grid-cols-2 '>
      <div
        data-testid='event-filter'
        style={{ opacity: 0 }}
        className='event-filter flex h-full w-full basis-1/2 flex-col justify-end font-mono'
      >
        <EventsFilterButtons
          events={events}
          eventsFilters={eventsFilters}
          setEventsFilters={setEventsFilters}
          introScopeRef={introScopeRef}
        />
      </div>
      <div
        data-testid='event-desc'
        style={{ opacity: 0 }}
        className='event-desc order-first flex h-full max-h-[150px] w-2/3 shrink basis-1/2 justify-self-end overflow-hidden pb-8 text-lg md:order-last md:w-full md:justify-self-start md:text-2xl'
      >
        We, at The Livable Studio, seek to explore idealism in a materialistic world. <br />
        Through a range of workshops, performances, tours, and residencies, we share our journey with you.
      </div>
    </div>
  )
}
export default EventIntro
