import { useState, type FormEvent } from "react"
import { Upload } from "lucide-react"
import type { Product, ProductFormData } from "@/types"
import { PRODUCT_CATEGORIES } from "@/lib/constants"
import styles from "./add-product-form.module.css"

interface AddProductFormProps {
  initialData?: Product
  isEditing?: boolean
  onSubmit: (data: ProductFormData) => void
  onCancel?: () => void
}

export default function AddProductForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancel,
}: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    category: initialData?.category || PRODUCT_CATEGORIES[0],
    description: initialData?.description || "",
    inStock: initialData?.inStock ?? true,
    imageUrl: initialData?.imageUrl || "",
  })

  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      if (onCancel) onCancel()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imageUpload}>
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.uploadPlaceholder}>
            <Upload className={styles.uploadIcon} />
            <span>Click to upload image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
          required
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData((prev) => ({ ...prev, inStock: e.target.checked }))}
          />
          In Stock
        </label>
      </div>

      <div className={styles.buttons}>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
        </button>
      </div>
    </form>
  )
} 