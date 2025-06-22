// Import required components from React Router and Bootstrap
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

// NavBar receives `cartCount` as a prop to show number of items in the cart
function NavBar({ cartCount }) {
  return (
    // Main Bootstrap Navbar component
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        {/* Brand logo/title links to home */}
        <Navbar.Brand as={Link} to="/">
          FakeStore App
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Collapsible navigation links */}
        <Navbar.Collapse id="main-navbar">
          {/* Align links to the right using Bootstrap's ms-auto (margin start auto) */}
          <Nav className="ms-auto">
            {/* Navigation links using React Router's Link component */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>

            {/* Cart link with badge showing number of items */}
            <Nav.Link as={Link} to="/cart">
              Cart{' '}
              <Badge bg="light" text="dark">
                {cartCount} {/* Dynamic count of items in cart */}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
// This component defines the navigation bar for the FakeStore app.
// It includes links to the home page, product listing, add product page, and the shopping cart.