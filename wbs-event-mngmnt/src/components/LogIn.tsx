import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const usernames: string[] = ["Ada", "Bob", "Carla", "Dave", "Eleanor", "Fred"];

export default function LogIn() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("Ada");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Log In</h1>
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Username</span>
          <select
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
          >
            {usernames.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
