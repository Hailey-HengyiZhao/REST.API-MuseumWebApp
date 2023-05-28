import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState} from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";

export default function Register(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    registerUser(user, password, password2)
      .then(() => {
        console.log("Successful Register user: " + user);

        router.push("/login");
      })
      .catch((err) => {
        setWarning(err.message);
      });
  }
  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>Register for an account:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            id="userName"
            name="userName"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            id="password2"
            name="password2"
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
      {warning && (
        <>
          <br />
          <Alert variant="danger">{warning}</Alert>
        </>
      )}
    </>
  );
}
