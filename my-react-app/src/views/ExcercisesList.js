import React, { Component } from 'react'
import Excercise from '../components/Excercise';

export default function ExcercisesList({excerciseOptions}) {

  function mapList() {
      return excerciseOptions.map(option => {
          return <Excercise excercise={option} key={option.excercise_id} />;
      })
  }
  
  return (
    <div>
      <h3>Excercise Definitions</h3>
      { !excerciseOptions ? 
        (
          <p>Error connecting to server. Please try again later.</p>
        ) : (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Excercise Name</th>
                <th>Excercise Description</th>
              </tr>
            </thead>
            <tbody>
              { mapList() }
            </tbody>
          </table>
        )
      }
    </div>
  )
};
