import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth} from "../services/authService";
import { Button } from "../ui/Button";
import { Field } from "../organisms/Field";
import { Form, Container, Main, Title3 } from "../ui/Main";


export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return setError("Please enter email and password");

        const res = await Auth.register(email, password);

        if (res.error) {
           setError(res.err);
            return alert(`Please check Your email or password`);
        }
        
        else {setError(null);
        alert('Registration successful, please login')};
        navigate("/");
    
    };

    return (
        <Main>
      <Container>
            <Form onSubmit={handleSubmit}>
                <Title3>Register</Title3>
                <Field onChange={onEmailChange} label="Email" placeholder="mail@mail.lt" name="email" required />
                <Field onChange={onPasswordChange} label="Password" name="*********" type="password" required minLength={8} />
                <Button type="submit" disabled={!email || !password}>
                        Register
                </Button>
                <div 
                style={{color: "#D4AF37",
                        padding:"20px", 
                        textAlign:"center", 
                        font:"message-box"}}>
                            {error}
                </div>
            </Form>
            </Container>
        </Main>
    );
};
