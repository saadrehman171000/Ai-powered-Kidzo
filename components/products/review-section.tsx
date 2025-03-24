"use client"

import type React from "react"

import { useState } from "react"
import type { Review } from "@/types"
import styles from "./review-section.module.css"

interface ReviewSectionProps {
  productId: string
  reviews: Review[]
}

export default function ReviewSection({ productId, reviews }: ReviewSectionProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to submit the review
    console.log("Review submitted:", { productId, rating, comment })
    // Reset form
    setRating(5)
    setComment("")
  }

  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.sectionTitle}>Customer Reviews</h2>

      {reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>{review.userName}</span>
                  <span className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className={styles.reviewRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? styles.starFilled : styles.star}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noReviews}>No reviews yet. Be the first to review this product!</p>
      )}

      <div className={styles.addReview}>
        <h3 className={styles.addReviewTitle}>Write a Review</h3>

        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.ratingInput}>
            <span className={styles.ratingLabel}>Your Rating:</span>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`${styles.star} ${i < (hoveredStar || rating) ? styles.active : ""}`}
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoveredStar(i + 1)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.commentInput}>
            <label htmlFor="review-comment" className={styles.commentLabel}>
              Your Review:
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className={styles.commentTextarea}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}

