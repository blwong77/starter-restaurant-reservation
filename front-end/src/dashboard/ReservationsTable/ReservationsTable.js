import React from "react";
import { Link } from "react-router-dom";
import TableHeaders from "../common/TableHeaders";

export default function ReservationsTable({ reservations }) {
  let reservationList = [];
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
