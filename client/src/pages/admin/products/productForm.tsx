import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ProductService } from "@/services/productService";
import { CategoryService } from "@/services/categoryService";
import {VariantService} from "@/services/variantService";

export default function ProductForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [productType, setProductType] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [rating, setRating] = useState("");

  const [variants, setVariants] = useState<any[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [newVariantName, setNewVariantName] = useState("");
  const [creatingVariant, setCreatingVariant] = useState(false);
  const [error, setError] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingVariants, setLoadingVariants] = useState(true);



  useEffect(() => {
    CategoryService.getAll().then(res => setCategories(res.data))
    .catch(() => {
      setError("Failed to load categories");
    })
    .finally(() => setLoadingCategories(false));

    VariantService.getAll().then(res => setVariants(res.data))
    .catch(() => {
      setError("Failed to load variants");
    })
    .finally(() => setLoadingVariants(false));;
  
    if (id) {
      ProductService.getOne(id).then(res => {
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
        setSelectedVariants(p.variants.map((v: any) => String(v.id)));
      })
      .catch(() => {
        setError("Failed to load product");
      })
      .finally(() => setLoadingProduct(false));
    }
  }, [id]);

//   if (loadingCategories || loadingProduct || loadingVariants) {
//     return (
//       <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
//         Loading...
//       </div>
//     );
//   }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }


  const createVariantInline = async () => {
    if (!newVariantName.trim()) return;
  
    try {
      setCreatingVariant(true);
  
      const res = await VariantService.create({
        name: newVariantName
      });
  
      const newVariant = res.data;
  
      // Add to list
      setVariants(prev => [...prev, newVariant]);
  
      // Auto-select it
      setSelectedVariants(prev => [...prev, String(newVariant.id)]);
  
      setNewVariantName("");
    } finally {
      setCreatingVariant(false);
    }
  };  
  

  const handleSubmit = async () => {
    const formData = new FormData();
  
    formData.append("name", name);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("category_id", category); 
    formData.append("product_type", productType);
    formData.append("is_active", String(isActive));
    formData.append("is_best_seller", String(isBestSeller));
    if (rating !== "") {
      formData.append("rating", rating);
    }      


    selectedVariants.forEach(id =>
      formData.append("variant_ids", id)
    );
  
    if (image) formData.append("image", image);
  
    if (id) {
      await ProductService.update(id, formData);
    } else {
      await ProductService.create(formData);
    }
  
    navigate("/admin/products");
  };
  
  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {id ? "Edit Product" : "New Product"}
      </h1>

      {/* Name */}
      <input
        className="w-full border p-2 mb-4"
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Description"
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Size */}
      <input
        className="w-full border p-2 mb-4"
        placeholder="Size (e.g. 250ml)"
        value={size}
        onChange={e => setSize(e.target.value)}
      />

      {/* Category */}
      <select
        className="w-full border p-2 mb-4"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Product Type */}
      <input
        className="w-full border p-2 mb-4"
        placeholder="Product type (e.g. Hand Wash)"
        value={productType}
        onChange={e => setProductType(e.target.value)}
      />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          className="w-32 h-32 object-cover rounded mb-4"
        />
      )}

      {/* Image Upload */}
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

      <div className="mb-4">
        <label className="font-semibold block mb-2">Variants</label>

        {/* Existing variants */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {variants.map(v => (
            <label key={v.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedVariants.includes(String(v.id))}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedVariants(prev => [...prev, String(v.id)]);
                  } else {
                    setSelectedVariants(prev =>
                      prev.filter(id => id !== String(v.id))
                    );
                  }
                }}
              />
              {v.name}
            </label>
          ))}
        </div>

        {/* Inline create */}
        <div className="flex gap-2">
           <input
              className="border p-2 flex-1"
              placeholder="Add new variant (e.g. Large)"
              value={newVariantName}
              onChange={e => setNewVariantName(e.target.value)}
            />
            <button
              type="button"
              disabled={creatingVariant}
              onClick={createVariantInline}
              className="px-4 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

      {/* Active */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={isActive}
          onChange={e => setIsActive(e.target.checked)}
        />
        Active
      </label>

      {/* Best Seller */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={isBestSeller}
          onChange={e => setIsBestSeller(e.target.checked)}
        />
        Best Seller
      </label>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          className="w-full border p-2 mb-4"
          placeholder="Rating (1 - 5)"
          value={rating}
          onChange={e => {
            let value = e.target.value;
            if (Number(value) > 5) value = "5";
            if (Number(value) < 1) value = "1";
            setRating(value);
          }}          
        />
        Rating
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
