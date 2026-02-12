import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { VariantService } from "@/services/variantService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VariantForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
        VariantService.getOne(id)
        .then(res => {
          setName(res.data.name);
          // if (res.data.image) {
          //   setPreviewImage(res.data.image);
          // }
        })
        .catch(() => {
            setError("Failed to load variant");
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
      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await VariantService.update(id, formData);
      } else {
        await VariantService.create(formData);
      }

      navigate("/admin/variants");
    } catch (err) {
      console.error(err);
      setError("Failed to save variant");
      setSaving(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="my-8 text-sm text-gray-500">
        <Link
          to="/admin/variants"
          className="transition-colors hover:underline hover:text-gray-700"
        >
          ← Back to All Variants
        </Link>
      </nav>

      <div className="max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">
          {id ? "Edit Variant" : "New Variant"}
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Variant name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={saving}
          />
        </div>

        {/* <div className="mb-4">
          <Label htmlFor="image">Image (optional)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setImage(file);
                
                // Create preview
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {previewImage && (
          <div className="mb-4">
            <Label>Current Image Preview</Label>
            <div className="mt-2">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-32 h-32 object-contain border rounded"
              />
            </div>
          </div>
        )} */}

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
    </>
  );
}
