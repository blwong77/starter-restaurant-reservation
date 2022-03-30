import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param errors
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ errors }) {
  if (!errors) return null;
  return errors.map((error) => {
    return <div key={error} className="alert alert-danger m-2">Error: {error}</div>;
  });
}

export default ErrorAlert;
