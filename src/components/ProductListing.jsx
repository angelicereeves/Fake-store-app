// Import React hooks and necessary libraries
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Bootstrap components
import {  Container,  Card,  Button,  Row,  Col,  Spinner,  Alert} from 'react-bootstrap';

function ProductListing() {
  // State to hold products fetched from the API
  const [products, setProducts] = useState([]);

  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // State to capture any error during fetch
  const [error, setError] = useState(null);

  // Fetch products from FakeStoreAPI on initial render
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data); // Set the product data
        setLoading(false);          // Set loading to false after successful fetch
      })
      .catch((error) => {
        setError(`Failed to fetch products: ${error.message}`); // Set error message
        setLoading(false);                                      // Stop loading indicator
      });
  }, []); // Empty dependency array means this runs once on mount

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
        <p className="ms-3">Loading products...</p>
      </Container>
    );
  }

  // Show error alert if fetching failed
  if (error) {
    return (
      <Container fluid className="mt-5 px-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Main UI: List of products in responsive Bootstrap cards
  return (
    <Container
      fluid
      className="px-5 py-4"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <h2 className="mb-4 text-center">Product List</h2>

      {/* Grid of product cards */}
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              {/* Product image */}
              <Card.Img
                variant="top"
                src={product.image}
                style={{
                  height: '250px',
                  objectFit: 'contain',
                  padding: '20px',
                  backgroundColor: '#fff'
                }}
              />

              {/* Product details */}
              <Card.Body className="d-flex flex-column">
                {/* Product title with truncation for better readability */}
                <Card.Title
                  style={{ fontSize: '1rem', minHeight: '3em' }}
                  className="text-truncate"
                  title={product.title}
                >
                  {product.title}
                </Card.Title>

                {/* Product price */}
                <Card.Text className="mt-auto fw-bold">
                  ${product.price.toFixed(2)}
                </Card.Text>

                {/* View Details button */}
                <Button
                  variant="primary"
                  as={Link}
                  to={`/products/${product.id}`}
                  className="mt-3"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductListing;
// This component fetches and displays a list of products from the FakeStoreAPI.
// It handles loading and error states, and uses Bootstrap for responsive design.