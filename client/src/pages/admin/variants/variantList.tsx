import { useEffect, useState } from "react";
import { Link } from "wouter";
import { VariantService } from "@/services/variantService";

export default function VariantList() {
  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
    VariantService.getAll()
      .then(res => setVariants(res.data));
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Variants</h1>

        <Link href="/admin/variants/new">
          <button className="bg-coty-navy text-white px-4 py-2 rounded">
            Add Variant
          </button>
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th>ID</th>
            <th className="p-4">Name</th>
          </tr>
        </thead>

        <tbody>
          {variants.map(v => (
            <tr key={v.id} className="border-b">
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td className="space-x-4">
                <Link href={`/admin/variants/${v.id}/edit`}>
                  <span className="text-blue-600 cursor-pointer">Edit</span>
                </Link>

                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    if (confirm("Delete variant?")) {
                      VariantService.delete(v.id)
                        .then(() => setVariants(prev =>
                          prev.filter(c => c.id !== v.id)
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
