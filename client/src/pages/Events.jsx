import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { EventsApi } from "../services/eventsApi";
import { List, Main, Title3 } from "../ui/Main";
import { EventsDisplay } from "../components/Events";
import { useAuth } from "../hook/auth";

export const Events = () => {
    const {token}=useAuth();
  const [events, setEvent] = useState();
  const { state } = useLocation();

  const fetchEvents = async () => {
    const res = await EventsApi.getAll(token);
    if (res.error) {
      alert(res.error);
    }
    setEvent(res);
  };

  const addEvent = (ev) => {
    setEvent([...events, ev]);
  };

  const deleteEvent = (deleted) => {
    setEvent(events.filter((ev) => ev !== deleted));
    window.location.reload();
  };

  useEffect(() => {
    fetchEvents();
    setEvent();
    //eslint-disable-next-line
  }, []);

  useState(() => {
    if (!state) return <div>Something went wrong</div>;

    if (state.added) {
      addEvent(state.added);
      
    }
  }, [state]);

  if (!events) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        Loading...
      </Title3>
    );
  }
  if (events.length === 0) {
    return (
      <Title3 style={{marginTop: "180px", textAlign: "center" }}>
        NO EVENTS ADDED YET <br /> Please add some
      </Title3>
    );
  }

  const renderedEvents = events.map((event) => (
    <EventsDisplay
      key={JSON.stringify(event.id)}
      event={event}
      onDelete={deleteEvent}
    />
  ));
  // console.log({})
  return (
    <Main>
      <div style={{ marginTop: "3rem" }}>
        <Title3 style={{marginLeft:"45%"}}>Events</Title3>
        <List>{renderedEvents}</List>
      </div>
    </Main>
  );
};
