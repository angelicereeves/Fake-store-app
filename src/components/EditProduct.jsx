// Import React hooks and tools for routing and navigation
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios'; // For API requests
import {  Form,  Button,  Alert,  Spinner} from 'react-bootstrap'; // UI components from React Bootstrap

function EditProduct() {
  // Extract the product ID from the URL parameters
  const { id } = useParams();

  // Hook to navigate to another route
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // State for UI behavior
  const [loading, setLoading] = useState(true);       // Shows initial loading state
  const [submitting, setSubmitting] = useState(false); // Disables button during submission
  const [error, setError] = useState(null);           // To display error messages
  const [success, setSuccess] = useState(false);      // To show success feedback

  // Fetch the product data when component mounts
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        const { title, price, description, category } = response.data;

        // Populate form fields with existing product values
        setTitle(title);
        setPrice(price);
        setDescription(description);
        setCategory(category);
        setLoading(false); // Done loading
      })
      .catch(() => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]); // Run again only if the ID changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!title || !price || !description || !category) {
      setError('Please fill in all fields.');
      return;
    }

    // Build the updated product object
    const updatedProduct = {
      title,
      price: parseFloat(price),
      description,
      category,
      image: 'https://via.placeholder.com/150' // Static placeholder image
    };

    try {
      setSubmitting(true); // Show loading spinner on button
      await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
      setSuccess(true);   // Show success alert
      setError(null);     // Clear error

      // Automatically redirect to product listing after 1.5 seconds
      setTimeout(() => navigate('/products'), 1500);
    } catch {
      setError('Failed to update product.');
    } finally {
      setSubmitting(false); // Hide loading spinner
    }
  };

  // Loading spinner shown while fetching product data
  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spinner animation="border" />
        <p className="ms-3">Loading product...</p>
      </div>
    );
  }

  // Main form render
  return (
    <div
      style={{ // Fullscreen container for the form
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '2rem'
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Edit Product</h2>

        {/* Show any error message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Show success message when update completes */}
        {success && (
          <Alert variant="success">
            Product updated successfully! (Note: FakeStoreAPI won't persist this.)
          </Alert>
        )}

        {/* Form fields for editing */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          {/* Submit button with loading spinner */}
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditProduct;
// This component allows users to edit existing products in the FakeStoreAPI.
// It fetches product details, populates a form, and submits updates.