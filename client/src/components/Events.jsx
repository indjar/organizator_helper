import { useParams } from "react-router-dom";
import { Block, Title3, Form, Container } from "../ui/Main";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Field } from "../organisms/Field";
import { useAuth } from "../hook/auth";
import { EventsApi } from "../services/eventsApi.js";


export const EventsDisplay = (events) => {
    const { id } = useParams();
    const eventRes = events.event;
    const [eventState, setEventState] = useState([eventRes]);

    const [editMode, setEditMode] = useState();
    const [eventInput, setEventInput] = useState(eventRes);

    const onDelete = async () => {
        await EventsApi.delete(eventRes.id);
        // console.log()
        setEventState(eventRes);
        window.location.reload();
    };
    const onEventChange = (e) => setEventInput(e.target.value);


    const onEdit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [event] = data.values();
            const id = eventRes.id;
            const res = await EventsApi.update({ id, event })
            console.log(res)
            if (res.error) throw new Error(res.error);
            console.log(res, id)
            alert('Congrats added new event')

        } catch (error) {
            console.log(error)
            alert(error);

        }
        window.location.reload();
    };


    useEffect(() => {
        setEventState(eventRes)
    }, [eventRes])


    const cancelEdit = (e) => {
        setEventInput(eventRes.event);
        setEditMode(false);
    };

   
    const contentSection = editMode ? (
        <>
            <Form onSubmit={onEdit}>
                <Field
                    onChange={onEventChange}
                    label="Event"
                    placeholder="Event"
                    name="event"
                    value={eventInput.event}
                    required
                />
                <Button type="submit">Update</Button>
                <Button onClick={cancelEdit}>Cancel</Button>
            </Form>
        </>
    ) : (
        <></>
    );

    return (
        <Block >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button onClick={onDelete}>x</Button>
                    <Button onClick={() => setEditMode(!editMode)}>✎</Button>
                </div>
            </div>
            <Title3 style={{ cursor: "grab" }}>{eventRes.event}</Title3>
            <Container>{contentSection}</Container>
        </Block>
    );
}