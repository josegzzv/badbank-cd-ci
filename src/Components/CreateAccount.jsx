import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import useAuth from "../hooks/useAuth.js";

function CreateAccount() {
  const { users, setUsers } = useContext(UserContext);
  const { createUser } = useAuth(users, setUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [validationState, setValidationState] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [accountCreated, setAccountCreated] = useState(false);

  const handleInputChange = (e) => {
    let isValid = false;
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    isValid = e.target.value.length > 0;

    if (e.target.name === "email") {
      isValid = false;
      isValid = !(
        !newUser.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.email)
      );
    }
    if (e.target.name === "password") {
      isValid = e.target.value.length > 7;
    }

    setValidationState({ ...validationState, [e.target.name]: isValid });
  };

  const validateForm = () => {
    const isNameValid = newUser.name.length > 0;
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      newUser.email
    );
    const isPasswordValid = newUser.password.length > 7;

    setValidationState({
      name: isNameValid,
      email: isEmailValid,
      password: isPasswordValid,
    });

    return isNameValid && isEmailValid && isPasswordValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    const result = createUser(users, setUsers, {
      ...newUser,
      balance: 0,
      transactions: [],
    });

    if (result.success) {
      setMessage({ text: result.message, type: "success" });
      setNewUser({ name: "", email: "", password: "" });
      setValidationState({ name: null, email: null, password: null });
      setAccountCreated(true);
    } else {
      setMessage({ text: result.message, type: "danger" });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Create a new Account</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Join us and begin your new financial adventure
              </h6>
              <br></br>
              {message.text && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <form
                className="row g-3 needs-validation"
                noValidate
                onSubmit={handleRegister}
              >
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        validationState.name === true ? "is-valid" : ""
                      } ${validationState.name === false ? "is-invalid" : ""}`}
                      id="name"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        validationState.email === true ? "is-valid" : ""
                      } ${validationState.email === false ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email.
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        validationState.password === true ? "is-valid" : ""
                      } ${
                        validationState.password === false ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your password, minimum 8 caracters long.
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit" disabled={!validationState.name || !validationState.email || !validationState.password}>
                {accountCreated ? "Create Another Account" : "Create Account"}
                </button>
              </form>{" "}
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
