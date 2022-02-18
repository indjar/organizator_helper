import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ParticipantApi } from "../services//participantsApi";
import { List, Main, Title3 } from "../ui/Main";
import { ParticipantsDisplay } from "../components/Participants";
import { useAuth } from "../hook/auth";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const Participants = () => {
  const { token } = useAuth();
  const [participant, setParticipant] = useState();
  const { state } = useLocation();


  const fetchParticipants = async () => {
    const res = await ParticipantApi.getAllParticipants(token);
    if (res.error) {
      console.error(res.error);
      return state;
    }
    setParticipant(res);
  };

  const addParticipant = (par) => {
    setParticipant([...participant, par]);
  };

  const deleteParticipant = (deleted) => {
    setParticipant(participant.filter((par) => par !== deleted));
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

  if (!participant) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        Loading...
      </Title3>
    );
  }
  if (participant.length === 0) {
    return (
      <Title3 style={{ marginTop: "180px", textAlign: "center" }}>
        NO PARTICIPANTS ADDED YET <br /> Please add some
      </Title3>
    );
  }

  const renderedParticipants = participant.map((participant) => (
    <ParticipantsDisplay
      key={JSON.stringify(participant.id)}
      participant={participant}
      onDelete={deleteParticipant}
    />
  ));

  return (
    <Main>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ marginLeft: "10%" }}>
          <Button color="main" style={{ padding: "30px" }}>
            <Link style={{ color: "#2F4F4F", textDecoration: "none" }} to="/add_participant">
              Add participant
            </Link>
          </Button>
          <Button color="main" style={{ padding: "30px 20px 8px 20px" }}>
            <Link style={{ color: "#2F4F4F" }} to={`/addToEventList`}>
              Add participant to event
            </Link>
          </Button>
        </div>
        <Title3 style={{ marginLeft: "45%" }}>Participants</Title3>
        <List>{renderedParticipants}</List>
      </div>
    </Main>
  );
};
