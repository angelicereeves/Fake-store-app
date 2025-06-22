// Import necessary React hooks and router tools
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Bootstrap components
import {  Container,  Row,  Col,  Card,  Button,  Spinner,  Alert} from 'react-bootstrap';

function ProductDetails({ addToCart }) {
  // Extract the productId from the URL
  const { productId } = useParams();
  const navigate = useNavigate();

  // Local state variables
  const [product, setProduct] = useState(null);      // Store fetched product
  const [loading, setLoading] = useState(true);      // Loading state
  const [error, setError] = useState(null);          // Error state

  // Function to handle deletion of a product
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      // Send delete request to FakeStoreAPI
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      alert('Product deleted successfully. (Note: FakeStoreAPI will not persist this.)');
      navigate('/products'); // Navigate back to product listing
    } catch (err) {
      alert('Failed to delete product.'); // Display error message
      console.error(err);
    }
  };

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product details.');
        setLoading(false);
      });
  }, [productId]);

  // Display loading spinner
  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
        <span className="ms-2">Loading product...</span>
      </Container>
    );
  }

  // Display error message if fetching fails
  if (error) {
    return (
      <Container fluid className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Main render for product details
  return (
    <Container fluid className="py-5 px-4">
      <Row className="g-5 align-items-center">
        {/* Product Image */}
        <Col md={5}>
          <Card className="shadow">
            <Card.Img
              variant="top"
              src={product.image}
              style={{
                height: '100%',
                objectFit: 'contain',
                padding: '2rem',
                backgroundColor: '#f9f9f9'
              }}
            />
          </Card>
        </Col>

        {/* Product Information */}
        <Col md={7}>
          <h2>{product.title}</h2>
          <p className="text-muted mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price.toFixed(2)}</h4> {/* Displys price with 2 decimal places */}

          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-2 mt-4">
            <Button variant="success" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>

            <Button
              variant="warning"
              onClick={() => navigate(`/edit-product/${productId}`)}
            >
              Edit Product
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete Product
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/products')}
            >
              Back to Products
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
// This component fetches and displays product details, allows adding to cart, editing, and deleting the product.
// It handles loading and error states, and provides a user-friendly interface for product management.