import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservations } from "../utils/api";
import { today } from "../utils/date-time";

export default function ReservationForm({ setErrors }) {
  const INITIAL_RESERVATION_FORM_DATA = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const history = useHistory();
  
  const [reservationFormData, setReservationFormData] = useState({
    ...INITIAL_RESERVATION_FORM_DATA,
  });

  const handleInput = ({ target }) => {
    target.id === "people"
      ? setReservationFormData({
          ...reservationFormData,
          [target.id]: Number(target.value),
        })
      : setReservationFormData({
          ...reservationFormData,
          [target.id]: target.value,
        });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorArray = [];  
    
    //Date Validation - Restaurant is closed on 2/Tuesday
    const reservationDate = new Date(reservationFormData.reservation_date)
    const currentDate = new Date(today())
    if(reservationDate.getUTCDay() === 2) {
      errorArray.push("The restaurant is closed on Tuesdays.")
    }
    if(reservationDate < currentDate) {
      errorArray.push("Please place a reservation for today or a future day.")
    }

    if(!errorArray.length){
      try {
        await createReservations({ data: reservationFormData });
        history.push(`/dashboard?date=${reservationFormData.reservation_date}`);
      } catch (error) {
        errorArray.push(error.message)
        setErrors(errorArray)
      }
    } else {
      setErrors(errorArray)
    }
  };

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
        <button type="btn" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
