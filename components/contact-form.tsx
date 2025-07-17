"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      // Inserir diretamente no Supabase
      const { data, error } = await supabase
        .from("contacts")
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contato via site",
          message: formData.message,
          status: "new",
        })
        .select()

      if (error) {
        console.error("Supabase error:", error)
        setMessage("❌ Erro ao enviar mensagem")
      } else {
        setMessage("✅ Mensagem enviada com sucesso!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage("❌ Erro ao enviar mensagem")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4">💬 Entre em Contato</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Assunto (opcional)"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
        <Textarea
          placeholder="Sua mensagem"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  )
}
