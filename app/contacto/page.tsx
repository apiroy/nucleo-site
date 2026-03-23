"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./contacto.module.css";

function ContactForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: searchParams.get("plan") || "General",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });
      
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successState}>
        <span className={`material-symbols-outlined ${styles.successIcon}`}>check_circle</span>
        <h2>¡Mensaje Enviado!</h2>
        <p style={{marginTop: '1rem'}}>Gracias por tu interés, {formData.name.split(' ')[0]}. Te contactaremos a la brevedad.</p>
        <button onClick={() => window.location.href = "/"} className="button-primary" style={{marginTop: '2rem'}}>
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Nombre Completo</label>
        <input 
          type="text" 
          required 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input 
          type="email" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>WhatsApp</label>
        <input 
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Interés</label>
        <select 
          value={formData.plan}
          onChange={(e) => setFormData({...formData, plan: e.target.value})}
        >
          <option value="General">Consulta General</option>
          <option value="Basico">Plan Básico ($290)</option>
          <option value="Robusto">Plan Robusto ($590)</option>
          <option value="Full">Plan Full ($999)</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Mensaje</label>
        <textarea 
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Cuéntanos un poco sobre tu negocio..."
        />
      </div>
      <button type="submit" className="button-primary" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Solicitud"}
      </button>
    </form>
  );
}

export default function ContactoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.bgMesh}><div className={styles.bgBlob}></div></div>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Hablemos de tu proyecto.</h1>
          <p>Completa el formulario y nos pondremos en contacto contigo.</p>
        </div>
        <div className={styles.formCard}>
          <Suspense fallback={<div>Cargando...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
