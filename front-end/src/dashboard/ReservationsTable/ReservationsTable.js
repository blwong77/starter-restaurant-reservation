import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { updateReservationStatus } from "../../utils/api";
import TableHeaders from "../common/TableHeaders";

export default function ReservationsTable({ reservations }) {
  const history = useHistory();
  let reservationList = [];

  const handleCancel = async (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try{
        const abortController = new AbortController();
        await updateReservationStatus(
          reservation_id,
          "cancelled",
          abortController.signal
        );
        history.push("/");
        return () => abortController.abort();
      } catch(error) {
        console.error(error.message)
      }

    }
  };

  if (reservations.length > 0) {
    reservationList = reservations.map((res) => {
      return (
        <tr key={res.reservation_id}>
          <td>{res.reservation_id}</td>
          <td>{`${res.first_name} ${res.last_name}`}</td>
          <td>{res.mobile_number}</td>
          <td>{res.people}</td>
          <td>{res.reservation_time}</td>
          <td data-reservation-id-status={res.reservation_id}>{res.status}</td>
          <td>
            {res.status === "booked" && (
              <>
                <Link
                  className="btn btn-primary"
                  to={`/reservations/${res.reservation_id}/seat`}
                >
                  Seat
                </Link>
                <Link
                  className="btn btn-primary"
                  to={`/reservations/${res.reservation_id}/edit`}
                >
                  Edit
                </Link>
                {res.status !== "cancelled" && res.status !== "finished" && (
                  <button
                    className="btn btn-danger"
                    type="button"
                    data-reservation-id-cancel={res.reservation_id}
                    onClick={() => handleCancel(res.reservation_id)}
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <TableHeaders
              headerCols={["#", "Name", "Phone", "People", "Time", "Status"]}
            />
          </tr>
        </thead>
        <tbody>{reservationList}</tbody>
      </table>
    </>
  );
}
