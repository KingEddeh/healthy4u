# CuraLink RHU Process Flow (Offline-First Priority)

## 1. Patient Onboarding (Offline-First)
- **Patient:** Visits RHU for the first time.  
- **Admin:** Registers patient and issues QR/NFC health card *(works offline)*.  
- **System:** Saves record locally in RHU database.  
- *(When internet available: Syncs to cloud, making record available across hospitals/RHUs using CuraLink.)*

---

## 2. Appointment Booking
### Offline Mode (default)
- **Patient:** Visits RHU → Admin/Doctor schedules appointment manually → stored locally.  
- **Doctor:** Sees offline appointment list.  

### Online Mode (optional)
- **Patient (via app):** Books appointment by choosing RHU/hospital that uses CuraLink.  
- **System:** Updates cloud → syncs back to RHU’s offline database.  
- **Admin:** Confirms/syncs appointments once online.  

---

## 3. Chatbot Pre-Triage (Patient Side)
### Offline
- Works as a symptom-checker only *(basic advice stored locally)*.  
- Example: fever → “Visit RHU within 24 hrs.”  

### Online
- **System:** Connects to AI triage model → classifies case as:  
  - Routine → reminders (e.g., checkups, meds)  
  - Urgent → advises RHU visit  
  - Very Urgent → sends alerts to RHU staff  
  - Emergency → shows instructions + auto-notifies nearest RHU/hospital if synced  
- **Doctor/Admin:** Get alert if urgent+ flagged while online.  

---

## 4. Check-In at RHU
- **Patient:** Presents QR/NFC card.  
- **System:** Pulls patient EMR offline *(local storage)*.  
- **Doctor/Admin:** Access case records without internet.  
- *(When online: Updated data syncs with central cloud database.)*

---

## 5. Consultation
- **Doctor:**  
  - Reviews offline EMR + chatbot flags.  
  - Updates diagnosis, prescription, referral slip *(locally stored)*.  
- **System:** Keeps records locally first.  
- *(If online: Syncs EMR to cloud so other RHUs/hospitals can access.)*

---

## 6. Post-Visit Actions
- **Doctor:** Provides follow-up instructions.  
- **System:** Generates offline patient summary *(printable or SMS-ready if gateway exists).*  
- **Patient:** Gets reminders via app *(syncs when connected).*  

---

## 7. Reviews & Feedback
- **Patient:** Leaves rating/review in app.  
- **Offline:** Stored locally until device syncs.  
- **Online:** Updates RHU’s public review score and summary feedback.  
- **Admin:** Reviews flagged issues once connected.  

---

## 8. Reports & Compliance
- **Admin:** Can generate reports offline *(Excel/PDF ready).*  
- **System:** Automatically compiles data from local DB.  
- *(When online: Sends aggregated reports to LGU/DOH dashboard.)*

---

## 🧭 Swimlane Summary (Offline-First Mindset)
- **Patient Lane:** Register → Book appointment (offline/online) → Use chatbot (basic/advanced) → Arrive → Consult → Review  
- **Admin Lane:** Register patients → Manage offline appointments → Generate offline reports → Sync online when possible  
- **Doctor Lane:** See offline schedules → Access EMRs offline → Update locally → Sync when connected → Review feedback  
- **System Lane:** Store securely offline → Sync with cloud when online → Run offline chatbot (basic) / online triage (advanced) → Generate offline reports & reminders  

⚡ **CuraLink works even in RHUs with poor/no connectivity**, but when internet is available, extra features (online booking, advanced triage, real-time syncing, review system) unlock automatically.

---

# CuraLink RHU Flow (Partnership-Based, Offline-First)

## 1. Partnership Setup
- **Startup (CuraLink Team):** Partners with an RHU or hospital.  
- **Admin (RHU):** Gets access to CuraLink Admin Panel.  
- **System:** Generates a unique QR code for that facility *(to be displayed physically or digitally).*  

---

## 2. Patient Onboarding
**At RHU/Hospital:**
- **Admin/Doctor:** Instructs patient — “To use our digital system, scan this QR code to sign up.”  
- **Patient:** Scans RHU’s QR code → redirected to app download/registration page.  
- **System:** Ensures patient account is linked only to that RHU/hospital (or across CuraLink-partnered facilities).  

### Offline mode
- Admin registers patients manually → issues a QR/NFC health card linked to app later.  

### Online mode
- QR signup goes directly through app download link.  

---

## 3. Appointment Booking
- **Patient (via app):** Can only see partnered RHUs/hospitals.  
- **Admin/Doctor:** Confirms schedules.  
- **System:** Syncs offline-first, online if available.  

---

## 4. Chatbot Triage (Patient-Side)
- **Patient:** Uses chatbot in-app.  
- **System:**
  - Offline → gives basic advice (routine vs urgent).  
  - Online → classifies case into 4 triage levels and sends alerts to RHU staff if urgent+.  

---

## 5. Check-In at RHU/Hospital
- **Patient:** Presents QR/NFC health card.  
- **Doctor/Admin:** Scan → patient EMR loads *(offline-ready).*  
- **System:** Syncs data when internet is available.  

---

## 6. Consultation
- **Doctor:** Reviews patient EMR → updates diagnosis, prescription, referrals.  
- **System:** Stores updates offline → syncs later if online.  

---

## 7. Post-Visit + Reviews
- **System:** Generates summary *(print or app).*  
- **Patient:** Gets reminders in-app.  
- **Patient:** Leaves review only for the partnered RHU/hospital visited.  
- **Admin:** Reviews feedback for quality monitoring.  

---

## 8. Reporting & Compliance
- **Admin:** Generates offline reports.  
- **System:** Syncs to cloud → sends consolidated reports to LGU/DOH *(when online).*  

---

## Key Notes in This Flow
- **Access Control:** Patients only sign up via RHU/Hospital-issued QR codes (no random signups).  
- **Trust Building:** Doctors/Admins become the first line of patient onboarding.  
- **Offline-first Priority:** All core features (registration, appointments, consultation, reporting) still work offline.  
- **Online Perks:** QR signup, chatbot triage alerts, hospital reviews, and cloud syncing unlock with internet.
