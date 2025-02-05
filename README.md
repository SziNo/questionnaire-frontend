# Healthcare Quiz MERN - Frontend

## 📌 Leírás

Ez a projekt egy egészségügyi kérdőív alkalmazás frontend része, React és Vite használatával fejlesztve.

## 🌐 Élő projekt

- **Frontend élő URL**: [https://questionnaire-frontend-nine.vercel.app/](https://questionnaire-frontend-nine.vercel.app/)
- **Backend GitHub**: [https://github.com/SziNo/questionnaire-backend](https://github.com/SziNo/questionnaire-backend)

## 🚀 Stack

A projektben használt technológiák:

- **React**: Frontend keretrendszer.
- **Vite**: Gyors frontend fejlesztési eszköz.
- **Tailwind CSS**: Stílusok.
- **Shadcn Ui**: UI könyvtár.
- **React Hook Form és Zod**: Form kezelése és validáció.
- **Zustand**: Állapotkezelés.
- **Tanstack React Query**: Adatkezelés.
- **Axios**: HTTP kérések.

## 💻 Telepítés lépésről lépésre

1. **Klónozd a repository-t:**

   ```sh
   git clone https://github.com/SziNo/questionnaire-frontend.git
   cd questionnaire-frontend
   ```

2. **Telepítsd a szükséges függőségeket:**

   ```sh
   npm install
   ```

3. **Hozd létre a `.env` fájlt a következő tartalommal:**

   ```env
   VITE_API_URL=https://your-backend-url.com
   ```

   Példa `.env` fájl:

   ```env
   VITE_API_URL=https://questionnaire-backend-sigma.vercel.app
   ```

4. **Indítsd el a fejlesztői szervert:**

   ```sh
   npm run dev
   ```

## 🛠️ Funkciók

Két szerepkör: Páciens és Admin.

### Páciens funkciók:

- Regisztráció és bejelentkezés.
- Kérdőív kitöltése és elküldése.
- Visszaigazoló e-mail küldése a beküldött válaszokkal.

### Admin funkciók:

- Admin regisztráció kulccsal (1111).
- Kérdőívek létrehozása, szerkesztése és törlése.
- Kérdőívekhez tartozó kérdések létrehozása, szerkesztése és törlése.
- Kérdőívek kérdéseinek dinamikus kezelése.
- Kitöltött válaszok statisztikáinak megtekintése és exportálása.
- Értesítések küldése e-mail formájában új válaszok érkezésekor.

## ℹ️ Megjegyzés

Az admin regisztrációhoz a kulcs: 1111. Minden kérdőív kitöltése után e-mailt kap a beküldő és az összes admin is.
