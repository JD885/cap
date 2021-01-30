import React from 'react';
import { Link } from 'react-router-dom';

export function ABS() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>ABS Implementation</h1>
      <Link to="/app/coachee" >&lt;&lt; Go Back  &lt;&lt;</Link>
    </div>
  );
}