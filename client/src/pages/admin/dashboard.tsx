import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <p className="text-gray-600 mb-8">
        Welcome to the Amanex Admin Panel. Use the cards below to manage content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/admin/categories">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold text-lg">Categories</h2>
            <p className="text-sm text-gray-500">
              Manage product categories
            </p>
          </div>
        </Link>

        <Link href="/admin/products">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold text-lg">Products</h2>
            <p className="text-sm text-gray-500">
              Manage products & variants
            </p>
          </div>
        </Link>

        <Link href="/admin/jobs">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold text-lg">Job Roles</h2>
            <p className="text-sm text-gray-500">
              Manage careers page
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
