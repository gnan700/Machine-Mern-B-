import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/agents/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure tasks is always an array
        const agentsWithTasks = response.data.map(agent => ({
          ...agent,
          tasks: agent.tasks || [],
        }));

        setAgents(agentsWithTasks);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading agents...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Add Agent Button */}
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => navigate("/add-agent")}
      >
        Add Agent
      </button>

      {/* Agents Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Tasks</th>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map(agent => (
              <tr key={agent._id} className="text-center">
                <td className="border p-2">{agent.name}</td>
                <td className="border p-2">{agent.email}</td>
                <td className="border p-2">{agent.mobile}</td>
                <td className="border p-2">
                  {agent.tasks.length > 0 ? (
                    <ul className="text-left list-disc pl-5">
                      {agent.tasks.map((task, index) => (
                        <li key={index}>
                          {task.firstName || "-"} - {task.phone || "-"} - {task.notes || "-"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No tasks assigned"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
