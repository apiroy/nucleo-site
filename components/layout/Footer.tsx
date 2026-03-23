import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
              <Image 
                  src="/isotipo.png" 
                  alt="Núcleoai Isotipo" 
                  width={240} 
                  height={120} 
                  style={{ objectFit: 'contain', marginBottom: '1.5rem' }}
              />
              <div style={{fontWeight: 800, fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-manrope)'}}>
                <span>Núcleo<span style={{color: 'var(--secondary)'}}>ai</span></span>
              </div>
              <p>Empoderamos emprendedores con tecnología sólida, honesta y fácil de dominar.</p>
              <div className={styles.copyright}>© 2024 Núcleoai. Built for Precision.</div>
          </div>
          <div className={styles.footerLinks}>
              <div>
                  <h5>Navegación</h5>
                  <Link href="/#solucion">Servicios</Link>
                  <Link href="/#planes">Pricing</Link>
                  <Link href="/curso-gratis">Curso Gratis</Link>
              </div>
              <div>
                  <h5>Legal</h5>
                  <Link href="#">Privacidad</Link>
                  <Link href="#">Términos</Link>
              </div>
          </div>
      </div>
    </footer>
  );
}
