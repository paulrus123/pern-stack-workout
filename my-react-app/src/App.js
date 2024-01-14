import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import WebRequests from './WebRequests';
import ViewsContainer from './views/ViewsContainer';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const [excerciseOptions, setExcerciseOptions] = useState(null);
  const [users, setUsers] = useState(null);
  const[excerciseRecord, setExcerciseRecord] = useState(null);
  const { isAuthenticated } = useAuth0();

  function HandleListLoaded(excercises) {
    setExcerciseOptions(excercises);
  };

  function HandleUsersLoaded(users) {
    setUsers(users);
  };

  if(!isAuthenticated) {
    return (
      <div className="container">
      <LoginButton/>
      </div>
    );
  } else {
    return (
      <div className="container">
          <LogoutButton/>
          <div><ViewsContainer excerciseOptions={excerciseOptions} users={users} onExcerciseRecordAdded={setExcerciseRecord}/></div>
          <div><WebRequests OnFetchedUsers={HandleUsersLoaded} OnFetchedExcercises={HandleListLoaded} excerciseRecord={excerciseRecord}/></div>
      </div>
    );
  }
}