import { useAuth } from "../hook/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import { ParticipantsEventsApi } from "../services/participantsEventsApi.js";
import { Block, Title3, Paragra } from "../ui/Main";
import { Button } from "../ui/Button";


export const ParticipantsEvents = (participantEvent) => {
    const auth = useAuth();
    const partEv = participantEvent.participant;
    const [participantState, setParticipantState] = useState([partEv]);

    const [error, setError] = useState(null);


    const onDelete = async () => {

        const res = await ParticipantsEventsApi.delete(partEv.id, auth.token);
        setParticipantState(partEv);
        if (res.error) {
            setError(res.error);
            return
        }
        setError(null);
        alert("Participant deleted")
        window.location.reload();
    };

    useEffect(() => {
        setParticipantState();
        setError(null);
    }, [participantState])


    const errorShow = error ? <Title3>{error}</Title3> : null
    return (
        <Block >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button onClick={onDelete}>x</Button>
                </div>
                {errorShow}
            </div>
            <Title3 style={{ cursor: "grab" }}>{partEv.event}</Title3>
            <Paragra> {moment(partEv.event_date).format("YYYY-MM-DD HH:MM")} </Paragra>
            <Paragra>{partEv.name} {partEv.surname}</Paragra>


        </Block>
    );
}