import  { useEffect, useState } from 'react';

export default function WebRequests({  OnFetchedUsers, OnFetchedExcercises, excerciseRecord  }) {
  const [, setPostResult] = useState(null); 

  const fetchCurrentUsers = async () =>  {
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

  const postNewExcerciseRecord = async (record) => {
    if(record == null) {
      console.log("Excercise Data null. Not posting.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/workout/singleSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: record.session_id,
          excercise: record.excercise,
          reps: record.reps,
          weight: record.weight
        }),
      });

      if (response.ok) {
        console.log('POST request successful');
      } else {
        console.error('POST request failed');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUsers();
    fetchCurrentExcercises();
  } );

  useEffect(() => {
    postNewExcerciseRecord(excerciseRecord)
    .then((result) => setPostResult(result))
    .catch((_error) => setPostResult(null));
  },[excerciseRecord] )
}