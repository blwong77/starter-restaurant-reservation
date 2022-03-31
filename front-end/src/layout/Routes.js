import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import ReservationSeating from "../reservations/ReservationSeating";
import NotFound from "./NotFound";
import NewTable from "../Tables/NewTable";
import SearchReservations from "../searchReservations/SearchReservations";
import ReservationEdit from "../reservations/ReservationEdit";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const INITIAL_RESERVATION_FORM_DATA = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
    status: "booked",
  };

  const [date, setDate] = useState(today());
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reservationFormData, setReservationFormData] = useState({
    ...INITIAL_RESERVATION_FORM_DATA,
  });
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
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <ReservationSeating
          reservations={reservations}
          tables={tables}
          setTables={setTables}
        />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <ReservationEdit
          reservationFormData={reservationFormData}
          setReservationFormData={setReservationFormData}
        />
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
      <Route exact={true} path="/search">
        <SearchReservations
          reservations={reservations}
          setReservations={setReservations}
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
