import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { EventsApi } from "../services/eventsApi.js";
import { Container, Form, Title3 } from "../ui/Main";
import { Button } from "../ui/Button";
import { Field } from "../organisms/Field";

export const AddEvent = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [event] = data.values();
            
            if (!event.length )
                return console.error('Please enter event');
            const res = await EventsApi.add({ event }, auth.token)
            if (res.err) throw new Error(res.err);
            console.log(res, auth)
            alert('Congrats added new event');
            navigate("/events")

        } catch (error) {
            alert(error);

        }

        window.location.reload();
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title3>Add new event</Title3>
                <Field

                    label="Event"
                    placeholder="Event"
                    name="event"
                    required
                />
                <Button type="submit">Add</Button>
            </Form>

        </Container>
    );
};
