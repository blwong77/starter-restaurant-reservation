import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";

export default function NewTable() {
  const INITIAL_TABLE_FORM = {
    table_name: "",
    capacity: 0,
    status: "free",
  };
  const [tableFormData, setTableFormData] = useState(INITIAL_TABLE_FORM);
  const [errorArray, setErrorArray] = useState([]);
  const history = useHistory();

  const handleInput = ({ target }) => {
    setTableFormData({
      ...tableFormData,
      [target.id]:
        target.id === "capacity" ? Number(target.value) : target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTable(tableFormData);
      history.push("/dashboard");
    } catch (error) {
      setErrorArray([error.message]);
    }
  };

  return (
    <>
      <ErrorAlert errors={errorArray} />
      <TableForm
        tableFormData={tableFormData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
