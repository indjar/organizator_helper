import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ParticipantsEventsApi } from "../services/participantsEventsApi.js";
import { List, Main, Title3 } from "../ui/Main";
import { EventsStructuredDisplay } from "../components/EventsStructuredDisplay";
import { useAuth } from "../hook/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const Home = () => {
  const { token } = useAuth();
  const [participantEvent, setParticipant] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  const fetchParticipants = async () => {
    const res = await ParticipantsEventsApi.getStructuredEventList(token);
    if (res.error) {
      console.error(res.error);
      return token;
    }
    setParticipant(res);
  };

  useEffect(() => {
    fetchParticipants();
    setParticipant();
    if (!token) {
      navigate("/login")
      return <div>Please login or register</div>
    }
    //eslint-disable-next-line
  }, []);


  useState(() => {
    if (!state) return <div>Something went wrong</div>;

  }, [state]);



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
    <EventsStructuredDisplay
      key={participant.id}
      participant={participant}
    />
  ));

  return (
    <Main>
      <div style={{ marginTop: "3rem" }}>

        <div style={{ marginLeft: "24%" }}>
          <Button color="main" style={{ padding: "30px" }}>
            <Link style={{ color: "#2F4F4F", textDecoration: "none", textAlign: "center" }} to={`/add_event`}>
              Add event
            </Link>
          </Button>
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
        <Title3 style={{ marginLeft: "40%" }}>Events list</Title3>
        <List>{renderedParticipants}</List>
      </div>
    </Main>
  );
};
