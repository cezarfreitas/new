"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      // Inserir diretamente no Supabase
      const { data, error } = await supabase
        .from("leads")
        .upsert({
          email,
          name: name || null,
          source: "newsletter",
          updated_at: new Date().toISOString(),
        })
        .select()

      if (error) {
        console.error("Supabase error:", error)
        setMessage("❌ Erro ao cadastrar email")
      } else {
        setMessage("✅ Email cadastrado com sucesso!")
        setEmail("")
        setName("")
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage("❌ Erro ao cadastrar email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">📧 Newsletter</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Seu nome (opcional)" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          type="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  )
}
