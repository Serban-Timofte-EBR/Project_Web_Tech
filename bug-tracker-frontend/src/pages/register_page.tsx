import React from 'react';
import RegisterForm from '../components/auth/Register/register_form';

const RegisterPage: React.FC = () => {
  const handleRegister = (email: string, password: string, team: string) => {
    console.log('Registering with', email, password, team);
  };

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;