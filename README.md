# FireGallery – Authenticated Cloud Image Gallery

A modern, responsive, and authenticated cloud-based image gallery where users can create an account, upload personal images, organize them with categories and tags, mark favorites, search/filter uploads, view profile statistics, and manage their private gallery securely.

🔗 **Live Demo:** https://fire-gallery-chi.vercel.app/

---

## 🚀 Project Overview

**FireGallery** is a full-featured React web application designed to provide a private cloud gallery experience for each user. The application uses Firebase Authentication for secure login/signup, Firestore for storing image metadata, Cloudinary for cloud image hosting, and Framer Motion for smooth UI animations.

The project demonstrates practical frontend engineering concepts such as authentication, protected routes, real-time database integration, cloud image upload workflow, reusable hooks, state management, responsive design, and production deployment.

---

## ✨ Key Features

* **User Authentication**

  * Email/password authentication
  * Google sign-in support
  * Auth state persistence using Firebase Authentication

* **Private User-wise Gallery**

  * Each user can only view their own uploaded images
  * Firestore documents are linked with the authenticated user's UID
  * Protected dashboard access using React Router

* **Cloud Image Upload**

  * Images are uploaded to Cloudinary
  * Cloudinary secure image URLs are stored in Firestore
  * Upload progress bar with real-time progress updates

* **Image Metadata Management**

  * Add image title during upload
  * Select image category
  * Add comma-separated tags
  * Store metadata with image URL, user ID, timestamp, and category

* **Search and Filter**

  * Search images by title or tags
  * Filter images by category
  * Quick category suggestions from the search interface

* **Favorites**

  * Mark/unmark images as favorites
  * Dedicated favorites section
  * Firestore update operation for favorite status

* **Delete Image**

  * Delete uploaded image records from Firestore
  * User confirmation before deletion

* **Profile Dashboard**

  * Total upload count
  * Favorite image count
  * Most-used category
  * Category-wise upload breakdown

* **Modern UI/UX**

  * Pinterest-inspired image grid
  * Glassmorphism dashboard layout
  * Separate premium login page and gallery dashboard
  * Framer Motion animations
  * Responsive design for different screen sizes

* **Production Deployment**

  * Deployed on Vercel
  * React Router deployment rewrite support
  * Environment variable support

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Hooks
* React Router DOM
* Framer Motion
* CSS3
* Responsive UI Design

### Backend-as-a-Service

* Firebase Authentication
* Firebase Firestore

### Cloud Storage

* Cloudinary

### Deployment

* Vercel

---

## 📌 Core Concepts Implemented

* Component-based architecture
* Custom React hooks
* Authentication flow
* Protected routes
* Conditional rendering
* Real-time Firestore listeners
* Cloudinary image upload API
* User-specific data filtering
* CRUD operations with Firestore
* Search and category filtering
* Responsive dashboard UI
* Deployment-ready React application

---

## 🧠 How It Works

The application follows this workflow:

```txt
User signs up / logs in
        ↓
User uploads an image
        ↓
Image is uploaded to Cloudinary
        ↓
Cloudinary returns a secure image URL
        ↓
Image URL and metadata are saved in Firestore
        ↓
Firestore stores userId with each image document
        ↓
Dashboard fetches only images of the logged-in user
        ↓
User can search, filter, favorite, preview, and delete images
```

---

## 📂 Project Structure

```txt
FireGallery/
│
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── comps/
│   │   ├── AuthForm.js
│   │   ├── ImageGrid.js
│   │   ├── Modal.js
│   │   ├── PrivateRoute.js
│   │   ├── ProfilePanel.js
│   │   ├── ProgressBar.js
│   │   ├── Title.js
│   │   └── UploadForm.js
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── hooks/
│   │   ├── useFirestore.js
│   │   └── useStorage.js
│   │
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

---

## 🔐 Authentication

Firebase Authentication is used to manage user accounts.

Supported authentication methods:

* Email and password login/signup
* Google authentication

After login, the authenticated user object is used to fetch and display only that user's images.

---

## 🗄️ Database Design

Firestore stores image metadata in the `images` collection.

Example document structure:

```js
{
  url: "https://res.cloudinary.com/...",
  publicId: "cloudinary_public_id",
  title: "Mountain Trip",
  category: "Travel",
  tags: ["mountain", "trip", "nature"],
  isFavorite: false,
  createdAt: Timestamp,
  userId: "firebase_user_uid",
  userEmail: "user@example.com"
}
```

---

## ☁️ Cloudinary Integration

Cloudinary is used for hosting uploaded images.

The upload flow:

1. User selects an image.
2. Image is uploaded to Cloudinary using an unsigned upload preset.
3. Cloudinary returns a secure image URL.
4. The secure URL is saved in Firestore with user metadata.

> Note: For this student/demo project, Cloudinary unsigned upload is used. In a production-level system, signed uploads should be handled through a secure backend server.

---

## 🔎 Search and Filtering

Users can search images using:

* Image title
* Tags
* Category suggestions

Users can also filter images by categories such as:

* Personal
* Travel
* College
* Design
* Nature
* Friends
* Family
* Work
* Other

---

## 📊 Profile Dashboard

The profile dashboard shows useful user-specific analytics:

* Total uploaded images
* Total favorite images
* Most-used category
* Category-wise upload count

This makes the project more product-oriented and improves its real-world usability.

---

## 🧩 Protected Routes

React Router is used to manage application routes.

Main routes:

```txt
/login
/gallery
```

The gallery dashboard is protected. If a user is not authenticated, they are redirected to the login page.

---

## 🎨 UI Highlights

* Dark aesthetic interface
* Glassmorphism cards
* Pinterest-style image grid
* Premium split-screen login page
* Smooth animations using Framer Motion
* Responsive layout for desktop and mobile screens
* Modal image preview

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/princeraj24/FireGallery.git
```

### 2. Navigate to the project folder

```bash
cd FireGallery
```

### 3. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Create Firebase project

Enable the following Firebase services:

* Authentication
* Firestore Database

Enable sign-in methods:

* Email/Password
* Google Sign-In

### 5. Create Cloudinary upload preset

In Cloudinary:

```txt
Settings → Upload → Upload Presets → Add Upload Preset
```

Set the preset as:

```txt
Signing Mode: Unsigned
```

### 6. Configure environment variables

Create a `.env` file in the root directory if your project uses environment variables:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

### 7. Start development server

```bash
npm start
```

### 8. Build for production

```bash
npm run build
```

---

## 🚀 Deployment

The project is deployed on Vercel.

🔗 **Live Project:** https://fire-gallery-chi.vercel.app/

For Vercel deployment, the project uses:

```txt
Build Command: npm run build
Output Directory: build
Install Command: npm install --legacy-peer-deps
```

The project also includes `vercel.json` to support React Router page refreshes.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔒 Firestore Security Rules

Recommended Firestore rules for user-specific private image access:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /images/{imageId} {
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      allow update: if request.auth != null
                    && resource.data.userId == request.auth.uid;

      allow delete: if request.auth != null
                    && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🧑‍💻 Author

**Prince Raj**

* GitHub: https://github.com/princeraj24
* Live Demo: https://fire-gallery-chi.vercel.app/
