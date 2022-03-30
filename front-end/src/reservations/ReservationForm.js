import React from "react";
import { useHistory } from "react-router";

export default function ReservationForm({
  reservationFormData,
  handleInput,
  handleSubmit,
}) {
  const history = useHistory();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <p>First Name:</p>
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleInput}
            value={reservationFormData.first_name}
            required
          />
          <p>Last Name:</p>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleInput}
            value={reservationFormData.last_name}
            required
          />
          <p>Mobile Number:</p>
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            onChange={handleInput}
            value={reservationFormData.mobile_number}
            required
          />
          <p>Reservation Date:</p>
          <input
            type="date"
            name="reservation_date"
            id="reservation_date"
            onChange={handleInput}
            value={reservationFormData.reservation_date}
            required
          />
          <p>Reservation Time:</p>
          <input
            type="time"
            name="reservation_time"
            id="reservation_time"
            onChange={handleInput}
            value={reservationFormData.reservation_time}
            required
          />
          <p>People:</p>
          <input
            type="number"
            name="people"
            id="people"
            onChange={handleInput}
            value={reservationFormData.people}
            min="1"
            required
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary" type="btn" onClick={() => history.goBack()}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
