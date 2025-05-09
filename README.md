# Service Booking Platform

A modern microservices-based platform for booking various services online.

## Project Overview

This project is a full-stack application built using a microservices architecture. It allows users to browse, book, and manage various services while providing a seamless experience for both service providers and customers.

## Project Structure

```
service-booking/
├── frontend/           # React.js frontend applications
├── backend/           # Microservices backend
│   ├── service-catelog/    # Service listing and management
│   ├── booking-service/    # Booking management
│   ├── user-service/       # User management
│   ├── review-service/     # Review and rating
│   └── payment-service/    # Payment processing
└── docs/              # Project documentation
```

## Features

- Service browsing and searching
- User authentication and authorization
- Service booking and management
- Review and rating system
- Payment processing
- Real-time notifications
- Admin dashboard

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional)
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KirtiKamal/Service-Booking.git
   cd Service-Booking
   ```

2. Set up the backend services:
   ```bash
   cd backend
   # Follow instructions in backend/README.md
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   # Follow instructions in frontend/README.md
   ```

4. Start the development environment:
   ```bash
   # Start backend services
   cd backend
   npm run dev

   # Start frontend
   cd frontend
   npm start
   ```

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your changes and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- All contributors who have helped shape this project
- Open source community for the amazing tools and libraries 