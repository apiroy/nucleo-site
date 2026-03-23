"use client";

import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./agendar.module.css";

const DAYS = ["Lun 23", "Mar 24", "Mie 25", "Jue 26", "Vie 27"];
const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function AgendarPage() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const isUnavailable = (day: string, time: string) => {
    // Random mock unavailability
    if (day === "Lun 23" && (time === "09:00" || time === "10:00")) return true;
    if (day === "Mie 25") return true; // Full day taken
    if (time === "16:00") return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return alert("Por favor selecciona fecha y hora");
    
    setLoading(true);
    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        body: JSON.stringify({ ...formData, date: selectedDay, time: selectedTime }),
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
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.successState}>
            <span className="material-symbols-outlined" style={{fontSize: '5rem', color: 'var(--tertiary)'}}>event_available</span>
            <h1 style={{marginTop: '2rem'}}>¡Cita Agendada!</h1>
            <p style={{marginTop: '1rem', fontSize: '1.2rem'}}>
              Te esperamos el <strong>{selectedDay}</strong> a las <strong>{selectedTime}hs</strong>. <br />
              Hemos enviado un correo a {formData.email} con el link de la reunión.
            </p>
            <button onClick={() => window.location.href = "/"} className="button-primary" style={{marginTop: '3rem'}}>
              Volver al Inicio
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgMesh}><div className={styles.bgBlob}></div></div>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Reserva una Consultoría.</h1>
          <p>Selecciona un espacio disponible para hablar sobre tu visión.</p>
        </div>

        <div className={styles.calendarContainer}>
          <div className={styles.calendar}>
            <h3>1. Elige el día (Marzo)</h3>
            <div className={styles.daysGrid}>
              {DAYS.map(day => (
                <div 
                  key={day}
                  className={`${styles.day} ${day === "Mie 25" ? styles.unavailable : ""} ${selectedDay === day ? styles.selected : ""}`}
                  onClick={() => day !== "Mie 25" && setSelectedDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>

            {selectedDay && (
              <div style={{marginTop: '2rem'}}>
                <h3>2. Horarios disponibles</h3>
                <div className={styles.timeSlots}>
                  {TIMES.map(time => (
                    <div 
                      key={time}
                      className={`${styles.slot} ${isUnavailable(selectedDay, time) ? styles.unavailable : ""} ${selectedTime === time ? styles.selected : ""}`}
                      onClick={() => !isUnavailable(selectedDay, time) && setSelectedTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.bookingDetails}>
            <h3>3. Tus datos</h3>
            <form className={styles.bookingForm} onSubmit={handleSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8rem', opacity: 0.7}}>TU NOMBRE</label>
                <input 
                  type="text" 
                  required 
                  style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#fff'}}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8rem', opacity: 0.7}}>TU EMAIL</label>
                <input 
                  type="email" 
                  required 
                  style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', color: '#fff'}}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div style={{marginTop: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)'}}>
                <p style={{fontSize: '0.9rem', color: 'var(--on-surface-variant)'}}>
                  Confirmando cita para: <br />
                  <span style={{color: '#fff', fontWeight: 700}}>{selectedDay || "Selecciona un día"} {selectedTime ? `a las ${selectedTime}hs` : ""}</span>
                </p>
              </div>
              <button type="submit" className="button-primary" disabled={loading}>
                {loading ? "Reservando..." : "Confirmar Cita"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
