import { useAuth } from "../hook/auth";
import { ParticipantsEventsApi } from "../services/participantsEventsApi.js";
import { ParticipantApi } from "../services/participantsApi.js";
import { EventsApi } from "../services/eventsApi";
import { Container, Form, Title3, Select, Label } from "../ui/Main";
import { Button } from "../ui/Button";
import { Field } from "../organisms/Field";
import { useEffect, useState } from "react";



export const AddParticipantsEvent = () => {
    const auth = useAuth();
    const [participant, setParticipant] = useState([]);
    const [event, setEvent] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData(e.target);
            const [participant_id, event_id, event_date] = data.values();
            console.log(participant_id, event_id, event_date)

            if (!participant_id.length || !event_id.length || !event_date.length)
                return console.error('Please enter data');
            const res = await ParticipantsEventsApi.create({ participant_id, event_id, event_date }, auth.token)

            if (res.error) {
                throw new Error(res.error[0].msg);
            }
            else {
                alert('Congrats added new data');
                window.location.reload();

            }

        } catch (error) {
            alert(error);

        }

    };
    const fetchParticipants = async () => {
        const resPaticipants = await ParticipantApi.getAllParticipants(auth.token);
        setParticipant(resPaticipants);
    };
    const fetchEvents = async () => {
        const resEvents = await EventsApi.getAll(auth.token);
        setEvent(resEvents);
    }

    useEffect(() => {
        fetchEvents();
        fetchParticipants();
        //eslint-disable-next-line
    }, [])


    return (
        <Container>

            <Form onSubmit={handleSubmit}>
                <Title3>Add participant to Event</Title3>
                <Label htmlFor="participant_id">Participant: </Label>
                <Select label="Participant" name="participant_id" defaultValue="none" required>
                    <option disabled>none</option>
                    {participant.map((parti) => (
                        <option key={parti.id} value={parti.id}>
                            {parti.name} {parti.surname}
                        </option>))}
                </Select>
                <Label htmlFor="event_id">Event: </Label>
                <Select label="Event" name="event_id" defaultValue="none" required>
                    <option disabled>none</option>
                    {event.map((eve) => (
                        <option key={eve.id} value={eve.id}>
                            {eve.event}
                        </option>))}
                </Select>
                <Field
                    label="Event date"
                    name="event_date"
                    type="datetime-local"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}\/[0-9]{2}:[0-9]{2}"
                    required
                />
                <Button type="submit">Add</Button>
            </Form>

        </Container>
    );
};
