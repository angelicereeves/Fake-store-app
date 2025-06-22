// Import necessary React hooks and components
import { useState } from 'react';
import axios from 'axios';
import {  Container,  Form,  Button,  Alert,  Spinner } from 'react-bootstrap';

function AddProducts() {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // State variables for UI feedback
  const [loading, setLoading] = useState(false);   // Indicates loading state
  const [error, setError] = useState(null);        // Error message display
  const [success, setSuccess] = useState(false);   // Success feedback

  // Async Function that handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default

    // Validate that all fields are filled
    if (!title || !price || !description || !category) {
      setError('Please fill in all fields.');
      return;
    }

    // Create a new product as an object
    const newProduct = {
      title,
      price: parseFloat(price), // Convert price to a number not a string
      description,
      category,
      image: 'https://via.placeholder.com/150' // Placeholder image
    };

    try {
      // Begin API request
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Send POST request to FakeStoreAPI
      await axios.post('https://fakestoreapi.com/products', newProduct);
      setSuccess(true); // Set success state to show alert

      // Clear the form inputs
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
    } catch (err) {
      setError('Something went wrong. Please try again.'); // Display error if request fails
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

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
        <h2 className="text-center mb-4">Add New Product</h2>

        {/* Display error alert if error state exists */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Display success alert if product was successfully 'added' */}
        {success && (
          <Alert variant="success">
            Product successfully "added"! (Note: FakeStoreAPI won't persist this.)
          </Alert>
        )}

        {/* Product creation form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </Form.Group>

          {/* Submit button with loading indicator */}
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner //while loading, show spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddProducts;
// This component allows users to add new products to the FakeStoreAPI.
// It includes form validation, loading state, and error handling.