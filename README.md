# Restaurant Order Manager API

This is a backend API for managing restaurant orders, built with Node.js, PostgreSQL, and Sequelize. It follows Clean Architecture principles and includes unit tests with Jest.

---

## Technologies

- **Node.js**: LTS version (v18 or higher recommended).
- **PostgreSQL**: Database for storing data.
- **Sequelize**: ORM for database modeling and queries.
- **Jest**: Unit testing framework.
- **Zod**: Schema validation for requests.
- **Docker Compose**: For running PostgreSQL in a container.

---

## Setup

### Prerequisites

- Node.js installed (v18 or higher).
- Docker and Docker Compose installed (for running PostgreSQL).
- PostgreSQL client (optional, for manual database management).

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Pedro-Arruda/rxr-technical-test
   cd restaurant-order-manager
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=your_db_user
   POSTGRES_PASSWORD=your_db_password
   POSTGRES_DB=restaurant_order_manager
   ```

### Running the Application

1. Start the PostgreSQL database using Docker Compose

   ```bash
   docker-compose up -d
   ```

   This will start a PostgreSQL container with the following configuration:

   - Port: 5432
   - Database: restaurant_order_manager
   - User: your_db_user
   - Password: your_db_password

2. Run database migrations

   ```bash
   npm run migrate
   ```

3. Start the application

   ```bash
   npm run dev
   ```

   The API will be available at [http://localhost:3000](http://localhost:3000).
   The API documentation will be available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

### Running Tests

To run the unit tests, use the following command:

```bash
npm run test
```

---

<h3 align='center'>Developed By Pedro Arruda</h3>
<div align='center'>
  <a href="mailto:dev.pedro.arruda@gmail.com" title="Gmail">
     <img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white" alt="Gmail" style='height: 25px'/>
  </a>
  <a href="https://www.linkedin.com/in/pedro-scucuglia-arruda/" title="LinkedIn">
     <img src="https://img.shields.io/badge/-Linkedin-0e76a8?style=flat-square&logo=Linkedin&logoColor=white" style='height: 25px' alt="LinkedIn"/>
  </a>
  <a href="https://api.whatsapp.com/send?phone=14998861503" title="WhatsApp">
     <img src="https://img.shields.io/badge/-WhatsApp-25d366?style=flat-square&labelColor=25d366&logo=whatsapp&logoColor=white" alt="WhatsApp" style='height: 25px'/>
  </a>
</div>
