import { useRouter } from "next/router";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  let token = readToken();

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout() {
    setNotExpanded();
    removeToken();
    router.push("/");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setNotExpanded();
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function setNotExpanded() {
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-primary"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Hengyi Zhao</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleExpanded}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={setNotExpanded}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" legacyBehavior passHref>
                  <Nav.Link
                    onClick={setNotExpanded}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              {!token && (
                <>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/register"}>
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/login"}>
                      Login
                    </Nav.Link>
                  </Link>
                </>
              )}
              {token && (
                <>
                  <Form className="d-flex" onSubmit={handleSubmit}>
                    &nbsp;
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearchField(e.target.value)}
                    />
                    <Button type="submit">Search</Button>
                    &nbsp;
                  </Form>
                  <Nav>
                    <NavDropdown title={token.userName}>
                      <Link href="/favourites" legacyBehavior passHref>
                        <NavDropdown.Item
                          onClick={setNotExpanded}
                          active={router.pathname === "/favourites"}
                        >
                          Favourites
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/history" legacyBehavior passHref>
                        <NavDropdown.Item
                          onClick={setNotExpanded}
                          active={router.pathname === "/history"}
                        >
                          Search History
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item onClick={logout}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
