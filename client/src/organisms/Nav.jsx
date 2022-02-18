import { Link } from "react-router-dom";
import { useAuth } from "../hook/auth.js";
import { Button } from "../ui/Button";
import { Header, Navbar, Title1, Navi, Item, Title3 } from "../ui/Navbar";

export const Nav = () => {
  const auth = useAuth();

  const start = auth.token !== undefined && auth.token !== null ? (
    <Navi>
      <Button>
        <Link style={{ color: "#D4AF37" }} to="/">
          Home
        </Link>
      </Button>
      <Button color="main">
        <Link style={{ color: "#2F4F4F" }} to="/events">
          Events list
        </Link>
      </Button>
      <Button >
        <Link style={{ color: "#D4AF37" }} to={`/participants`}>
          Participants
        </Link>
      </Button>
      <Button color="main">
        <Link style={{ color: "#2F4F4F" }} to={`/eventList`}>
          List adden events
        </Link>
      </Button>
      <Button>
        <Link style={{ color: "#D4AF37" }} onClick={() => auth.logout()} to="/">
          Logout
        </Link>
      </Button>
    </Navi>
  ) : null;

  const buttons = auth.token !== undefined && auth.token !== null ? (
    <Title3>Welcome, {auth.email}!</Title3>
  ) : (
    <Navi>
      <Button color="main">
        <Link style={{ color: "#2F4F4F" }} to="/">
          Login
        </Link>
      </Button>

      <Button>
        <Link style={{ color: "#D4AF37" }} to="/register">
          Register
        </Link>
      </Button>
    </Navi>
  );

  return (
    <Header style={{}}>
      <Navbar className="navbar">
        <Title1>
          <Link to="/">
            <Item
              as="img"
              src={`${process.env.PUBLIC_URL}/logo.jpg`}
              alt="logo"
              style={{ maxHeight: "120px", maxWidth: "200px", padding: "20px" }}
            />
          </Link>
        </Title1>
        {start}
        <div>{buttons}</div>
      </Navbar>
    </Header>
  );
};
