# 🎓 CUC TechPrep PRO — Mi Entrenador Personal de Entrevista Técnica

Plataforma web interactiva personal desarrollada para preparar integralmente la entrevista técnica de la vacante:
**"Practicante de las carreras de Sistemas, Análisis y Desarrollo de Software (ADSO) o afines"**  
**Convocatoria:** Universidad de la Costa (CUC) — Barranquilla, Colombia  
**Unidad de la Vacante:** Unidad GTA (Gestión de Tecnologías Aplicadas)

---

## 🚀 Cómo abrir y usar el aplicativo

El aplicativo es 100% estático y cliente, no requiere instalar servidores, dependencias complejas ni Node.js.

1. **Abrir directamente:**
   - Haz doble clic sobre el archivo [index.html](file:///c:/Users/USER/Desktop/Entrevista/index.html) o haz clic derecho > *Abrir con* > Google Chrome / Microsoft Edge / Brave.
2. Todo tu progreso (puntajes, notas del simulador, borrador del pitch y checklist) se guarda automáticamente en tu navegador local (`localStorage`).

---

## 🎯 Contenido y Módulos del Aplicativo (Versión 3.0 Especializada en ADSO & Git)

### 1. 📋 Radiografía de la Vacante CUC
- Desglose de los 4 pilares: *Sin amplia experiencia previa*, *Bases en programación & ADSO*, *Herramientas de IA* y *Actitud/Proactividad*.
- Estructura temporal habitual de la entrevista técnica.

### 2. 💬 Banco Maestro de Preguntas & Respuestas Modelo (51 Preguntas)
- **💻 Programación & Lógica (12 preguntas):** POO (4 pilares), SQL vs NoSQL, Cliente-Servidor y REST, diagnóstico de lentitud, estructuras de datos (Array vs HashMap vs Set con Big-O), asincronía (`async/await`, Event Loop), principios SOLID (SRP), transacciones ACID, MVC, JWT y pirámide de pruebas.
- **📐 ADSO & Requisitos de Software (7 preguntas):** Requerimientos Funcionales (RF) vs No Funcionales (RNF), Historias de Usuario (User Stories) y Criterios de Aceptación (Gherkin Dado-Cuando-Entonces), Modelado DER y resolución de relaciones N:M con tablas intermedias, Diagramas UML (Clases, Casos de Uso, Secuencia, Actividades), ciclo de vida del software (SDLC), pruebas de Caja Negra vs Caja Blanca, y Cascada vs Scrum.
- **🌿 Git, GitHub & Entornos Locales (8 preguntas):** `git merge` vs `git rebase`, `git reset` (soft, mixed, hard) vs `git revert`, resolución paso a paso de Merge Conflicts, `git stash` y `git cherry-pick`, `package.json` vs `package-lock.json` y `dependencies` vs `devDependencies`, entornos virtuales Python (`venv`, `pip freeze`, `requirements.txt`), diagnóstico y liberación de puertos bloqueados (`EADDRINUSE`, `netstat`, `taskkill`, `lsof`, `kill`), y manejo de archivos `.env` y `.gitignore`.
- **🤖 Inteligencia Artificial & Herramientas (10 preguntas):** Copilotos de código, Prompt Engineering profesional, integración de APIs de IA en backend seguro, RAG aplicado a reglamentos universitarios, Zero-Shot vs Few-Shot vs Chain-of-Thought (CoT), Embeddings y bases de datos vectoriales, riesgos de seguridad (Prompt Injection, alucinaciones, fuga de PII), Agentes de IA vs chatbots, hiperparámetros (Temperature, Top-P, Max Tokens) y Fine-Tuning vs RAG.
- **🤝 Habilidades Blandas & Fit Cultural (8 preguntas):** Pitch "Háblame de ti", método STAR ante tecnologías desconocidas, plan ante caída de producción, gestión de desacuerdos en Code Reviews, priorización de tareas, asimilación de feedback y comunicación a perfiles no técnicos.
- **🏛️ Casos Prácticos Universitarios (6 preguntas):** Automatización de certificados, alta concurrencia en días de matrícula masiva (6.000 usuarios), alertas tempranas de deserción con ML, integración con Moodle (APIs/LTI), seguridad y Habeas Data, y preguntas estratégicas para formularle a los entrevistadores.

### 3. 🎙️ Simulador de Entrevista en Tiempo Real (Mock Interview)
- Configura sesiones de 3, 5 o 10 preguntas aleatorias o por área temática (incluyendo solo ADSO o solo Git/Entornos).
- Cronómetro en vivo, lector de voz automático (Text-to-Speech), bloc de notas y autoevaluación con estrellas.

### 4. 📝 Test Técnico Interactivo (Quiz de 10 Preguntas)
- Examen tipo prueba técnica cronometrada con retroalimentación inmediata, barra de progreso y diagnóstico porcentual.

### 5. 💻 Laboratorio Práctico de Código & Terminal (15 Retos Interactivos)
1. *Algoritmia:* Clasificador de notas en escala universitaria (0.0 a 5.0) con validación de rangos.
2. *Manipulación de Cadenas:* Validador de correo institucional `@cuc.edu.co`.
3. *Arrays & Métodos Funcionales:* Filtro de estudiantes de cuadro de honor (`filter`, `map`, `sort`).
4. *Algoritmo Clásico:* Verificador de palíndromos y limpieza con expresiones regulares.
5. *Lógica de Negocio:* Validador de prerrequisitos de asignaturas con `Set` y búsqueda O(1).
6. *ADSO & Requisitos:* Clasificador léxico de Requerimientos Funcionales (RF) vs No Funcionales (RNF).
7. *Git & Buenas Prácticas:* Validador de nombres de ramas según Git Flow (`feature/`, `bugfix/`).
8. *Entornos & Variables:* Parser y sanitizador de archivos `.env`.
9. *SQL Agregado:* Consulta de promedio por carrera con `GROUP BY` y `HAVING`.
10. *SQL Relacional:* Cruce de tablas con `INNER JOIN` (Estudiantes, Asignaturas y Calificaciones).
11. *SQL Analítico:* Detección de estudiantes en riesgo académico.
12. *ADSO & Modelado Relacional:* DDL SQL para tabla intermedia `matriculas` con claves foráneas y clave primaria compuesta.
13. *Prompt Engineering:* System Prompt estructurado en JSON para clasificar PQR.
14. *IA & RAG:* Asistente normativo con citas y guardrails contra alucinaciones.
15. *Terminal & Debugging:* Simulación de diagnóstico y liberación de puerto ocupado (`netstat` / `taskkill` en Windows y `lsof` / `kill` en Linux).

### 6. 🚀 Constructor de Pitch Personal ("Háblame de ti")
- Redactor guiado de 90 segundos que integra tu perfil ADSO, bases técnicas, experiencia en IA y motivación por la vacante de la CUC.

### 7. 🎯 Estrategia, Checklist & Preguntas Clave
- Las 3 preguntas más inteligentes para hacerle al entrevistador y lista de verificación de 8 puntos críticos.

### 8. 🛠️ Guía ADSO, Git & Cheat Sheet de Comandos de Terminal
- **Glosario Fundamental ADSO:** Definiciones claras de RF, RNF, User Stories, DER, UML, SDLC, pruebas de software y CRUD.
- **Comandos de Ejecución Local copiables en 1 clic:**
  - *Node.js & npm:* Verificación de versiones, `package.json`, `package-lock.json`, dependencias y scripts de arranque.
  - *Python & venv:* Creación de entornos, comandos de activación en Windows PowerShell y Linux, `pip freeze` y `requirements.txt`.
  - *Git & GitHub:* Ramas, commits con convención, push, `git stash`, log visual y `git revert`.
  - *Troubleshooting de Puertos:* Comandos para liberar puertos tomados en Windows (`netstat -ano`, `taskkill`) y Linux (`lsof -i`, `kill -9`).

---

## 📱 Experiencia Móvil & Tablet (Responsive Touch Ready)

El aplicativo cuenta con una arquitectura responsiva completa adaptada a smartphones y tablets:
- **Barra de navegación táctil deslizante:** Desplazamiento horizontal fluido sin barras molestas (`scrollbar-none`, `snap-x`).
- **Bottom Navigation Dock:** Barra inferior ergonómica fija en teléfonos con acceso directo con una mano a Vacante, Preguntas, Simulador, Código y el menú de módulos.
- **Drawer Modal Móvil (`#mobile-drawer`):** Menú lateral táctil accesible desde el botón de hamburguesa del encabezado o desde la barra inferior para saltar a cualquiera de los 8 módulos.
- **Safe Area Insets:** Soporte nativo para muescas (notches) e indicadores de inicio de iOS y Android (`env(safe-area-inset-bottom)`).
- **Prevención de auto-zoom en iOS:** Inputs y textareas calibrados a 16px para evitar aumentos de zoom molestos al escribir.

---

## ☁️ Despliegue en Cloudflare Pages

El proyecto está preparado como un sitio estático puro optimizado para **Cloudflare Pages**:
- `_headers`: Cabeceras de seguridad HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) y políticas de caché rápida.
- `_redirects`: Regla de reescritura SPA (`/* /index.html 200`) para navegación limpia sin errores 404.
- `.gitignore`: Filtro para control de versiones en Git.

