import React from "react";
import { NavLink } from "react-router-dom";

type LoginProps = {
  onFormSwitch: (form: 'login' | 'register') => void;
};

export const Login: React.FC<LoginProps> = (props) => {
  const { onFormSwitch } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password);
    console.log(email);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
                placeholder="youremail@gmail.com"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                placeholder="*********"
                name="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
          <NavLink onClick={() => onFormSwitch("register")}
           to="/register" className="btn btn-link mt-2">
            Don't have an account? Sign up here.
          </NavLink>
        </div>
      </div>
    </div>
  );
};
