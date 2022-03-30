import React, { useState } from "react";
import ReservationsTable from "../dashboard/ReservationsTable/ReservationsTable";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservations } from "../utils/api";

export default function SearchReservations({ reservations, setReservations }) {
  const [searchErrors, setSearchErrors] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleInput = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSearchErrors([]);
    const abortController = new AbortController();
    try {
      const response = await searchReservations(
        searchInput,
        abortController.signal
      );
      setReservations(response);

      if (response.length === 0) {
        setSearchErrors(["No reservations found."]);
      }
    } catch (error) {
      setReservations([]);
      setSearchErrors([error.message]);
    }

    return () => abortController.abort();
  };

  return (
    <>
      <main>
        <h2>Search Reservations</h2>
        <form onSubmit={handleSubmit}>
          <p>Mobile Number</p>
          <div>
            <input
              required
              name="mobile_number"
              id="mobile_number"
              type="text"
              placeholder="Search using a reservations mobile number..."
              value={searchInput}
              onChange={handleInput}
              className="mr-2"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <ErrorAlert errors={searchErrors} />
        <ReservationsTable reservations={reservations} />
      </main>
    </>
  );
}
