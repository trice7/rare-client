import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from './rare.jpeg';

function AppNavBar({ token, setToken }) {
  const navigate = useRouter();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src={Logo} height="3rem" alt="Rare Logo" /> <h1 className="title is-4">Rare Publishing</h1>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                <Link passHref href="/posts">
                  <Nav.Link>Posts</Nav.Link>
                </Link>
                <Link passHref href="/my-posts">
                  <Nav.Link>My Posts</Nav.Link>
                </Link>
              </>
            ) : (
              ''
            )}

            {token ? (
              <Link passHref href="/userList">
                <Nav.Link>User Management</Nav.Link>
              </Link>
            ) : (
              ''
            )}

            {token ? (
              <Link passHref href="/categoriesList">
                <Nav.Link>Categories</Nav.Link>
              </Link>
            ) : (
              ''
            )}

            {token ? (
              <Link passHref href="/tags">
                <Nav.Link>Tag Management</Nav.Link>
              </Link>
            ) : ''}

            {token ? (
              <button
                type="button"
                className="buttonNav"
                onClick={() => {
                  setToken('');
                  navigate.push('/login');
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link passHref href="/register">
                  <Nav.Link>Register</Nav.Link>
                </Link>
                <Link passHref href="/login">
                  <Nav.Link>Login</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavBar.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
export default AppNavBar;
