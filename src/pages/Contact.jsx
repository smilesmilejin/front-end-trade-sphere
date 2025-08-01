import '../styles/Contact.css';

function Contact() {
  return (
    <div className='contact-container'>
      <h1>Stay Connected with TradeSphere</h1>
      <p>With more users joining TradeSphere every day, your feedback helps us grow better. 
        <br />
        Have questions or need help? Don’t hesitate to reach out.
      </p>
      <ul className="contact-container-no-bullets">
        <li className='email'>
          <strong>📧  Email:</strong>{' '}
          <a href="mailto:support@tradesphere.com">support@tradesphere.com</a>
        </li>
        <li className='phone'>
          <strong>📞  Phone:</strong>{' '}
          <a href="tel:+1234567890">(123) 456-7890</a>
        </li>
        <li className='address'>
          <strong>📍  Address:</strong> 123 TradeSphere Blvd, Suite 100, Charlotte, NC, 12345
        </li>
      </ul>
    </div>
  );
}

export default Contact;