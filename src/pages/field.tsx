import React from 'react';
import { Link } from 'react-router-dom';

export function Field() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Field Implementation</h1>
      <Link to="/app/touchpoint" >&lt;&lt; Go Back  &lt;&lt;</Link>
    </div>
  );
}