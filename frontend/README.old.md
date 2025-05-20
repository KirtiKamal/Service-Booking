# Service Booking Frontend

This directory contains the frontend applications for all microservices in the Service Booking platform.

## Overview

The frontend is built using React.js and is organized into multiple micro-frontends, each corresponding to a specific microservice in the backend.

## Microservices Frontend Structure

1. **Service Catalog Frontend**
   - Browse and search services
   - View service details
   - Service filtering and sorting

2. **Booking Frontend**
   - Service booking interface
   - Booking management
   - Payment integration

3. **User Management Frontend**
   - User registration and login
   - Profile management
   - User preferences

4. **Review & Rating Frontend**
   - Service reviews
   - Rating system
   - User feedback

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Technology Stack

- React.js
- Redux for state management
- Material-UI for components
- Axios for API calls
- React Router for navigation

## Development Guidelines

1. Follow the component-based architecture
2. Maintain consistent styling using the shared style guide
3. Implement proper error handling
4. Write unit tests for components
5. Follow the established Git workflow

## Contributing

Please read the contribution guidelines in the root README.md file before submitting any changes. 