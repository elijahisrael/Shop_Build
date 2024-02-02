import React from 'react';
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const AuthenticationPage = () => {
  const [currentForm, setCurrentForm] = React.useState<'login' | 'register'>('login');

  const switchForm = (form: 'login' | 'register') => {
    setCurrentForm(form);
  };

  return (
    <div>
      {currentForm === 'login' ? (
        <Login onFormSwitch={switchForm} />
      ) : (
        <Register onFormSwitch={switchForm} />
      )}
    </div>
  );
};

export default AuthenticationPage;;