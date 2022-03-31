import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function ReservationEdit({
  reservationFormData,
  setReservationFormData,
  handleInput,
}) {
  const { reservation_id } = useParams();
  const [editErrors, setEditErrors] = useState([]);

  useEffect(() => {
    if (reservation_id) {
      const abortController = new AbortController();
      setEditErrors([]);

      readReservation(reservation_id, abortController.signal)
        .then((resp) => {
          const date = resp.reservation_date.slice(0, 10);
          setReservationFormData({ ...resp, reservation_date: date });
        })
        .catch((error) => {
          setEditErrors([error.message]);
        });
    }
  }, [reservation_id, setReservationFormData]);

  const submitFunction = async (event) => {
    const abortController = new AbortController();
    await updateReservation(reservationFormData, abortController.signal);
  };

  return (
    <main>
      <h2>Edit Reservation: #{reservation_id}</h2>
      <ErrorAlert errors={editErrors} />
      <ReservationForm
        reservationFormData={reservationFormData}
        handleInput={handleInput}
        submitFunction={submitFunction}
        setErrors={setEditErrors}
      />
    </main>
  );
}
