import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ParticipantsEventsApi } from "../services/participantsEventsApi.js";
import { List, Main, Title3 } from "../ui/Main";
import { ParticipantsEvents } from "../components/ParticipantsEvents";
import { useAuth } from "../hook/auth";

export const ParticipantEvents = () => {
  const { token } = useAuth();
  const [participantEvent, setParticipant] = useState([]);
  const { state } = useLocation();
  const fetchParticipants = async () => {
    const res = await ParticipantsEventsApi.getAll(token);
    if (res.error) {
      console.error(res.error);
      return state;
    }
    setParticipant(res);
  };

  const addParticipant = (par) => {
    setParticipant([...participantEvent, par]);
  };

  const deleteParticipant = (deleted) => {
    setParticipant(participantEvent.filter((par) => par !== deleted));
    window.location.reload();
  };

  useEffect(() => {
    fetchParticipants();
    setParticipant();
    //eslint-disable-next-line
  }, []);

  useState(() => {
    if (!state) return <div>Something went wrong</div>;

    if (state.added) {
      addParticipant(state.added);
    }
  }, [state]);
  if (!token) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        Please login or register</Title3>)
  }

  if (!participantEvent) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        Loading...
      </Title3>
    );
  }
  if (participantEvent.length === 0) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        NO PARTICIPANTS ADDED YET <br /> Please add some
      </Title3>
    );
  }

  const renderedParticipants = participantEvent.map((participant) => (
    <ParticipantsEvents
      key={participant.id}
      participant={participant}
      onDelete={deleteParticipant}
    />
  ));

  return (
    <Main>
      <div style={{ marginTop: "3rem" }}>
        <Title3 style={{ marginLeft: "45%" }}>List of events and participants </Title3>
        <List>{renderedParticipants}</List>
      </div>
    </Main>
  );
};
