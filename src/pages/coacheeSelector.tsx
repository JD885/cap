import React from 'react';
import { Link } from 'react-router-dom';
import {translate} from "../constants/translate";

export function CoacheeSelector() {
  const translations = translate.use().coacheeSelector;
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Coachee Selector Implementation</h1>
      <Link to="/app/coachee/touchpoint" >{translations.goto}</Link>
      <br /><br />
      <Link to="/app" >&lt;&lt; Go Back  &lt;&lt;</Link>

    </div>

  );
}
