import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationSeating({ reservations, tables, setTables }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [seatingError, setSeatingError] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch((error) => {
        setSeatingError([error.message]);
      });

    return () => abortController.abort();
  }, [reservation_id, setTables]);

  const handleCancel = () => {
    history.goBack();
  };

  const handleChange = ({ target }) => {
    target.value > 0 ? setSelectedTable(target.value) : setSelectedTable(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = [];

    if (!selectedTable) {
      errors.push("No table selected.");
    }
    if (!reservation_id) {
      errors.push(`Reservation #${reservation_id} does not exist.`);
    }

    if (!errors.length) {
      try {
        const abortController = new AbortController();
        await updateTable(
          selectedTable,
          reservation_id,
          abortController.signal
        );
        history.push("/dashboard");
      } catch (error) {
        errors.push(error.message);
        setSeatingError(errors);
      }
    } else {
      setSeatingError(errors);
    }
  };

  return (
    <main>
      <ErrorAlert errors={seatingError} />
      <h2>Seating Reservation: #{reservation_id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Select a table to seat the reservation</p>
          <select name="table_id" id="table_id" onChange={handleChange}>
            <option value={0}>
              -- Select a Table --
            </option>
            {tables.map((table) => {
              return (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary mr-2" type="btn" onClick={handleCancel}>Cancel</button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
