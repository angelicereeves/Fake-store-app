// Import necessary React hooks and React Router navigation tools
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function NotFound() {
  // Hook to navigate
  const navigate = useNavigate();

  // State to track countdown timer before redirect
  const [countdown, setCountdown] = useState(10); // Start at 10 seconds

  useEffect(() => {
    // Interval: decrement countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Timeout: redirect to home after 10 seconds
    const timeout = setTimeout(() => {
      navigate('/'); // Redirect to home page
    }, 10000);

    // Cleanup both interval and timeout on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]); // Only run once when component mounts

  return (
    // Centered container using Bootstrap classes
    <Container className="text-center mt-5">
      {/* Error heading */}
      <h2 className="text-danger">404 - Page Not Found</h2>

      {/* Error message */}
      <p>I'm sorry, that location does not exist.</p>

      {/* Live countdown display */}
      <p>
        <strong>You will be redirected to the home page in {countdown} seconds...</strong>
      </p>

      {/* Optional button for immediate navigation back to home */}
      <Button variant="primary" as={Link} to="/" className="mt-3">
        Go Home Now
      </Button>
    </Container>
  );
}

export default NotFound;
// This component displays a 404 error message when a user navigates to a non-existent route.
// It includes a countdown timer that automatically redirects to the home page after 10 seconds,
