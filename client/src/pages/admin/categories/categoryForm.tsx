import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CategoryService } from "@/services/categoryService";

export default function CategoryForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      CategoryService.getOne(id)
        .then(res => {
          setName(res.data.name);
          setIsActive(res.data.is_active);
          setPreview(res.data.image);
        })
        .catch(() => {
          setError("Failed to load categories");
        })
        .finally(() => setLoading(false));;
    }
  }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
//         Loading...
//       </div>
//     );
//   }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("is_active", String(isActive));
    if (image) formData.append("image", image);

    if (id) {
      await CategoryService.update(id, formData);
    } else {
      await CategoryService.create(formData);
    }

    navigate("/admin/categories");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit Category" : "New Category"}
      </h1>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          className="w-32 h-32 object-cover rounded mb-4"
        />
      )}

      <input
        type="file"
        className="mb-4"
        onChange={e => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={isActive}
          onChange={e => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <button
        onClick={handleSubmit}
        className="bg-coty-navy text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
