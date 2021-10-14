import React from 'react';
import { Link } from 'react-router-dom';

export default function ConfigButton() {
  return (
    <>
      <Link to="/settings">
        <button data-testid="btn-settings" className="btn btn-secondary m-2 fa fa-gear">
        </button>
      </Link>
    </>
  );
}
