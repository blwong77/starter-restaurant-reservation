import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

export default function Reservation () {
  const [errors, setErrors] = useState([]);
  return (
    <>
      <ErrorAlert errors={errors} />
      <ReservationForm setErrors={setErrors} />
    </>
  )
}