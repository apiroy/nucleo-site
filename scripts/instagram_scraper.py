import instaloader
import pandas as pd
import time
import random
import os
from datetime import datetime

def scrape_followers(target_username, my_username, my_password):
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
    )

    try:
        print(f"--- Iniciando sesión como {my_username} ---")
        L.login(my_username, my_password)
        print("✅ Sesión iniciada correctamente.")
    except Exception as e:
        print(f"❌ Error al iniciar sesión: {e}")
        return

    try:
        print(f"--- Obteniendo perfil de {target_username} ---")
        profile = instaloader.Profile.from_username(L.context, target_username)
        print(f"✅ Perfil encontrado: {profile.full_name} ({profile.followers} seguidores)")
    except Exception as e:
        print(f"❌ Error al obtener el perfil: {e}")
        return

    followers_data = []
    count = 0
    
    filename = f"followers_{target_username}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    print(f"--- Comenzando la extracción (esto tomará tiempo) ---")
    print(f"Se guardará en: {filename}")

    try:
        for follower in profile.get_followers():
            followers_data.append({
                'username': follower.username,
                'full_name': follower.full_name,
                'is_private': follower.is_private,
                'is_verified': follower.is_verified,
                'profile_pic_url': follower.profile_pic_url
            })
            
            count += 1
            if count % 100 == 0:
                print(f"📦 Procesados {count} seguidores...")
                # Guardar progreso parcial
                df = pd.DataFrame(followers_data)
                df.to_csv(filename, index=False)
            
            # Pausa aleatoria para evitar baneo
            # Aumentar este tiempo si Instagram empieza a bloquear
            time.sleep(random.uniform(1.0, 3.0)) 
            
            # Límite de seguridad para pruebas iniciales (puedes comentarlo para bajar los 108k)
            # if count >= 1000:
            #    print("⚠️ Límite de seguridad alcanzado (1000). Comenta las líneas 64-65 en el código para bajar todos.")
            #    break

    except instaloader.exceptions.ConnectionException:
        print("❌ Error de conexión o bloqueo temporal de Instagram. Intenta más tarde.")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

    # Guardado final
    df = pd.DataFrame(followers_data)
    df.to_csv(filename, index=False)
    print(f"🏁 Proceso terminado. Total extraídos: {len(followers_data)}")
    print(f"📄 Archivo final: {filename}")

if __name__ == "__main__":
    # --- CONFIGURACIÓN ---
    # Reemplaza con tus datos o asegúrate de que no te bloqueen la cuenta
    # SE RECOMIENDA USAR UNA CUENTA SECUNDARIA SI ES POSIBLE
    TARGET = "adrianherz"
    USER = input("Ingresa tu usuario de Instagram: ")
    PWD = input("Ingresa tu contraseña de Instagram: ")
    
    scrape_followers(TARGET, USER, PWD)
