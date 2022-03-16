import React from "react";
import TableData from "../common/TableData";
import TableHeaders from "../common/TableHeaders";

export default function ReservationsTable({ reservations }) {
  
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <TableHeaders
              headerCols={["#", "Name", "Phone", "Date", "Time", "People"]}
            />
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const {
              reservation_id,
              first_name,
              last_name,
              mobile_number,
              reservation_date,
              reservation_time,
              people,
            } = reservation;
            return (
              <tr key={reservation_id}>
                <TableData
                  tableData={[
                    reservation_id,
                    `${last_name}, ${first_name}`,
                    mobile_number,
                    reservation_date,
                    reservation_time,
                    people,
                  ]}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
