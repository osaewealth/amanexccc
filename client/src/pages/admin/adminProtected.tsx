import { Redirect } from "wouter";

export default function AdminProtectedRoute({ children }: any) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Redirect to="/admin/login" />;
  }

  return children;
}
