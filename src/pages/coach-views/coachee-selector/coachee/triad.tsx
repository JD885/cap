import React from 'react';
import { Link } from 'react-router-dom';

export function Triad() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Triad Implementation</h1>
      <Link to="/app/touchpoint" >&lt;&lt; ck  &lt;&lt;</Link>
    </div>
  );
}