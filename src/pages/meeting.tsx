import React from 'react';
import { Link } from 'react-router-dom';

export function Meeting() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Meeting Implementation</h1>
      <Link to="/app/touchpoint" > &lt;&lt; &lt;&lt; Go Back  &lt;&lt;  &lt;&lt; </Link>
    </div>
  );
}