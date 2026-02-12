import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ProductService } from "@/services/productService";
import { CategoryService } from "@/services/categoryService";
import { VariantService } from "@/services/variantService";
import api from "@/services/api";

// Interface for type safety
interface ProductVariantState {
  id?: string; // ID is optional (new variants won't have one)
  variantTypeId: string;
  variantValue: string;
  image: File | null;
  preview: string | null;
}

export default function ProductForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  // Product Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [rating, setRating] = useState("");
  
  // Image Fields
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Data Sources
  const [categories, setCategories] = useState<any[]>([]);
  const [variantTypes, setVariantTypes] = useState<any[]>([]);

  // Variant State
  const [productVariants, setProductVariants] = useState<ProductVariantState[]>([]);
  const [variantsToDelete, setVariantsToDelete] = useState<string[]>([]); // Track IDs to delete
  
  // UI State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingVariants, setSavingVariants] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 1. Load Dropdown Data
        const [catRes, varRes] = await Promise.all([
          CategoryService.getAll(),
          VariantService.getAll()
        ]);
        setCategories(catRes.data);
        setVariantTypes(varRes.data);

        // 2. Load Product Data (if Editing)
        if (id) {
          const res = await ProductService.getOne(id);
          const p = res.data;

          setName(p.name);
          setDescription(p.description);
          setSize(p.size);
          setCategory(String(p.category.id));
          setProductType(p.product_type);
          setIsActive(p.is_active);
          setIsBestSeller(p.is_best_seller);
          setRating(p.rating ?? "");
          setPreview(p.image);

          // Map existing variants
          // NOTE: Ensure your backend Serializer returns 'variant_type_id'
          const loadedVariants = p.variants.map((pv: any) => ({
            id: String(pv.id), // Store ID to know it exists in DB
            variantTypeId: String(pv.variant_type_id || pv.variant_type?.id || ""), 
            variantValue: pv.name,
            image: null,
            preview: pv.image || null,
          }));
          setProductVariants(loadedVariants);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-500">Loading form...</div>;

  // --- Variant Handlers ---

  const addProductVariant = () => {
    setProductVariants((prev) => [
      ...prev,
      {
        variantTypeId: "",
        variantValue: "",
        image: null,
        preview: null,
      },
    ]);
  };

  const removeProductVariant = (index: number) => {
    setProductVariants((prev) => {
      const variantToRemove = prev[index];

      // If the variant has an ID, it means it's in the database.
      // We must mark it for deletion on save.
      if (variantToRemove.id) {
        setVariantsToDelete((deletedIds) => [...deletedIds, variantToRemove.id!]);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const updateProductVariant = (index: number, field: keyof ProductVariantState, value: any) => {
    setProductVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleVariantImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateProductVariant(index, "image", file);
    updateProductVariant(index, "preview", URL.createObjectURL(file));
  };

  // --- Submit Handler ---

  const handleSubmit = async () => {
    try {
      setError("");
      setSavingProduct(true);
      const formData = new FormData();

      // 1. Append Product Fields
      formData.append("name", name);
      formData.append("description", description);
      formData.append("size", size);
      formData.append("category_id", category);
      formData.append("product_type", productType);
      formData.append("is_active", String(isActive));
      formData.append("is_best_seller", String(isBestSeller));
      if (rating) formData.append("rating", rating);
      if (image) formData.append("image", image);

      // 2. Create or Update Product
      const res = id
        ? await ProductService.update(id, formData)
        : await ProductService.create(formData);

      const productId = id ?? res.data.id;

      // 3. Handle Variants (Delete, Create, Update)
      setSavingProduct(false);
      setSavingVariants(true);
      
      await Promise.all([
        // A. Delete removed variants
        ...variantsToDelete.map((variantId) =>
          api.delete(`/product-variants/${variantId}/delete/`)
        ),

        // B. Process current variants
        ...productVariants.map(async (pv) => {
          if (!pv.variantTypeId) return;

          const variantFormData = new FormData();
          variantFormData.append("product_id", String(productId));
          variantFormData.append("variant_type_id", pv.variantTypeId);

          if (pv.image) {
            variantFormData.append("image", pv.image);
          }

          if (pv.id) {
            // Update existing variant (PUT)
            return api.put(`/product-variants/${pv.id}/update/`, variantFormData);
          } else {
            // Create new variant (POST)
            return api.post("/product-variants/create/", variantFormData);
          }
        }),
      ]);

      // 4. Redirect
      setSavingVariants(false);
      navigate("/admin/products");
    } catch (err: any) {
      console.error(err);
      setSavingProduct(false);
      setSavingVariants(false);
      setError(err.response?.data?.detail || "Failed to save product");
    }
  };

  return (
    <>
      <div>
        <nav className="my-8 text-sm text-gray-500">
          <Link
            to="/admin/products"
            className="transition-colors hover:underline hover:text-gray-700"
          >
            ← Back to All Products
          </Link>
        </nav>
      </div>

      <div className="max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">{id ? "Edit Product" : "New Product"}</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* --- Main Product Fields --- */}
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={savingProduct || savingVariants}
          />

          <textarea
            className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={savingProduct || savingVariants}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Size (e.g. 250ml)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              disabled={savingProduct || savingVariants}
            />
            <input
              className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Product type (e.g. Hand Wash)"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              disabled={savingProduct || savingVariants}
            />
          </div>

          <select
            className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={savingProduct || savingVariants}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* --- Product Image --- */}
          <div className="border p-4 rounded bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
            <label className="block text-sm font-medium mb-2">Product Image</label>
            {preview && (
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded mb-4 border"
                alt="Product Preview"
              />
            )}
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              disabled={savingProduct || savingVariants}
            />
          </div>
        </div>

        {/* --- Variants Section --- */}
        <div className="my-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Product Variants</h3>
            <button
              type="button"
              onClick={addProductVariant}
              className="px-3 py-1 bg-coty-navy text-white rounded text-sm hover:opacity-90"
            >
              + Add Variant
            </button>
          </div>

          {productVariants.length === 0 && (
            <p className="text-gray-500 text-sm italic">
              No variants added yet.
            </p>
          )}

          {productVariants.map((pv, index) => (
            <div key={index} className="mb-6 p-4 border rounded bg-gray-50 relative">
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-gray-700 bg-gray-200 px-2 py-0.5 rounded text-xs">
                  {pv.id ? `ID: ${pv.id}` : "New"}
                </span>
                <button
                  type="button"
                  onClick={() => removeProductVariant(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                  disabled={savingProduct || savingVariants}
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variant Type */}
                <div>
                  <label className="block text-sm mb-1 font-medium">Variant Type</label>
                  <select
                    className="w-full border p-2 rounded bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    value={pv.variantTypeId}
                    onChange={(e) => updateProductVariant(index, "variantTypeId", e.target.value)}
                    disabled={savingProduct || savingVariants}
                  >
                    <option value="">Select Type</option>
                    {variantTypes.map((vt) => (
                      <option key={vt.id} value={vt.id}>
                        {vt.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Variant Value */}
                <div>
                  <label className="block text-sm mb-1 font-medium">Current Variant Value (Name)</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="e.g. Strawberry, Lemon"
                    value={pv.variantValue}
                    onChange={(e) => updateProductVariant(index, "variantValue", e.target.value)}
                    disabled={true}
                    // Note: This field is visual only unless you update backend to accept 'name' override
                  />
                </div>
              </div>

              {/* Variant Image */}
              <div className="mt-4">
                <label className="block text-sm mb-1 font-medium">Variant Image</label>
                <div className="flex items-center gap-4">
                  {pv.preview && (
                    <img
                      src={pv.preview}
                      className="w-16 h-16 object-cover rounded border"
                      alt="Variant preview"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onChange={(e) => handleVariantImageChange(index, e)}
                    disabled={savingProduct || savingVariants}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Footer Options --- */}
        <div className="border-t pt-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4"
              disabled={savingProduct || savingVariants}
            />
            <span>Is Active</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="w-4 h-4"
              disabled={savingProduct || savingVariants}
            />
            <span>Best Seller</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              className="w-24 border p-2 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={rating}
              onChange={(e) => {
                 let v = parseFloat(e.target.value);
                 if (v > 5) v = 5;
                 if (v < 1) v = 1;
                 setRating(String(v));
              }}
              disabled={savingProduct || savingVariants}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={savingProduct || savingVariants}
          className="mt-6 w-full bg-coty-navy text-white px-4 py-3 rounded font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {savingProduct ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving Product...
            </>
          ) : savingVariants ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving Variants...
            </>
          ) : (
            id ? "Save Changes" : "Create Product"
          )}
        </button>
      </div>
    </>
  );
}