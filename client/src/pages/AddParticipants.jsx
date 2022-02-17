import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { ParticipantApi } from "../services/participantsApi.js";
import { Container, Form, Title3 } from "../ui/Main";
import { Button } from "../ui/Button";
import { Field } from "../organisms/Field";


export const AddParticipant = () => {
    const auth = useAuth();
    const navigate = useNavigate();
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const data = new FormData(e.target);
            const [name, surname, email, birth] = data.values();
            console.log(name, surname, email, birth)
            
            if (!name.length || !surname.length || !email.length || !birth.length )
                return console.error('Please enter data');
            const res = await ParticipantApi.create({ name, surname, email, birth }, auth.token)

            if (res.error) {
                throw new Error(res.error[0].msg);
            }
            else{
            alert('Congrats added new participant');
            navigate("/participants")
            }

        } catch (error) {
            alert(error);

        }

        window.location.reload();
    };

    return (
        <Container>
            
            <Form onSubmit={handleSubmit}>
                <Title3>Add new participant</Title3>
                <Field
                    label="Name"
                    placeholder="Name"
                    name="name"
                    required
                />
                <Field
                    label="Surname"
                    placeholder="Surname"
                    name="surname"
                    required
                />
                <Field
                    label="Email"
                    placeholder="Email"
                    name="email"
                    required
                />
                <Field
                    label="Birth date"
                    placeholder="Birth date"
                    name="birth"
                    required
                />
                <Button type="submit">Add</Button>
            </Form>

        </Container>
    );
};
