import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Error!");
        }
        const data = await response.json();
        setUsers(data.slice(0, 5));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();}, []);

  if (loading) {
    return <p>Loading users...</p>;
  }
  if (error) {
    return <p>Failed to fetch users.</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;