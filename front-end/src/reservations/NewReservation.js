import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservations } from "../utils/api";
import { today } from "../utils/date-time";

export default function NewReservation() {
  const NEW_RESERVATION_FORM_DATA = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: 0,
    status: "booked",
  };
  const [errors, setErrors] = useState([]);
  const [newReservationFormData, setNewReservationFormData] = useState(
    NEW_RESERVATION_FORM_DATA
  );

  const handleInput = ({ target }) => {
    target.id === "people"
      ? setNewReservationFormData({
          ...newReservationFormData,
          [target.id]: Number(target.value),
        })
      : setNewReservationFormData({
          ...newReservationFormData,
          [target.id]: target.value,
        });
  };

  const submitFunction = async () => {
    const abortController = new AbortController();
    await createReservations(newReservationFormData, abortController.signal);
  };

  return (
    <>
      <ErrorAlert errors={errors} />
      <ReservationForm
        reservationFormData={newReservationFormData}
        handleInput={handleInput}
        submitFunction={submitFunction}
        setErrors={setErrors}
      />
    </>
  );
}
