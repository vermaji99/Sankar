# LeadFlow - Professional Lead Management CRM

LeadFlow is a modern, production-ready Lead Management System (mini CRM) built with a focus on clean architecture, scalability, and premium UI/UX. It helps startups and businesses track their sales pipeline with ease.

## 🚀 Features

- **Professional Dashboard**: Real-time stats, conversion rates, and distribution charts.
- **Advanced Lead Management**: 
  - Full CRUD operations.
  - Real-time search and status filtering.
  - CSV Export for data portability.
  - Responsive design for mobile and desktop.
- **Premium UI/UX**:
  - Built with Tailwind CSS and shadcn/ui.
  - Smooth animations using Framer Motion.
  - Glassmorphism effects and modern typography.
  - Interactive charts using Recharts.
- **Robust Backend**:
  - Node.js & Express.js with MVC architecture.
  - PostgreSQL database with Prisma ORM.
  - Validation middleware and centralized error handling.
  - Scalable folder structure.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide Icons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State/API**: Axios + React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Middleware**: Helmet, Morgan, Cors, Compression

## 📁 Project Structure

```text
├── backend/
│   ├── prisma/            # Database schema & migrations
│   ├── src/
│   │   ├── config/        # Configuration (Prisma, etc)
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Custom middlewares (Auth, Error, Validation)
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic
│   │   └── index.js       # Entry point
│   └── .env               # Environment variables
└── frontend/
    ├── src/
    │   ├── api/           # API client configuration
    │   ├── components/    # Reusable UI components
    │   ├── hooks/         # Custom React hooks
    │   ├── lib/           # Utility functions (cn, formatDate)
    │   ├── pages/         # Page components
    │   └── App.jsx        # Main application component
    └── tailwind.config.js # Tailwind configuration
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Rename `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials.
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Leads
- `GET /api/leads` - Get all leads (supports search, status filter, pagination)
- `GET /api/leads/stats` - Get dashboard statistics
- `GET /api/leads/:id` - Get a single lead
- `POST /api/leads` - Create a new lead
- `PATCH /api/leads/:id` - Update an existing lead
- `DELETE /api/leads/:id` - Delete a lead

## 🤝 Contributing
Feel free to fork this project and submit pull requests for any features or improvements!

## 📄 License
MIT
