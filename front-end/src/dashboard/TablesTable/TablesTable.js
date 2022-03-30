import React from "react";
import TableHeaders from "../common/TableHeaders";
import { finishTable, listTables } from "../../utils/api";
import { useHistory } from "react-router";

export default function TablesTable({
  date,
  tables,
  setTables,
  setReservations,
}) {
  const history = useHistory();

  const handleFinish = (table_id) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      finishTable(table_id, abortController.signal)
        .then(() => {
          listTables(abortController.signal).then(setTables);
          history.push("/");
        });

      return () => abortController.abort();
    }
  };

  let tablesList = [];
  if (tables.length > 0) {
    tablesList = tables.map((table) => {
      return (
        <tr key={table.table_id}>
          <th>{table.table_id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.table_id}>
            {table.reservation_id ? "occupied" : "free"}
          </td>
          <td>Reservation: {table.reservation_id}</td>
          <td>
            {table.reservation_id && (
              <button
                className="btn btn-primary"
                data-table-id-finish={table.table_id}
                onClick={() => handleFinish(table.table_id)}
              >
                Finish
              </button>
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
              headerCols={["#", "Table Name", "Capacity", "Status"]}
            />
          </tr>
        </thead>
        <tbody>{tablesList}</tbody>
      </table>
    </>
  );
}
