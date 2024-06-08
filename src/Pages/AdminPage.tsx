import React, { useState } from 'react';
import PetTypeSelector from '../Components/PetTypeSelector';
import PetTable from '../Components/PetTable';

const AdminPage = () => {
  const [selectedType, setSelectedType] = useState<string>('');

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="h-screen pt-10 px-2">
      <PetTypeSelector onSelect={handleTypeSelect} />
      {selectedType && <PetTable type={selectedType} />}
    </div>
  );
};

export default AdminPage;
