import React from "react";
import { useHistory } from "react-router";

export default function TableForm({
  tableFormData,
  handleInput,
  handleSubmit,
}) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Table Name</p>
        <input
          required
          name="table_name"
          id="table_name"
          value={tableFormData.table_name}
          onChange={handleInput}
        />
        <p>Capacity</p>
        <input
          required
          name="capacity"
          id="capacity"
          value={tableFormData.capacity}
          onChange={handleInput}
        />
      </div>
      <div className="mt-3">
        <button type="btn" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
