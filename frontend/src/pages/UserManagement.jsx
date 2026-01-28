import React from "react";
import { useAuth } from "../../context/AuthContext";
import { ProtectedRoute } from "../../components/ProtectedRoute";

function UserDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl">Email: {user.email}</p>
          <p className="text-lg text-gray-600">Role: {user.role}</p>
        </div>
        {/* Add workout tracking, BMI, progress charts etc. here */}
      </div>
    </ProtectedRoute>
  );
}

export default UserDashboard;