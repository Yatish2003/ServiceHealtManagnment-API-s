# Service API

This is a simple Express API that allows you to manage services and their prices.

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/service-api.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your database credentials:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   ```

## Running the App
1. Start the server:
   ```
   npm start
   ```
2. The API will be running on `http://localhost:5000/api/service`.

## API Endpoints

- `GET /api/service`: Get all services.
- `POST /api/service`: Create a new service.
- `GET /api/service/:id`: Get a service by ID.
- `PUT /api/service/:id`: Update a service by ID.
- `DELETE /api/service/:id`: Delete a service by ID.
