"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import styles from "./chatbot.module.css"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Stocklytic's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(
      () => {
        const botResponse = generateBotResponse(input)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello there! How can I assist you with your baby product needs today?"
    }

    if (input.includes("product") || input.includes("recommend")) {
      return "I'd be happy to recommend some products! Could you tell me what type of baby products you're looking for? We have toiletries, feeding accessories, carriers, and more."
    }

    if (input.includes("order") && (input.includes("track") || input.includes("status"))) {
      return "You can track your order in the Orders section. If you're logged in, you'll see all your past and current orders with their status. Is there a specific order you're concerned about?"
    }

    if (input.includes("return") || input.includes("refund")) {
      return "Our return policy allows returns within 30 days of delivery. You can initiate a return from your order details page. Would you like me to guide you through the process?"
    }

    if (input.includes("shipping") || input.includes("delivery")) {
      return "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. Would you like to know more about our shipping options?"
    }

    if (input.includes("payment") || input.includes("pay")) {
      return "We accept all major credit cards, PayPal, and offer Cash on Delivery in select areas. All payments are securely processed. Do you have any specific questions about payment methods?"
    }

    if (input.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with today?"
    }

    return "I'm not sure I understand. Could you please rephrase your question? I'm here to help with product recommendations, order tracking, returns, shipping, and any other questions about our baby products."
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h1>Stocklytic AI Assistant</h1>
          <p>Ask me anything about our products, orders, or baby care!</p>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
            >
              <div className={styles.messageContent}>{message.content}</div>
              <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputContainer} onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton} disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>

      <div className={styles.suggestionsContainer}>
        <h2>Suggested Questions</h2>
        <div className={styles.suggestions}>
          <button
            className={styles.suggestionButton}
            onClick={() => {
              setInput("What are your best-selling baby products?")
              setTimeout(() => {
                const form = document.querySelector("form")
                form?.dispatchEvent(new Event("submit", { cancelable: true }))
              }, 100)
            }}
          >
            What are your best-selling baby products?
          </button>
          <button
            className={styles.suggestionButton}
            onClick={() => {
              setInput("How do I track my order?")
              setTimeout(() => {
                const form = document.querySelector("form")
                form?.dispatchEvent(new Event("submit", { cancelable: true }))
              }, 100)
            }}
          >
            How do I track my order?
          </button>
          <button
            className={styles.suggestionButton}
            onClick={() => {
              setInput("What's your return policy?")
              setTimeout(() => {
                const form = document.querySelector("form")
                form?.dispatchEvent(new Event("submit", { cancelable: true }))
              }, 100)
            }}
          >
            What's your return policy?
          </button>
          <button
            className={styles.suggestionButton}
            onClick={() => {
              setInput("Do you offer free shipping?")
              setTimeout(() => {
                const form = document.querySelector("form")
                form?.dispatchEvent(new Event("submit", { cancelable: true }))
              }, 100)
            }}
          >
            Do you offer free shipping?
          </button>
        </div>
      </div>
    </div>
  )
}

