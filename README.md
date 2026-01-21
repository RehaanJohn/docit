# ResQmate - Medical Emergency Response System

A React Native mobile application for medical emergency monitoring with real-time health tracking, doctor-patient connectivity, and emergency SOS features.

## 📋 Features

- **Real-time Health Monitoring**: Track heart rate, blood oxygen, and motion status via IoT sensors
- **Doctor-Patient Portal**: Separate dashboards for patients and healthcare providers
- **Emergency SOS**: Quick access to emergency services with SMS and call functionality
- **Live Location Tracking**: GPS-based location sharing for emergencies
- **Medical History**: Digital records and diagnostic history
- **WebSocket Integration**: Real-time sensor data streaming from MQTT broker
- **Firebase Authentication**: Secure login with persistent sessions

## 🛠️ Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- Firebase (Auth & Firestore)
- React Navigation
- WebSocket for real-time data

### Backend
- Node.js + Express
- MQTT (HiveMQ Cloud) for sensor data
- Twilio for SMS/Voice calls
- WebSocket Server

## 📦 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** (for Android emulator)
- **Expo Go** app (for physical device testing)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/RehaanJohn/docit.git
cd docit
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

## ⚙️ Configuration

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Get your Firebase config from Project Settings

### 2. Environment Variables

#### Frontend `.env` (root directory)

Create `.env` file in the project root:

```env
FIREBASE_API_KEY=AIzaSyAvRQeYErPla6NfnDknFY_DDmlZoJGZ6iI
FIREBASE_AUTH_DOMAIN=docit-760ee.firebaseapp.com
FIREBASE_PROJECT_ID=docit-760ee
FIREBASE_STORAGE_BUCKET=docit-760ee.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=334225408603
FIREBASE_APP_ID=1:334225408603:web:766fd73e400721f351f57e
FIREBASE_MEASUREMENT_ID=G-1KV3JTN80F
```

#### Backend `backend/.env`

Create `backend/.env` file:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

**Get Twilio Credentials:**
- Sign up at [Twilio Console](https://console.twilio.com/)
- Get Account SID and Auth Token from dashboard
- Purchase a phone number with Voice & SMS capabilities

### 3. Update IP Addresses

⚠️ **IMPORTANT**: Update the WebSocket and backend URLs with your local machine's IP address.

#### Find Your IP Address:

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Look for your local network IP (usually `192.168.x.x`)

#### Update WebSocket URL

Edit `app/_components/dashboard/SensorDataService.ts`:

```typescript
// Line ~49: Replace with your machine's IP
wsConnection = new WebSocket("ws://YOUR_IP_ADDRESS:3000");
// Example: ws://192.168.22.142:3000
```

#### Update Backend Phone Numbers (Optional)

Edit `backend/backend.js` to customize:
- **Line 19**: `to` - Recipient phone number for calls
- **Line 20**: `from` - Your Twilio phone number
- **Line 34**: `to` - Recipient for SMS
- **Line 65**: `from` - Your Twilio phone number

## 🎯 Running the Application

### Option 1: Run Everything Manually (Recommended for Development)

Open **3 separate terminal windows**:

#### Terminal 1: Frontend (Expo)
```bash
npx expo start
```

#### Terminal 2: MQTT/WebSocket Backend (Port 3000)
```bash
node backend/index.js
```

#### Terminal 3: Twilio Backend (Port 3001)
```bash
node backend/backend.js
```

### Option 2: Run on Different Platforms

After starting the servers, in the Expo terminal:

- Press **`i`** - Open iOS Simulator (Mac only)
- Press **`a`** - Open Android Emulator
- Press **`w`** - Open Web Browser
- Scan QR code with **Expo Go** app (iOS/Android)

## 📱 First Time Setup

### Create an Account

1. Launch the app
2. On the login screen, tap **"Don't have an account? Sign Up"**
3. Fill in your details:
   - Email
   - Password
   - Name
   - Age
   - Blood Group
   - Medical History
   - Emergency Contact
4. Tap **"Register"**
5. You'll be redirected to the dashboard

### Login

Use the credentials you just created to login.

## 🗂️ Project Structure

```
docit/
├── app/                          # Frontend React Native app
│   ├── _components/
│   │   ├── dashboard/           # Patient dashboard & health monitoring
│   │   │   ├── Dashboard.tsx
│   │   │   ├── SensorDataService.ts  # WebSocket sensor data
│   │   │   └── SOS.tsx          # Emergency SOS button
│   │   ├── doctor/              # Doctor portal components
│   │   ├── login/               # Auth screens
│   │   ├── profile/             # User profile & history
│   │   ├── location/            # GPS tracking
│   │   └── chatbot/             # Medical assistant chatbot
│   ├── _layout.tsx
│   ├── index.tsx
│   └── Navigation.tsx           # Route configuration
├── backend/
│   ├── index.js                 # MQTT/WebSocket server (Port 3000)
│   ├── backend.js               # Twilio SMS/Call server (Port 3001)
│   └── package.json
├── assets/                      # Images, icons, fonts
├── FirebaseConfig.ts            # Firebase initialization
├── .env                         # Frontend environment variables
├── app.json                     # Expo configuration
└── package.json
```

## 🔧 Troubleshooting

### "Network is unreachable" WebSocket Error

**Solution**: Update the WebSocket URL in `SensorDataService.ts` with your machine's IP address.

### Firebase Auth Persistence Warning

**Already Fixed**: The app now uses AsyncStorage for persistent authentication.

### Twilio "username is required" Error

**Solution**: Add valid Twilio credentials to `backend/.env`.

### iOS "bundleIdentifier" Error

**Already Fixed**: Bundle identifier set to `com.resqmate.app`.

### Backend Not Connecting

**Check**:
1. Both backend servers are running
2. No firewall blocking ports 3000 and 3001
3. IP addresses are correct in the code

## 📊 Firestore Database Structure

The app uses these Firestore collections:

### `users` Collection
```javascript
{
  uid: "user_id",
  email: "patient@email.com",
  name: "Patient Name",
  age: 25,
  bloodGroup: "O+",
  medicalHistory: "None",
  emergencyContact: "+1234567890"
}
```

### `doctors` Collection
```javascript
{
  uid: "doctor_id",
  email: "doctor@email.com",
  name: "Dr. Smith",
  specialization: "Cardiology",
  licenseNumber: "12345",
  connectedPatients: []
}
```

### `healthData` Collection
```javascript
{
  email: "patient@email.com",
  heartRate: "72 BPM",
  bloodOxygen: "98%",
  motionState: "Stationary",
  lastUpdated: "2026-01-21 10:30:00"
}
```

## 🌐 API Endpoints

### Backend Server (Port 3001)

#### POST `/call`
Make emergency voice call
```json
{
  "message": "Emergency! Patient needs assistance."
}
```

#### POST `/sms`
Send emergency SMS with location
```json
{
  "message": "Emergency alert",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- Keep Firebase and Twilio credentials secure
- Use environment variables for all sensitive data
- Enable Firebase security rules in production

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Rehaan John
- Jonathan Vineet

## 🆘 Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/RehaanJohn/docit/issues)
- Contact: rehaanjohn@example.com

---

**Built with ❤️ for emergency medical response**
