import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservations } from "../utils/api";
import { formatAsTime, isToday } from "../utils/date-time";

export default function Reservation () {
  const INITIAL_RESERVATION_FORM_DATA = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [errors, setErrors] = useState([]);
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

    // Date Validation - Restaurant is closed on 2/Tuesday
    const reservationDate = new Date(`${reservationFormData.reservation_date}T${reservationFormData.reservation_time}Z`);
    const currentDate = new Date();
    if (reservationDate.getUTCDay() === 2) {
      errorArray.push("The restaurant is closed on Tuesdays.");
    }
    if (reservationDate < currentDate) {
      errorArray.push("Please place a reservation for today or a future day.");
    }

    // Time Validation - Reservations begin at 10:30 am and end at 9:30 pm
    const splitResTime = reservationFormData.reservation_time.split(":");
    const reservationHours = splitResTime[0];
    const reservationMinutes = splitResTime[1];
    const currentTime = new Date().toTimeString();
    const currentHours = formatAsTime(currentTime).slice(0, 2);
    const currentMinutes = formatAsTime(currentTime).slice(3);

    if (reservationHours < 10 || reservationHours > 21) {
      errorArray.push("The restaurant is closed during that time.");
    } else if (
      (reservationHours === "10" && reservationMinutes < 30) ||
      (reservationHours === "21" && reservationMinutes > 30)
    ) {
      errorArray.push("The restaurant is closed during that time.");
    }

    if (isToday(reservationDate)) {
      if (reservationHours < currentHours) {
        errorArray.push("Please place a reservation during a future time.");
      } else if (
        reservationHours === currentHours &&
        reservationMinutes < currentMinutes
      ) {
        errorArray.push("Please place a reservation during a future time.");
      }
    }

    // Make Post Request if there are no errors
    if (!errorArray.length) {
      try {
        await createReservations(reservationFormData);
        history.push(`/dashboard?date=${reservationFormData.reservation_date}`);
      } catch (error) {
        errorArray.push(error.message);
        setErrors(errorArray);
      }
    } else {
      setErrors(errorArray);
    }
  };
  return (
    <>
      <ErrorAlert errors={errors} />
      <ReservationForm reservationFormData={reservationFormData} handleInput={handleInput} handleSubmit={handleSubmit} />
    </>
  )
}