import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import useTransactions from "../hooks/useTransactions";
import "../styles/transactions.css";

function Withdraw() {
  const [amount, setAmount] = useState(0);
  const { users, userLoggedInIndex } = useContext(UserContext);
  const navigate = useNavigate();
  const { withdraw } = useTransactions();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isAmountValid, setIsAmountValid] = useState(null);

  const loggedInUser =
    userLoggedInIndex !== null ? users[userLoggedInIndex] : null;

  useEffect(() => {
    if (loggedInUser === null) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const isValid = !isNaN(value) && value.trim() !== "" && parseFloat(value) > 0 && (parseFloat(value)<=parseFloat(loggedInUser.balance));
    setIsAmountValid(isValid);

    if (isNaN(value)) {
      setMessage({ text: "Please enter a numeric value", type: "danger" });
    } else {
      setMessage({ text: "", type: "" });
    }

    if (parseFloat(value)>parseFloat(loggedInUser.balance)){
      setMessage({ text: "Amount exceeds balance.", type: "danger" });
    } else {
      setMessage({ text: "", type: "" });
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleWithdraw = () => {
    if (isNaN(amount) || amount === "") {
      setMessage({ text: "Please enter a numeric value.", type: "danger" });
      return;
    }

    const success = withdraw(parseFloat(amount));
    if (success) {
      setMessage({ text: "Withdraw successful.", type: "success" });
      setAmount(0);
    } else {
      setMessage({ text: "Withdraw error. Wrong value", type: "danger" });
    }
  };

  if (loggedInUser === null) {
    return null;
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Withdraw</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Your current balance is: ${loggedInUser.balance}
              </h6>
              <br></br>
              {message.text && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <div>
                <div className="input-group mb-3 reduce-size-40">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    onFocus={handleFocus}
                    className={`form-control cus-text-align-end ${
                      isAmountValid === true ? "is-valid" : ""
                    } ${isAmountValid === false ? "is-invalid" : ""}`}
                    aria-label="Amount (to the nearest dollar)"
                  />
                  
                </div>
                <button className="btn btn-primary" onClick={handleWithdraw} disabled={!isAmountValid}>
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
