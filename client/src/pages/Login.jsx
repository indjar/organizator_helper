import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { Button } from "../ui/Button";
import { Field } from "../organisms/Field";
import { Form, Container, Main, Title3 } from "../ui/Main";


export const Login = () => {
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logError, setError] = useState(null);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return setError("Please enter email and password");


        const res = await login(email, password);

        if (res.token === undefined) {
            setError("Please check entered email and password");
        }

        else {
            setError(null);
            navigate("/");
        }

    };

    const errorShow = error || logError ? <Title3>{error}{logError}</Title3> : null

    return (
        <Main >
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Title3>Login</Title3>
                    <Field onChange={onEmailChange} label="Email" placeholder="mail@mail.lt" name="email" required />
                    <Field onChange={onPasswordChange} label="Password" placeholder="*********" name="password" type="password" required minLength={8} />
                    <Button login="true" style={{ color: "white" }} type="submit" disabled={!email || !password}>
                        Login
                    </Button>
                    {errorShow}
                </Form>
            </Container>
        </Main>
    );
};
