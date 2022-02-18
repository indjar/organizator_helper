import { Block, Title3, Form, Container, Paragra } from "../ui/Main";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Field } from "../organisms/Field";
import { ParticipantApi } from "../services/participantsApi.js";
import { useAuth } from "../hook/auth";


export const ParticipantsDisplay = (participants) => {
    const auth = useAuth();
    const partic = participants.participant;
    const [participantState, setParticipantState] = useState([partic]);
    const [editMode, setEditMode] = useState();
    const [nameInput, setNameInput] = useState(partic.name);
    const [surnameInput, setSurnameInput] = useState(partic.surname);
    const [emailInput, setEmailInput] = useState(partic.email);
    const [birthInput, setBirthInput] = useState(partic.birth);
    const [error, setError] = useState(null);

    const onDelete = async () => {

        const res = await ParticipantApi.delete(partic.id, auth.token);
        setParticipantState(partic);
        if (res.error) {
            setError(res.error);
            return
        }
        setError(null);
        alert("Participant deleted")
        window.location.reload();
    };
    const onNameChange = (e) => setNameInput(e.target.value);
    const onSurnameChange = (e) => setSurnameInput(e.target.value);
    const onEmailChange = (e) => setEmailInput(e.target.value);
    const onBirthChange = (e) => setBirthInput(e.target.value);

    const onEdit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);

            const [name, surname, email, birth] = data.values();

            const res = await ParticipantApi.update({ name, surname, email, birth }, partic.id, auth.token)
            console.log(res)
            if (res.err) {
                setError(res.err);
                return
            }
            else {
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
        setNameInput(e.name);
        setSurnameInput(e.surname);
        setEmailInput(e.email);
        setBirthInput(e.birth);
        setEditMode(false);
    };


    const contentSection = editMode ? (
        <>
            <Form onSubmit={onEdit}>
                <Field
                    onChange={onNameChange}
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={nameInput}
                    required
                />
                <Field
                    onChange={onSurnameChange}
                    label="Surname"
                    placeholder="Surname"
                    name="surname"
                    value={surnameInput}
                    required
                />
                <Field
                    onChange={onEmailChange}
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={emailInput}
                    required
                />
                <Field
                    onChange={onBirthChange}
                    label="Birth"
                    placeholder="Birth"
                    name="birth"
                    value={birthInput}
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
            <Title3 style={{ cursor: "grab" }}>{partic.name} {partic.surname}</Title3>
            <Paragra>{partic.email} </Paragra>
            <Paragra>{partic.age}</Paragra>
            <Container>{contentSection}</Container>

        </Block>
    );
}