import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ProductService } from "@/services/productService";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getAll().then(res => setProducts(res.data))
    .catch(() => {
      setError("Failed to load categories");
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
        Loading products...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link href="/admin/products/new">
          <button className="bg-coty-navy text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Product Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b">
              <td className="p-4">
                {p.image && (
                  <img
                    src={p.image}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>{p.product_type}</td>
              <td>{p.is_active ? "Active" : "Hidden"}</td>
              <td className="space-x-4">
                <Link href={`/admin/products/${p.id}/edit`}>
                  <span className="text-blue-600 cursor-pointer">Edit</span>
                </Link>

                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    if (confirm("Delete product?")) {
                      ProductService.delete(p.id).then(() =>
                        setProducts(prev =>
                          prev.filter(x => x.id !== p.id)
                        )
                      );
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
