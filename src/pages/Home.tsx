import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home () {
  return (
    <div className="home-container">
      <Link to="/exercise1" className="home-button">Go to Exercise 1</Link>
      <Link to="/exercise2" className="home-button">Go to Exercise 2</Link>
    </div>
  );
}
