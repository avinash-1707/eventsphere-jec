# EventSphere-JEC 🎉

EventSphere-JEC is a modern event management platform designed for students to register for campus events while giving administrators the ability to create and manage events effortlessly.

## ✨ Features

- 🎫 Student registration for events
- 🛠 Admin panel to create and manage events
- 🔐 Authentication with NextAuth.js
- 📦 API handling with Axios
- ⚡ Fast, responsive UI with React & Tailwind CSS

## 🧱 Tech Stack

| Layer            | Technology                  |
|------------------|-----------------------------|
| Frontend         | TypeScript, React, Tailwind CSS |
| Backend/API      | Next.js API Routes, Axios   |
| Authentication   | NextAuth.js                 |
| Database         | MongoDB, Mongoose           |
| Deployment       | Vercel                      |

## 📂 Project Structure (Simplified)

```
/app
  └── api/             # API routes
/components           # Reusable UI components
/context              # Global state (e.g., auth/session)
/lib                  # Utilities and helpers
/models               # Mongoose schemas
/public               # Public assets
/styles               # Tailwind and global styles
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/eventsphere-jec.git
cd eventsphere-jec
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file and configure the following:

```env
MONGODB_URI=your_mongo_uri
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Locally
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🛠 Deployment

Deployed using **Vercel**:  
> [https://eventsphere-jec.vercel.app](https://eventsphere-jec.vercel.app)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
