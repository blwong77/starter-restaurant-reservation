import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Dashboard from "../dashboard/Dashboard";
import Reservations from "../reservations/Reservations";
import ReservationSeating from "../reservations/ReservationSeating";
import NotFound from "./NotFound";
import NewTable from "../Tables/NewTable";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const [date, setDate] = useState(today());
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);

  const query = useQuery();

  useEffect(() => {
    const checkDateQuery = query.get("date");

    checkDateQuery ? setDate(query.get("date")) : setDate(today());
  }, [query, setDate]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <Reservations />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <ReservationSeating reservations={reservations} tables={tables} setTables={setTables} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          reservations={reservations}
          setReservations={setReservations}
          tables={tables}
          setTables={setTables}
        />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
