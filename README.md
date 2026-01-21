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
- **React Native** (Expo SDK 52)
- **TypeScript**
- **Firebase** v11 (compat mode for Expo Go)
- **React Navigation** v7
- **WebSocket** for real-time sensor data
- **Expo Go** compatible (no native builds required)

### Backend
- Node.js + Express
- MQTT (HiveMQ Cloud) for sensor data
- Twilio for SMS/Voice calls
- WebSocket Server

## 📦 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Expo Go** app on your phone (iOS or Android)
  - [Download for iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

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

⚠️ **CRITICAL**: The app connects to backend servers running on your computer. You must update the WebSocket URL with your local network IP address.

#### Find Your Local IP Address:

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Look for your local network IP address (usually starts with `192.168.x.x`)

**Example output:**
```
inet 192.168.1.28 netmask 0xffffff00 broadcast 192.168.1.255
```
Your IP is `192.168.1.28`

#### Update WebSocket URL in Code

Edit `app/_components/dashboard/SensorDataService.ts`:

Find line ~49 and replace with YOUR IP:

```typescript
wsConnection = new WebSocket("ws://192.168.1.28:3000");
//                                  ^^^^^^^^^^^^^^
//                                  Replace with YOUR local IP
```

#### Update Backend Phone Numbers (Optional)

Edit `backend/backend.js` to customize:
- **Line 19**: `to` - Recipient phone number for calls
- **Line 20**: `from` - Your Twilio phone number
- **Line 34**: `to` - Recipient for SMS
- **Line 65**: `from` - Your Twilio phone number

## 🎯 Running the Application

### Step 1: Start Backend Servers

Open **2 separate terminal windows**:

#### Terminal 1: MQTT/WebSocket Server (Port 3000)
```bash
cd backend
node index.js
```

You should see:
```
✅ Connected to HiveMQ Cloud
WebSocket server is running on port 3000
```

#### Terminal 2: Twilio Server (Port 3001) - Optional
```bash
cd backend
node backend.js
```

**Note**: Twilio server requires valid credentials in `backend/.env`. Skip if you don't have Twilio setup.

### Step 2: Start Expo Development Server

In a **3rd terminal**:

```bash
npx expo start --go
```

This will:
- Start Metro bundler
- Display a QR code
- Use Expo Go mode (compatible with your phone)

### Step 3: Open on Your Phone

1. **Open Expo Go app** on your phone
2. **Scan the QR code** from the terminal
   - **iOS**: Use Camera app or Expo Go scanner
   - **Android**: Use Expo Go scanner
3. Wait for the bundle to load

**Important**: Your phone and computer must be on the **same WiFi network**.

### Alternative: Run on Emulator/Simulator

If you prefer using emulator instead of physical device:

- Press **`i`** - Open iOS Simulator (Mac only, requires Xcode)
- Press **`a`** - Open Android Emulator (requires Android Studio)
- Press **`w`** - Open in Web Browser

## 📱 First Time Setup

### Create an Account

1. **Launch the app** in Expo Go
2. You'll see the **Home Screen**
3. Tap **"Don't have an account? Sign Up"** button
4. Fill in your details:
   - **Email**: Your email address
   - **Password**: Secure password (min 6 characters)
   - **Name**: Full name
   - **Age**: Your age
   - **Blood Group**: A+, B+, O+, AB+, etc.
   - **Medical History**: Any relevant medical conditions
   - **Emergency Contact**: Phone number (format: +1234567890)
5. Tap **"Register"**
6. You'll be automatically logged in and redirected to the **Dashboard**

### Login

1. Enter your **email** and **password**
2. Tap **"Login"**
3. You'll see the patient dashboard with real-time health monitoring

### Testing the App

**Features you can test:**
- ✅ Registration and Login
- ✅ Dashboard with simulated health data
- ✅ Profile viewing and editing
- ✅ Medical history
- ✅ Chatbot assistant
- ✅ Location tracking
- ✅ SOS button (shows alert, won't call without Twilio)

**Real-time sensor data** requires:
- Backend servers running (Terminal 1 & 2)
- WebSocket connected with correct IP address
- MQTT messages from IoT devices (optional)

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
├── FirebaseConfig.ts            # Firebase initialization (compat mode)
├── .env                         # Frontend environment variables
├── app.json                     # Expo configuration
└── package.json
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "Network is unreachable" / WebSocket Connection Failed

**Cause**: Wrong IP address in the WebSocket URL.

**Solution**:
1. Find your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Update `app/_components/dashboard/SensorDataService.ts` line 49
3. Replace `ws://192.168.1.28:3000` with `ws://YOUR_IP:3000`
4. Reload the app (shake device → "Reload")

#### 2. "Component auth has not been registered yet"

**Cause**: Firebase Auth compatibility with Expo Go.

**Solution**: Already fixed! The app now uses Firebase compat API (`firebase/compat/auth`).

#### 3. App Can't Connect to Backend

**Check**:
- Both terminals show backend servers running
- Your phone and computer are on the **same WiFi network**
- No firewall blocking ports 3000 or 3001
- IP address in code matches your computer's local IP

#### 4. Twilio "username is required" Error

**Cause**: Missing or invalid Twilio credentials.

**Solution**: Add valid credentials to `backend/.env` or skip Twilio server (not required for basic functionality).

#### 5. "react-native-worklets version mismatch"

**Solution**:
```bash
npm install react-native-worklets@0.5.1
```

#### 6. Expo Go Shows Blank Screen

**Solution**:
1. Shake your device
2. Tap "Reload"
3. Check terminal for errors
4. Ensure all dependencies installed: `npm install`

#### 7. Can't Find QR Code / Metro Won't Start

**Solution**:
```bash
# Clear cache and restart
npx expo start --clear
```

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

- ✅ Firebase credentials are stored in `.env` (not committed to git)
- ✅ `.gitignore` prevents sensitive files from being tracked
- ⚠️ Never share your `.env` files publicly
- ⚠️ Keep Twilio and Firebase credentials secure
- 🔒 Enable Firebase security rules in production
- 🔒 Use HTTPS for production WebSocket connections

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Create .env file (see Configuration section above)

# 3. Update IP in SensorDataService.ts (line 49)

# 4. Start backends (2 terminals)
cd backend
node index.js    # Terminal 1
node backend.js  # Terminal 2 (optional)

# 5. Start Expo (3rd terminal)
npx expo start --go

# 6. Scan QR code with Expo Go on your phone
```

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
