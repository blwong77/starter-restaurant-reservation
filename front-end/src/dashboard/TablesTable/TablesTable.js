import React from "react";
import TableHeaders from "../common/TableHeaders";

export default function TablesTable({tables}) {

  let tablesList = [];
  if(tables.length > 0) {
    tablesList = tables.map((table) => {
      return (
        <tr key={table.table_id}>
          <th>{table.table_id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.table_id}>{table.status}</td>
        </tr>
      )
    })
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
        <tbody>
          {tablesList}
        </tbody>
      </table>
    </>
  )
}