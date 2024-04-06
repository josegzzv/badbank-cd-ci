import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";

function AllData() {
  const { users, userLoggedInIndex } = useContext(UserContext);
  const navigate = useNavigate();
  const loggedInUser =
    userLoggedInIndex !== null ? users[userLoggedInIndex] : null;

  useEffect(() => {
    if (loggedInUser === null) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  if (loggedInUser === null) {
    return null;
  }
  const currentUser = users[userLoggedInIndex];

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="card w-50">
          <h5 className="card-header">All Data</h5>
            <div className="card-body">
              <h5 className="card-title">{currentUser.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <p>Email: {currentUser.email}</p>
                <p>You current balance is: ${currentUser.balance}</p>
              </h6>
              <h3>Transactions:</h3>
              <div>
                <ul>
                  {currentUser.transactions.map((transaction, idx) => (
                    <li key={idx}>
                      {transaction.type} of ${transaction.value} on{" "}
                      {transaction.date}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllData;
