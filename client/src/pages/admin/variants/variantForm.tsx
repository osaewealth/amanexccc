import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { VariantService } from "@/services/variantService";

export default function VariantForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        VariantService.getOne(id)
        .then(res => {
          setName(res.data.name);
        })
        .catch(() => {
            setError("Failed to load variant");
          })
          .finally(() => setLoading(false));;
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);

    if (id) {
      await VariantService.update(id, formData);
    } else {
      await VariantService.create({
        name: name
      });
    }

    navigate("/admin/variants");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit Variant" : "New Variant"}
      </h1>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Variant name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-coty-navy text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
