import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.css";
import ListIcon from "@mui/icons-material/List";
import Logo from "../../Images/Universal/Logo.png";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-white header-nav py-4"
        >
          <Container>
            <Link to="/" className="header-logo  p-0">
              <img src={Logo} className="md:w-[130px] w-[110px]" alt="logo" />
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              {/* <IconButton className=""> */}
              <ListIcon style={{ color: "#002D4B", fontSize: "50px" }} />
              {/* </IconButton> */}
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            // className="bg-black text-white"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="font-600"
                >
                  Cricket Betting Tips
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="gap-5">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* {menuList.map((val, ind) => {
                    return (
                      <Nav.Link
                        href={`https://armaniexch247news.com${val.link}`}
                        className="nav-menu bg-white text-black font-500 text-uppercase"
                        key={ind}
                      >
                        {val.menuName}
                      </Nav.Link>
                    );
                  })} */}
                  <NavDropdown
                    title="Betting Sites"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#">1xbet</NavDropdown.Item>
                    <NavDropdown.Item href="https://cricketbettingtips.org/betting-sites/india">
                      Best Betting Sites In India
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://cricketbettingtips.org/betting-sites">
                      View All Betting Sites
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Tournaments"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#">
                      Lanka Premier League
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Tamil Nadu Premier League
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Cricket Betting Tips"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="https://cricketbettingtips.org/today-match-prediction">
                      Today Match Prediction
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://cricketbettingtips.org/t20-cricket-prediction/">
                      T20 Cricket Prediction
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      Dream11 Prediction
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Today IPL Match Prediction
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://cricketbettingtips.org/toss-prediction/">
                      Toss Prediction
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="https://cricketbettingtips.org/odds/">
                    Cricket Betting Odds
                  </Nav.Link>
                  <Nav.Link href="https://cricketbettingtips.org/live-score/">
                    📡 Live Score
                  </Nav.Link>
                  <Nav.Link href="https://cricketbettingtips.org/guide/">
                    How to Bet
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
