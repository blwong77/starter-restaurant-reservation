import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { next, previous } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable/ReservationsTable";
import TablesTable from "./TablesTable/TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, setReservations, tables, setTables }) {
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date, setReservations, setTables]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleClick = ({ target }) => {
    switch (target.id) {
      case "Previous":
        history.push(`/dashboard?date=${previous(date)}`);
        break;
      case "Today":
        history.push(`/dashboard`);
        break;
      case "Next":
        history.push(`/dashboard?date=${next(date)}`);
        break;
      default:
    }
  };

  return (
    <div className="row">
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div className="mb-3">
          <button id="Previous" type="btn" onClick={handleClick}>
            Previous
          </button>
          <button id="Today" type="btn" onClick={handleClick}>
            Today
          </button>
          <button id="Next" type="btn" onClick={handleClick}>
            Next
          </button>
        </div>
        <ErrorAlert errors={reservationsError} />
        <ReservationsTable reservations={reservations} />
        <ErrorAlert errors={tablesError} />
        <TablesTable date={date} tables={tables} setTables={setTables} setReservations={setReservations} />
      </main>
    </div>
  );
}

export default Dashboard;
