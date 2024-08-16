import React from 'react';
import TaxList from './TaxList';  // Adjust the import path according to your project structure

const ParentComponent = () => {
  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Deleting item with ID: ${id}`);
  };

  const handleUpdate = (id) => {
    // Implement update functionality here
    console.log(`Updating item with ID: ${id}`);
  };

  return (
    <div>
      <TaxList 
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ParentComponent;
