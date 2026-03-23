"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "./page.module.css";

const MOCKUPS = [
  { src: "/dashboard-mockup.png", label: "Dashboard General" },
  { src: "/mockup-products.png", label: "Catálogo de Productos" },
  { src: "/mockup-shipments.png", label: "Logística y Envíos" }
];

export default function Home() {
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % MOCKUPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className="bg-mesh">
        <div className="bg-blob"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              Arquitectura Digital para Emprendedores
            </div>
            <h1>
              Tu propia plataforma a medida, <br />
              <span className={styles.highlight}>sin comisiones mensuales.</span>
            </h1>
            <p className={styles.subheadline}>
              Desarrollamos tu ecommerce robusto y fácil de usar, potenciado por IA. 
              Pensado para emprendedores que buscan independencia y control total.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/#planes" className="button-primary" style={{textDecoration: 'none'}}>Ver Planes y Precios</Link>
              <Link href="/agendar" className={styles.buttonSecondary} style={{textDecoration: 'none'}}>Agendar Consultoría</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
             <div className={styles.floatingContainer}>
                <video 
                   src="/nucleo.mp4" 
                   autoPlay 
                   muted 
                   loop 
                   playsInline 
                   className={styles.heroVideo}
                />
             </div>
             <div className={styles.imageOverlay}></div>
          </div>
        </section>

        {/* Dashboard Showcase Section */}
        <section id="demo" className={styles.showcaseSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Módulos en Acción</span>
            <h2 className={styles.vibrantText}>Maneja tu negocio sin manuales.</h2>
            <p>Diseñado para que cualquier emprendedor pueda dominar su plataforma en minutos.</p>
          </div>

          <div className={styles.showcaseContent}>
            <div className={styles.dashboardCarousel}>
                 {MOCKUPS.map((m, i) => (
                    <div 
                      key={m.src} 
                      className={`${styles.carouselFrame} ${activeFrame === i ? styles.active : ''}`}
                    >
                        <Image 
                            src={m.src} 
                            alt={m.label} 
                            width={1000} 
                            height={600} 
                            className={styles.mockupImg}
                        />
                    </div>
                 ))}
                 
                 {/* Video Player UI Overlay */}
                 <div className={styles.videoControls}>
                    <span className="material-symbols-outlined" style={{color: '#fff', fontSize: '20px'}}>pause</span>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${((activeFrame + 1) / MOCKUPS.length) * 100}%` }}></div>
                    </div>
                    <span style={{color: '#fff', fontSize: '12px', minWidth: '80px', textAlign: 'right'}}>
                        0{activeFrame + 1} / 0{MOCKUPS.length}
                    </span>
                 </div>
                 <div className={styles.mockupGlow}></div>
                 <div className={styles.recBadge}>● REC {MOCKUPS[activeFrame].label}</div>
            </div>

            <div className={styles.moduleGrid}>
                <div className={`${styles.moduleItem} ${activeFrame === 1 ? styles.moduleHighlight : ''}`}>
                    <div className={styles.moduleIcon}>
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <div>
                        <h4>Gestión Simplificada</h4>
                        <p>Sube productos, ajusta precios y controla el stock con un par de clics.</p>
                    </div>
                </div>
                <div className={`${styles.moduleItem} ${activeFrame === 0 ? styles.moduleHighlight : ''}`}>
                    <div className={styles.moduleIcon}>
                        <span className="material-symbols-outlined">forum</span>
                    </div>
                    <div className={styles.chatModule}>
                        <h4>IA Entrenada</h4>
                        <p>Tu asistente virtual responde dudas de clientes basándose en tus propios productos.</p>
                        <div className={styles.miniChat}>
                             <div className={styles.chatBubble}>
                                <span className="material-symbols-outlined" style={{fontSize: '14px', marginRight: '6px'}}>person</span>
                                ¿Tienen stock del talle L?
                             </div>
                             <div className={`${styles.chatBubble} ${styles.ai}`}>
                                <span className="material-symbols-outlined" style={{fontSize: '14px', marginRight: '6px'}}>smart_toy</span>
                                ¡Sí! Nos quedan 2. ¿Te reservo uno?
                             </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.moduleItem} ${activeFrame === 2 ? styles.moduleHighlight : ''}`}>
                    <div className={styles.moduleIcon}>
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div>
                        <h4>Logística Inteligente</h4>
                        <p>Generación automática de etiquetas y seguimiento de envíos en tiempo real.</p>
                    </div>
                </div>
                <div className={styles.moduleItem}>
                    <div className={styles.moduleIcon}>
                        <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <div>
                        <h4>Métricas que Entiendes</h4>
                        <p>Sin gráficos confusos. Solo lo que necesitas saber para vender más.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Solución (Bento Grid) */}
        <section id="solucion" className={styles.bentoSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.vibrantText}>Independencia vs. Dependencia</h2>
            <p>Elimine los costos variables que asfixian su crecimiento y tome el control total.</p>
          </div>
          
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCard} ${styles.large}`}>
                <span className="material-symbols-outlined" style={{color: 'var(--secondary)', fontSize: '48px'}}>dashboard_customize</span>
                <h3>Hecho a tu medida</h3>
                <p>No adaptamos su negocio a una plantilla. Construimos la plataforma alrededor de su flujo de trabajo.</p>
                <div className={styles.tags}>
                    <span>UX Customizada</span>
                    <span>Escalable</span>
                </div>
            </div>
            
            <div className={styles.bentoCard}>
                <span className="material-symbols-outlined" style={{color: 'var(--tertiary)', fontSize: '40px'}}>trending_down</span>
                <h3>Cero Comisiones</h3>
                <p>ahorrate pagar comisiones que traban tu crecimiento</p>
            </div>

            <div className={styles.bentoCard}>
                <span className="material-symbols-outlined" style={{color: 'var(--primary)', fontSize: '40px'}}>auto_awesome</span>
                <h3>Potenciado por IA</h3>
                <p>Automatizamos atención al cliente e inventario con modelos de lenguaje de última generación.</p>
            </div>

            <div className={`${styles.bentoCard} ${styles.medium}`}>
                <div className={styles.flexRow}>
                    <div className={styles.flexItem}>
                        <h3>Fácil de navegar</h3>
                        <p>Panel de control intuitivo. Gestión de pedidos en segundos sin ser experto.</p>
                    </div>
                    <div className={styles.mockupContainer}>
                        <div className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <span className={styles.statusBadge}>Nuevo Pedido</span>
                                <span className={styles.orderTotal}>$12,500</span>
                            </div>
                            <div className={styles.orderName}>Juan Perez - 2 x Remera Núcleoai</div>
                            <div className={styles.orderActions}>
                                <div className={styles.actionBtn}>Aceptar</div>
                                <div className={styles.actionBtnOutline}>Gestionar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planes" className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <h2 style={{color: '#fff'}}>Inversión Transparente</h2>
            <p>Sin suscripciones ocultas. Pago único para una propiedad digital de por vida.</p>
          </div>

          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
                <h4>Plan Básico</h4>
                <div className={styles.price}>$290 <span>USD</span></div>
                <div className={styles.period}>(Pago único)</div>
                <ul>
                    <li><span className="material-symbols-outlined">check</span> Ecommerce Completo</li>
                    <li><span className="material-symbols-outlined">check</span> Pasarela de pagos</li>
                    <li><span className="material-symbols-outlined">check</span> Gestión de Envíos</li>
                    <li className={styles.delivery}><span className="material-symbols-outlined">schedule</span> Entrega en 1 semana</li>
                </ul>
                <Link href="/contacto?plan=Basico" className={styles.cardButton} style={{textAlign: 'center', textDecoration: 'none'}}>Elegir Plan Básico</Link>
            </div>

            <div className={`${styles.priceCard} ${styles.featured}`}>
                <div className={styles.featuredBadge}>Recomendado</div>
                <h4>Plan Robusto</h4>
                <div className={styles.price}>$590 <span>USD</span></div>
                <div className={styles.period}>(Pago único)</div>
                <ul>
                    <li><span className="material-symbols-outlined">verified</span> Incluye Plan Básico</li>
                    <li><span className="material-symbols-outlined">check</span> Chatbot de IA entrenado</li>
                    <li><span className="material-symbols-outlined">check</span> Sistema ERP integrado</li>
                    <li className={styles.deliveryFeatured}><span className="material-symbols-outlined">schedule</span> Entrega en 2 semanas</li>
                </ul>
                <Link href="/contacto?plan=Robusto" className="button-primary" style={{width: '100%', marginTop: 'auto', textAlign: 'center', textDecoration: 'none'}}>Elegir Plan Robusto</Link>
            </div>

            <div className={styles.priceCard}>
                <h4>Plan Full</h4>
                <div className={styles.price}>$999 <span>USD</span></div>
                <div className={styles.period}>(Pago único)</div>
                <ul>
                    <li><span className="material-symbols-outlined">check</span> Analítica avanzada</li>
                    <li><span className="material-symbols-outlined">check</span> Módulo de Logística y Almacenamiento</li>
                    <li><span className="material-symbols-outlined">check</span> Mailing + CRM</li>
                    <li className={styles.delivery}><span className="material-symbols-outlined">schedule</span> Entrega en 3 semanas</li>
                </ul>
                <Link href="/contacto?plan=Full" className={styles.cardButton} style={{textAlign: 'center', textDecoration: 'none'}}>Elegir Plan Full</Link>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className={styles.founderSection}>
          <div className={styles.founderCard}>
            <div className={styles.founderText}>
              <span className={styles.overline}>Un mensaje del fundador</span>
              <h2>Por qué hacemos esto.</h2>
              <p>
                He visto a demasiados emprendedores valientes, con negocios que funcionan, 
                perder gran parte de su esfuerzo en comisiones de plataformas y mantenimientos técnicos 
                que nunca terminan de entender.
              </p>
              <p>
                Mi misión es democratizar el acceso a tecnología de primer nivel. No necesitas ser un 
                experto en sistemas para tener una plataforma que trabaje para ti. Con IA aplicada 
                y una interfaz honesta, recuperas el control y la rentabilidad de tu negocio.
              </p>
              <div className={styles.founderInfo}>
                <strong>Ariel Piroyansky</strong>
                <span>Arquitecto Digital</span>
              </div>
            </div>
            <div className={styles.founderImageContainer}>
               <div className={styles.founderImgWrap}>
                  <Image 
                    src="/ariel-founder.png" 
                    alt="Ariel Piroyansky" 
                    fill 
                    className={styles.imageCover} 
                  />
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
