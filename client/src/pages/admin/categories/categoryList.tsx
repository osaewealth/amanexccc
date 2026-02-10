import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CategoryService } from "@/services/categoryService";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CategoryService.getAll()
      .then(res => setCategories(res.data))
      .catch(() => {
        setError("Failed to load categories");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <Link href="/admin/categories/new">
          <button className="bg-coty-navy text-white px-4 py-2 rounded">
            Add Category
          </button>
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th>Image</th>
            <th className="p-4">Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} className="border-b">
              <td className="p-4">
                {cat.image && (
                  <img
                    src={cat.image}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </td>
              <td>{cat.name}</td>
              <td>{cat.is_active ? "Active" : "Hidden"}</td>
              <td className="space-x-4">
                <Link href={`/admin/categories/${cat.id}/edit`}>
                  <span className="text-blue-600 cursor-pointer">Edit</span>
                </Link>

                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    if (confirm("Delete category?")) {
                      CategoryService.delete(cat.id)
                        .then(() => setCategories(prev =>
                          prev.filter(c => c.id !== cat.id)
                        ));
                    }
                  }}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
