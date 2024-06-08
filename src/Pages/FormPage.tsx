import React from "react";
import { useParams } from "react-router-dom";
import FormDialog from "../Components/FormDialog";


const FormPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  if (!type) {
    return <div>Invalid pet type.</div>;
  }

  return <FormDialog type={type} isOpen={true} onClose={() => {}} />;
};

export default FormPage;
