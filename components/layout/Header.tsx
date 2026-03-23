import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";

interface HeaderProps {
    activePage?: string;
}

export default function Header({ activePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image 
              src="/isotipo.png" 
              alt="Núcleoai Isotipo" 
              width={120} 
              height={60} 
              style={{ objectFit: 'contain', marginRight: '0.4rem' }}
          />
          <span style={{color: '#fff', fontSize: '1.8rem'}}>Núcleo<span style={{color: 'var(--secondary)'}}>ai</span></span>
        </Link>
        
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/#solucion" onClick={() => setIsMenuOpen(false)} className={activePage === 'home' ? styles.activeLink : ''}>Solución</Link>
          <Link href="/#demo" onClick={() => setIsMenuOpen(false)}>Cómo Funciona</Link>
          <Link href="/curso-gratis" onClick={() => setIsMenuOpen(false)} className={activePage === 'curso' ? styles.activeLink : ''}>Curso Gratis</Link>
          <Link href="/#planes" onClick={() => setIsMenuOpen(false)}>Planes</Link>
          <Link href="/contacto" onClick={() => setIsMenuOpen(false)} className="button-primary" style={{textDecoration: 'none'}}>Contactar</Link>
        </nav>
      </div>
    </header>
  );
}
