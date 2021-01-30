import React from 'react';
import { Link } from 'react-router-dom';

export function CoacheeSelector() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Coachee Selector Implementation</h1>
      <Link to="/app/coachee/touchpoint" >Go to Coachee page</Link>
      <br /><br />
      <Link to="/app" >&lt;&lt; Go Back  &lt;&lt;</Link>

    </div>

  );
}