Puedes desplegarlo de forma **100% gratuita** utilizando cualquiera de estos 3 métodos:

### Método 1: Arrastrar y Soltar (Sin Git / Más rápido - 30 segundos)
1. Inicia sesión en [dash.cloudflare.com](https://dash.cloudflare.com/).
2. En el menú lateral, dirígete a **Compute (Workers & Pages)** > **Create application** > pestaña **Pages**.
3. Selecciona **Upload assets** (Subir recursos directos).
4. Asigna un nombre al proyecto (por ejemplo: `cuc-techprep-pro`).
5. Arrastra toda la carpeta `Entrevista` o selecciónala en el navegador (debe contener `index.html`, `_headers`, `_redirects`, `css/`, `js/`).
6. Haz clic en **Deploy site**. ¡Listo! Recibirás de inmediato una URL pública con HTTPS gratuita (ejemplo: `https://cuc-techprep-pro.pages.dev`).

### Método 2: Conexión con Repositorio GitHub (CI/CD Automático)
1. Sube este proyecto a tu GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: CUC TechPrep PRO listo para Cloudflare"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. En [dash.cloudflare.com](https://dash.cloudflare.com/), ve a **Pages** > **Connect to Git**.
3. Selecciona tu repositorio de GitHub.
4. En la configuración de Build:
   - **Framework preset:** `None`
   - **Build command:** *(dejar vacío)*
   - **Build output directory:** `.` (o dejar vacío, es la raíz)
5. Haz clic en **Save and Deploy**. A partir de ese momento, cada `git push` actualizará tu sitio automáticamente.

### Método 3: Mediante la Terminal con Wrangler CLI
Si tienes Node.js instalado en tu máquina personal:
```bash
# Despliegue directo a producción en Cloudflare Pages
npx wrangler pages deploy . --project-name=cuc-techprep-pro

# O usando el script del package.json:
npm run deploy
```
Wrangler te abrirá una pestaña del navegador para autorizar tu cuenta de Cloudflare y publicará la aplicación en cuestión de segundos.
