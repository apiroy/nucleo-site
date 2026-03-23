"use client";

import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./course.module.css";

export default function CoursePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/curso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.bgMesh}>
        <div className={styles.bgBlob}></div>
        <div className={styles.bgBlob2}></div>
        <div className={styles.bgBlob3}></div>
      </div>

      <Header activePage="curso" />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>
            Empieza tu camino en la <br />
            <span style={{color: 'var(--primary)'}}>Programación Sin Código.</span>
          </h1>
          <p>
            Descarga nuestra guía exclusiva "Introducción a la programación sin código vol.1" 
            y aprende cómo crear soluciones digitales robustas sin tocar una sola línea de código.
          </p>
        </section>

        <div className={styles.formContainer}>
          {!submitted ? (
            <>
              <h3 style={{marginBottom: '1.5rem', textAlign: 'center'}}>Completa tus datos para descargar</h3>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Ej. Juan Perez"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Profesional</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="juan@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">WhatsApp (Opcional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+54 9..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="button-primary" 
                  style={{marginTop: '1rem'}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : 'Obtener Guía Gratuita'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successState}>
              <span className={`material-symbols-outlined ${styles.successIcon}`}>
                check_circle
              </span>
              <h2>¡Gracias, {formData.name.split(' ')[0]}!</h2>
              <p style={{marginTop: '1rem'}}>Tu guía ya está lista para descargar.</p>
              
              <a 
                href="/curso-sin-codigo.pdf" 
                download="Guia_Programacion_Sin_Codigo_NucleoAI.pdf"
                className={styles.downloadBtn}
              >
                <span className="material-symbols-outlined">download</span>
                Descargar Guía PDF
              </a>
              
              <p style={{marginTop: '2rem', fontSize: '0.85rem', opacity: 0.7}}>
                ¿Problemas con la descarga? <br />
                Contáctanos y te la enviamos por WhatsApp.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
