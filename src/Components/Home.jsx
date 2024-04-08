import React from 'react';
import homeImage from "../assets/homeimg.png";
import "../styles/home.css";

function Home() {
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-md-center">
          <div className="card w-75">
            <img src={homeImage} className="card-img-top" alt="welcome" />
            <div className="card-body">
              <h5 className="card-title">Welcome to JAG Bad Bank</h5>
              <p className="card-text">
                Explore a new way to manage your finances! Join us and
                experience digital banking at its finest. Create your account
                today and start your journey towards smarter and more efficient
                financial management.
              </p>
              <a href="/create-account" className="btn btn-primary">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
