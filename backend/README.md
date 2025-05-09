# Service Booking Backend

This directory contains all the microservices that power the Service Booking platform.

## Microservices Architecture

The backend is built using a microservices architecture, with each service handling a specific business domain:

1. **Service Catalog Service**
   - Service listing and management
   - Service categories and tags
   - Search and filtering functionality
   - Location: `backend/service-catelog/`

2. **Booking Service**
   - Booking creation and management
   - Availability checking
   - Booking status updates
   - Location: `backend/booking-service/`

3. **User Service**
   - User authentication and authorization
   - User profile management
   - Role-based access control
   - Location: `backend/user-service/`

4. **Review Service**
   - Review and rating management
   - Rating aggregation
   - Review moderation
   - Location: `backend/review-service/`

5. **Payment Service**
   - Payment processing
   - Transaction management
   - Refund handling
   - Location: `backend/payment-service/`

## Technology Stack

- Node.js and Express.js
- MongoDB for data storage
- JWT for authentication
- RabbitMQ for message queuing
- Docker for containerization

## Getting Started

1. Install dependencies for each service:
   ```bash
   cd <service-directory>
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

Each service has its own API documentation. Please refer to the individual service directories for detailed API specifications.

## Development Guidelines

1. Follow the established microservices architecture
2. Implement proper error handling and logging
3. Write unit and integration tests
4. Follow REST API best practices
5. Use proper versioning for APIs
6. Implement proper security measures

## Database Schema

Each service has its own database schema. Refer to the individual service documentation for detailed schema information.

## Contributing

Please read the contribution guidelines in the root README.md file before submitting any changes. 