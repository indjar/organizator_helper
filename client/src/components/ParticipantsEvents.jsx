import { Block, Title3, Form, Container, Paragra } from "../ui/Main";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Field } from "../organisms/Field";
import { ParticipantsEventsApi } from "../services/participantsEventsApi.js";
import { useAuth } from "../hook/auth";


export const ParticipantsEvents = (participantEvent) => {
    const auth=useAuth();
    const partEv = participantEvent;
    const [participantState, setParticipantState] = useState([partEv]);
    const [editMode, setEditMode] = useState();
    const [participantInput, setParticipantInput] = useState(partEv.name);
    const [eventInput, setEventInput] = useState(partEv.surname);
    const [emailInput, setDateInput] = useState(partEv.email);
    const [error, setError] = useState(null);

    const onDelete = async () => {
        
        const res=await ParticipantsEventsApi.delete(partEv.id, auth.token);
        setParticipantState(partEv);
        if (res.error) {
            setError(res.error);
            return
        }
        setError(null);
        alert("Participant deleted")
        window.location.reload();
    };
    const onNameChange = (e) => setParticipantInput(e.target.value);
    const onSurnameChange = (e) => setEventInput(e.target.value);
    const onEmailChange = (e) => setDateInput(e.target.value);
    const onBirthChange = (e) => setBirthInput(e.target.value);

    const onEdit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);

            const [name, surname, email, birth] = data.values();
            
            const res = await ParticipantsEventsApi.update({ name, surname, email, birth }, partEv.id, auth.token)
            console.log(res)
            if (res.err) {
                setError(res.err);
                return
            }
            else{
            alert('Congrats updated participant');
            setError(null)
            }

        } catch (error) {
            console.log(error)
            alert(error);

        }
        window.location.reload();
    };


    useEffect(() => {
        setParticipantState();
        setError(null);
    }, [participantState])


    const cancelEdit = (e) => {
        setParticipantInput(e.name);
        setEventInput(e.surname);
        setDateInput(e.email);
        setBirthInput(e.birth);
        setEditMode(false);
    };

   
    const contentSection = editMode ? (
        <>
            <Form onSubmit={onEdit}>
            <Label htmlFor="participant_id">Participant: </Label>
                <Select label="Participant" name="participant_id" defaultValue="none">
                <option disabled>none</option>
                {partEv.map((parti) => (
                    <option key={parti.id} value={parti.id}>
                        {parti.name}
                   </option>))}
                </Select>
                <Label htmlFor="event_id">Event: </Label>
                <Select label="Event" name="event_id" defaultValue="none">
                <option disabled>none</option>
                {partEv.map((eve) => (
                    <option key={eve.id} value={eve.id}>
                        {eve.event}
                   </option>))}
                </Select>
                <Field
                    label="Event date"
                    name="event_date"
                    type="date"
                    required
                />
                <Button type="submit">Update</Button>
                <Button onClick={cancelEdit}>Cancel</Button>
            </Form>
        </>
    ) : (
        <></>
    );
    const errorShow = error ? <Title3>{error}</Title3> : null
    return (
        <Block >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Button onClick={onDelete}>x</Button>
                    <Button onClick={() => setEditMode(!editMode)}>✎</Button>
                </div>
                {errorShow}
            </div>
            <Title3 style={{ cursor: "grab" }}>{partEv.name} {partEv.surname}</Title3>
            <Paragra>{partEv.email} </Paragra>
            <Paragra>{partEv.age}</Paragra>
            <Container>{contentSection}</Container>
            
        </Block>
    );
}