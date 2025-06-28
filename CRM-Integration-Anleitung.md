# 🔗 CRM-Integration Anleitung für Website-Konfigurator

## 📋 Übersicht

Der Website-Konfigurator sendet jetzt automatisch alle Konfigurationsdaten an verschiedene Systeme. Du hast folgende Optionen:

## 🎯 Integration-Optionen

### 1. **Webhook Integration (Empfohlen)**
**→ Direkter API-Aufruf an dein CRM/Backend**

**Setup:**
```javascript
// In konfigurator.js Zeile ~1469 anpassen:
const webhookUrl = 'https://dein-crm.com/api/konfigurator';
```

**Gesendete Daten:**
```json
{
  "configurationId": "CONF-1703123456789-ABC123",
  "websiteType": "business",
  "websiteTypeName": "Business Website", 
  "totalPrice": 1899,
  "companyName": "Beispiel GmbH",
  "contactEmail": "max@beispiel.de",
  "generatedPrompt": "Erstelle eine moderne, wartbare...",
  "featuresWithStatus": [
    {
      "feature": "seo",
      "name": "SEO",
      "isRequired": true,
      "status": "INKLUDIERT"
    }
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. **E-Mail Integration**
**→ Automatische E-Mail mit allen Details**

**Option A: EmailJS (Frontend)**
```html
<!-- In konfigurator.html vor </body> einfügen: -->
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script>
  emailjs.init("DEINE_USER_ID");
</script>
```

**Option B: Backend-API**
```javascript
// Eigene E-Mail API erstellen
POST /api/send-email
{
  "to": "dein-email@domain.de",
  "subject": "Neue Website-Konfiguration",
  "data": {...}
}
```

### 3. **Zapier/Make.com Integration**
**→ Automatisierung ohne Programmierung**

**Setup:**
1. Zapier/Make.com Account erstellen
2. Webhook-URL kopieren
3. In konfigurator.js eintragen:

```javascript
// Zeile ~1527 anpassen:
const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/DEINE-ID/';
```

**Mögliche Zapier-Aktionen:**
- ✅ Neue Zeile in Google Sheets
- ✅ Slack-Benachrichtigung
- ✅ HubSpot Contact erstellen
- ✅ Pipedrive Deal anlegen
- ✅ Airtable Entry hinzufügen

### 4. **Lokale Datensicherung**
**→ Automatisches Backup bei Fehlern**

**Features:**
- ✅ LocalStorage Backup (letzten 10 Konfigurationen)
- ✅ Automatischer CSV/JSON Download
- ✅ Browserbasierte Datensicherung

## 🔧 Schnell-Setup für beliebte CRMs

### **HubSpot Integration**
```javascript
// Webhook URL in konfigurator.js:
const webhookUrl = 'https://api.hubapi.com/form-integrations/v1/submissions/forms/FORM-ID';

// Headers anpassen:
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer DEIN-ACCESS-TOKEN'
}
```

### **Pipedrive Integration**
```javascript
// Webhook URL:
const webhookUrl = 'https://DOMAIN.pipedrive.com/api/v1/deals?api_token=TOKEN';

// Daten-Mapping:
const pipedriveData = {
  title: `Website-Projekt: ${data.companyName}`,
  value: data.totalPrice,
  currency: 'EUR',
  person_name: data.contactName,
  person_email: data.contactEmail
};
```

### **Salesforce Integration**
```javascript
// Webhook URL:
const webhookUrl = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

// Form-Data Format verwenden
```

## 📊 Empfangene Datenstruktur

### **Konfigurations-Daten**
```json
{
  // Basis-Infos
  "configurationId": "Eindeutige ID",
  "timestamp": "ISO Zeitstempel",
  "websiteType": "landing|business|ecommerce|portfolio|blog|consulting",
  "totalPrice": 1899,
  
  // Firma & Kontakt
  "companyName": "Firmenname",
  "contactName": "Ansprechpartner",
  "contactEmail": "email@domain.de",
  "contactPhone": "+49...",
  "industry": "Branche",
  
  // Konfiguration
  "featuresWithStatus": "Features mit Status",
  "colorScheme": "Gewähltes Farbschema",
  "designStyle": "Design-Stil",
  "imageTypes": ["upload", "stock", "ai"],
  
  // Projekt-Details
  "projectDescription": "Beschreibung",
  "timeline": "Zeitrahmen",
  "generatedPrompt": "Vollständiger Entwicklungsauftrag"
}
```

## 🚀 Sofort-Setup (5 Minuten)

### **Option 1: Google Sheets (Einfachste Lösung)**
1. **Zapier Account erstellen** (kostenlos)
2. **"Webhooks by Zapier" → "Google Sheets" Zap**
3. **Webhook-URL kopieren** → in `konfigurator.js` einfügen
4. **Fertig!** Alle Konfigurationen landen automatisch in Sheets

### **Option 2: E-Mail Benachrichtigung**
1. **EmailJS Account** erstellen (kostenlos)
2. **Service & Template** einrichten
3. **IDs in konfigurator.js** eintragen
4. **Fertig!** Du bekommst E-Mails mit allen Details

### **Option 3: Eigenes Backend**
```php
<?php
// simple-webhook.php
$data = json_decode(file_get_contents('php://input'), true);

// In Datenbank speichern
$pdo = new PDO('mysql:host=localhost;dbname=crm', $user, $pass);
$stmt = $pdo->prepare("INSERT INTO configurations (id, data, created_at) VALUES (?, ?, NOW())");
$stmt->execute([$data['configurationId'], json_encode($data)]);

// E-Mail senden
mail('dein-email@domain.de', 
     'Neue Website-Konfiguration', 
     $data['generatedPrompt']);

echo json_encode(['status' => 'success']);
?>
```

## 🔍 Debugging & Monitoring

### **Browser-Konsole**
```javascript
// Backup-Daten anzeigen:
console.log(localStorage.getItem('konfigurator_backups'));

// Letzte Konfiguration:
const backups = JSON.parse(localStorage.getItem('konfigurator_backups') || '[]');
const latest = backups[backups.length - 1];
console.log(localStorage.getItem(`konfigurator_backup_${latest.id}`));
```

### **Webhook-Testing**
Tools zum Testen:
- **webhook.site** - Temporäre URLs
- **ngrok** - Lokale Entwicklung
- **Postman** - API Testing

## 🛠️ Anpassung der URLs

**Alle URLs sind in `konfigurator.js` zu finden:**

```javascript
// Zeile ~1469: Hauptwebhook (CRM)
const webhookUrl = 'DEINE-CRM-URL';

// Zeile ~1505: E-Mail API
const response = await fetch('/api/send-email', {

// Zeile ~1527: Automation (Zapier)
const zapierWebhook = 'DEINE-ZAPIER-URL';

// Zeile ~1489: E-Mail Adresse
to: 'DEINE-EMAIL@domain.de',
```

## 📞 Support & Hilfe

**Bei Problemen:**
1. **Browser-Konsole** checken (F12)
2. **Network-Tab** für API-Calls
3. **LocalStorage** für Backup-Daten
4. **CSV-Download** als Fallback

**Teste die Integration:**
1. Webhook-URL in `webhook.site` testen
2. Dummy-Konfiguration absenden
3. Daten-Empfang verifizieren
4. Produktiv-URL eintragen

---

**🎯 Ziel:** Alle Konfigurator-Daten landen automatisch in deinem CRM - ohne Datenverlust, mit Backup und mehreren Fallback-Optionen! 