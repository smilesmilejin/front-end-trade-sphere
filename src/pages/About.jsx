import '../styles/About.css';

function About() {
  return (
    <div>
      <h1>About TradeSphere</h1>

      <section>
        <h2>User Registration and Login</h2>
        <p>
          New users can create an account using their email to join TradeSphere.
          Existing users can log in with their credentials to access their profiles.
        </p>
      </section>

      <section>
        <h2>Posting and Managing Listings</h2>
        <p>
          Registered users can post items for sale. Each listing can include details
          such as name, category, description, price, location, pictures, and contact information.
          Users can easily update, delete, or change the status of their listings in the profile—marking items for sale as sold.
        </p>
      </section>

      <section>
        <h2>Browsing and Searching</h2>
        <p>
          No login is required to browse the platform. Anyone can search and filter listings by category,
          location, date, and availability to find items for sale or wanted.
        </p>
      </section>

      <section>
        <h2>Item Details and Favorites</h2>
        <p>
          Clicking on an item reveals full details. Users can favorite items and quickly access their saved listings from their profile.
        </p>
      </section>

      <section>
        <h2>Watchlist Feature</h2>
        <p>
          Users can add category-related keywords to a personalized watchlist. When new items matching these criteria are posted,
          they appear in the user’s watchlist within their profile, helping users stay updated on items of interest.
        </p>
      </section>
    </div>

  );
}

export default About;