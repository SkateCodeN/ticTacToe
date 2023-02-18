import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export function NavBar() {
  // A css style to create a black nav box
  const theOutsideBox = {
    background: "black",
    height: "50px",
    color: "white"
  };
  return (
    /* Learning how to yse inline css
    <div style={theOutsideBox}>
      <div style={{ background: "red" }}>
        <h5>Tic-Tac-Toe</h5>
      </div>
    </div>
    */
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Tic-Tac-Toe</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export function Test() {}
