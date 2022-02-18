import { useEffect, useState } from "react";
import moment from "moment";
import { Block, Title3, Paragra } from "../ui/Main";

export const EventsStructuredDisplay = (participantEvent) => {

    const partEv = participantEvent.participant;
    const [participantState, setParticipantState] = useState([partEv]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setParticipantState();
        setError(null);
    }, [participantState])

    const errorShow = error ? <Title3>{error}</Title3> : null
    return (
        <Block >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {errorShow}
            </div>
            <Title3 style={{ cursor: "grab" }} >{partEv.event}</Title3>
            <div style={{ display: "flex" }}>

                <Paragra style={{ display: "flex", marginLeft: "5%" }}>The nearest time of the event: {moment(partEv.min_date).format("YYYY-MM-DD HH:MM")} </Paragra>
                <Paragra style={{ marginLeft: "40%" }}>Total registred participants: {partEv.events_count}</Paragra>
            </div>
        </Block>
    );
}