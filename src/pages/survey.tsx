import React from 'react';
import { Link } from 'react-router-dom';

export function Survey() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Survey Implementation</h1>
      <Link to="/app/coachee" >&lt;&lt; Go Back  &lt;&lt;</Link>
    </div>
  );
}