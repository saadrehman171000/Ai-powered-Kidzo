"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./banner.module.css"

interface Slide {
  id: number
  title: string
  description: string
  imageUrl: string
  link: string
}

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      title: "Summer Collection 2025",
      description: "Discover our new range of lightweight and breathable baby clothes perfect for summer.",
      imageUrl: "/ban-2.webp",
      link: "/products?category=clothing",
    },
    {
      id: 2,
      title: "Organic Baby Toiletries",
      description: "Gentle, natural, and safe products for your baby's delicate skin.",
      imageUrl: "/ban-3.webp",
      link: "/products?category=toiletries",
    },
    {
      id: 3,
      title: "Premium Feeding Accessories",
      description: "Make feeding time easier with our range of high-quality accessories.",
      imageUrl: "/ban-1.webp",
      link: "/products?category=feeding",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className={styles.banner}>
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div key={slide.id} className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}>
            <div className={styles.imageContainer}>
              <Image
                src={slide.imageUrl || "/placeholder.svg"}
                alt={slide.title}
                fill
                priority
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>
              <Link href={slide.link} className={styles.button}>
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className={`${styles.navButton} ${styles.next}`} onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  )
}

