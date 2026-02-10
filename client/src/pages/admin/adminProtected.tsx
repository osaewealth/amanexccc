import { Redirect } from "wouter";

export default function AdminProtectedRoute({ children }: any) {
  const token = localStorage.getItem("admin_access_token");

  if (!token) {
    return <Redirect to="/admin/login" />;
  }

  return children;
}
