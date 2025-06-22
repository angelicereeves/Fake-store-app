// Import necessary Bootstrap components
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// The CartPage component receives the current cartItems array and a removeFromCart function
function CartPage({ cartItems, removeFromCart }) {
  // Calculate the total price of all items in the cart
  const total = cartItems
    .reduce((sum, item) => sum + item.price, 0) // Sum up the price of each item
    .toFixed(2); // Format to 2 decimal places

  return (
    <div
      style={{ // Full viewport width and height for the cart page
        width: '100vw',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h2 className="mb-4">Your Cart</h2>

      {/* If the cart is empty, show a message */}
      {cartItems.length === 0 ? (
        <h5>Your cart is empty.</h5>
      ) : (
        // If there are items, display them in a responsive grid
        <Row className="g-4">
          {cartItems.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                {/* Product image */}
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{
                    height: '250px',
                    objectFit: 'contain',
                    padding: '1rem',
                    backgroundColor: '#ffffff',
                  }}
                />
                
                {/* Product details */}
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> ${item.price.toFixed(2)}
                    </Card.Text>
                  </div>

                  {/* Remove item button */}
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove item
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Show total and checkout button if there are items */}
      {cartItems.length > 0 && (
        <div className="mt-5 d-flex justify-content-between align-items-center flex-wrap">
          <h4>Total: ${total}</h4>
          <Button variant="primary" disabled>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
// This component displays the user's shopping cart.
// It shows the items in the cart, allows removal of items, and displays the total price