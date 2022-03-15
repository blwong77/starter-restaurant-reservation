import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { next, previous } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable/ReservationsTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
        <ErrorAlert error={reservationsError} />
        <ReservationsTable reservations={reservations} />
      </main>
    </div>
  );
}

export default Dashboard;
