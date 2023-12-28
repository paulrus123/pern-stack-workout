import React from 'react'
import User from '../components/User';

export default function UsersList({users}) {

  function mapList() {
      return users.map(currentUser => {
          return <User user={currentUser} key={currentUser.user_id} />;
      })
  }

  return (
    <div>
      <h3>Users Table</h3>
      { !users ? 
        (
          <p>Error connecting to server. Please try again later.</p>
        ) : (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>User</th>
                <th>Email</th>
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
}
;
