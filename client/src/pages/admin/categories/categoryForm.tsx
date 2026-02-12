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
  const [saving, setSaving] = useState(false);

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


  const handleSubmit = async () => {
    try {
      setSaving(true);
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
    } catch (err) {
      console.error(err);
      setError("Failed to save category");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit Category" : "New Category"}
      </h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full border p-2 mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Category name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={saving}
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
        className="mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        onChange={e => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }}
        disabled={saving}
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={isActive}
          onChange={e => setIsActive(e.target.checked)}
          disabled={saving}
        />
        Active
      </label>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="bg-coty-navy text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {saving ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
}
