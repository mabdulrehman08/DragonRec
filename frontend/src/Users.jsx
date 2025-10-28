import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} – {u.email}</li>
        ))}
      </ul>
    </div>
  );
}