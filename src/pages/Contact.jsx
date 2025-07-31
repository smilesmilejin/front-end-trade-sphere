
function Contact() {
  return (
    <div>
      <h1>Contact Information</h1>
      <p>If you have any questions, need assistance, or want to provide feedback, please reach out to us:</p>
      <ul className="no-bullets">
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:support@tradesphere.com">support@tradesphere.com</a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a href="tel:+1234567890">(123) 456-7890</a>
        </li>
        <li>
          <strong>Address:</strong> 123 TradeSphere Blvd, Suite 100, Charlotte, NC, 12345
        </li>
      </ul>
    </div>
  );
}

export default Contact;