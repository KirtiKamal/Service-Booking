import React from 'react';
import ServiceForm from '../components/ServiceForm';

const CreateService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Service</h1>
      <ServiceForm />
    </div>
  );
};

export default CreateService;
