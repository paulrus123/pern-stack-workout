import React from "react";

const User = props => (
    <tr>
        <td>{props.user.user_name}</td>
        <td>{props.user.email}</td>
    </tr>
);

export default User;