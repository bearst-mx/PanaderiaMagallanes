import React, { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal';
import { useDate } from '../hooks/useDate';
import "../style.css"
export const Calendar = ({EventOrders}) => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    // localStorage.getItem('events') ? 
    //   JSON.parse(localStorage.getItem('events')) : 
      []
  );

  const [newEvents,setNewEvents]=useState([]);

  const eventForDate = date => events.find(e => e.date === date);


  useEffect(()=>{
    console.log(EventOrders)
    EventOrders.forEach((el)=>{
      const dt= new Date(el.deliver)
      const title=el.client;
      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();
      const dayString = `${month+1}/${day}/${year}`;
      console.log(dayString)
      setEvents(prevArray => [...prevArray, { title, date: dayString }])
      setNewEvents(prevArray => [...prevArray, { title, date: dayString }])
      // setEvents([ ...events, { title, date: dayString }]);
    })
  },[EventOrders])
  useEffect(() => {
    // localStorage.setItem('events', JSON.stringify(events));
    console.log("estos son los eventos events:",events)
    console.log(newEvents)
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return(
    <>
      <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
          numEvents={events.length}
          events={EventOrders}
        />

        <div id="weekdays">
          <div>Do</div>
          <div>Lu</div>
          <div>Mar</div>
          <div>Mi</div>
          <div>Ju</div>
          <div>Vi</div>
          <div>Sa</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
          ev={events}
        />
      }
    </>
  );
};
