import  { useState } from 'react';

export default function WebRequests({  OnFetchedUsers, OnFetchedExcercises  }) {
  const[checked, setChecked] = useState(false); 

  const fetchCurrentUsers = async () =>  {
    if(checked) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/workout/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (response.ok) {
        const userData = await response.json();
        OnFetchedUsers(userData);
        console.log('GET USERS request successful');
        setChecked(true);
      } else {
        OnFetchedUsers(null);
        console.error('GET USERS request failed');
      }
    } catch (error) {
      console.error('Error during GET USERS request:', error);
      OnFetchedUsers(null);
    }
  };

  const fetchCurrentExcercises = async () =>  {
    if(checked) {
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/workout/excercises', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Get EXCERCISES request successful");
        const excerciseData = await response.json();
        OnFetchedExcercises(excerciseData);
      } else {
        console.error('Error during GET EXCERCISES request');
      }
    } catch (error) {
      console.error('Error during GET EXCERCISES request:', error);
    }
  }

  fetchCurrentUsers();
  fetchCurrentExcercises();

  return(<div></div>);
}