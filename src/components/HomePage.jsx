// Import Bootstrap layout and button components
import { Container, Button } from 'react-bootstrap';
// Import useNavigate hook from React Router
import { useNavigate } from 'react-router-dom';

function HomePage() {
  // Initialize navigate function to redirect user when button is clicked
  const navigate = useNavigate();

  return (
    // Full-screen responsive container using Bootstrap classes and inline styles
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Main heading */}
      <h1 className="mb-4 display-4">Welcome to the FakeStore App!</h1>

      {/* Subheading with max width and padding for readability on smaller screens */}
      <p className="lead mb-5 px-3" style={{ maxWidth: '800px' }}>
        Browse a variety of fake products, add your own, or practice editing and deleting!
      </p>

      {/* Button navigates to the product listing page when clicked */}
      <Button size="lg" variant="primary" onClick={() => navigate('/products')}>
        View Products
      </Button>
    </Container>
  );
}

export default HomePage;
// This component serves as the homepage of the FakeStore app.
// It provides a welcoming message and a button to navigate to the product listing page.