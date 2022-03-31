import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservations } from "../utils/api";

export default function NewReservation({ reservationFormData, handleInput }) {
  const [errors, setErrors] = useState([]);

  const submitFunction = async () => {
    const abortController = new AbortController();
    await createReservations(reservationFormData, abortController.signal);
  };

  return (
    <>
      <ErrorAlert errors={errors} />
      <ReservationForm
        reservationFormData={reservationFormData}
        handleInput={handleInput}
        submitFunction={submitFunction}
        setErrors={setErrors}
      />
    </>
  );
}
