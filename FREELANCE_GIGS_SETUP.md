# Freelancing Gig Marketplace - Setup Guide

## 🎯 Quick Start

This guide will help you set up and run the freelancing gig marketplace feature for your seminar presentation.

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or connection string configured)
- npm or yarn

---

## 📋 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

**Configure MongoDB Connection:**

- Update `.env` file with your MongoDB URI
- Default: `mongodb://localhost:27017/syncsaas`

```env
MONGODB_URI=mongodb://localhost:27017/syncsaas
```

### 2. Seed Database with Sample Data

```bash
npm run seed
```

This will:

- Create 8 freelancer profiles with ratings and reviews
- Create 17 gigs across 9 different categories:
  - Web Development (2 gigs)
  - Mobile Development (2 gigs)
  - Design (2 gigs)
  - Writing (2 gigs)
  - Marketing (2 gigs)
  - Data Analysis (2 gigs)
  - Video Editing (2 gigs)
  - AI & Machine Learning (2 gigs)
  - Cloud Computing (1 gig)

### 3. Start Backend Server

```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd web-app
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🎨 Features Implemented

### Frontend (Gig List Page)

✅ **Modern, Responsive UI**

- Professional card-based grid layout
- Sidebar filters with advanced search
- Sort options (Newest, Budget High/Low, Top Rated, Popular)
- Grid/List view toggle
- Loading, error, and empty states
- Mobile-optimized responsive design

✅ **Filtering & Search**

- Search by title and description
- Filter by category (10 categories available)
- Budget range filtering
- Filter reset functionality

✅ **Gig Display**

- Gig title, description, and category
- Freelancer profile info with ratings
- Budget information
- Proposal and view counts
- Delivery time
- Skill tags
- Professional image placeholders

✅ **Sorting Options**

- Newest first
- Budget: High to Low
- Budget: Low to High
- Top Rated
- Most Popular (by views)

### Backend (API)

✅ **Gig Endpoints**

- `GET /api/gigs` - Get all gigs with filters
- `GET /api/gigs/:id` - Get single gig (increments view count)
- `GET /api/gigs/category/:category` - Get gigs by category
- `POST /api/gigs` - Create new gig (authenticated)
- `PUT /api/gigs/:id` - Update gig (authenticated)
- `DELETE /api/gigs/:id` - Delete gig (authenticated)
- `GET /api/gigs/my-gigs/list` - Get user's gigs (authenticated)

✅ **Database**

- 8 seeded freelancer profiles
- 17 sample gigs with realistic data
- Professional descriptions and pricing
- Real avatars via pravatar.cc
- Sample images via unsplash API

---

## 🎬 For Your Seminar Presentation

### Talking Points

1. **Architecture**
   - Full-stack MERN application
   - Role-based access control
   - MongoDB with Mongoose
   - Firebase authentication

2. **Features Demonstrated**
   - Advanced filtering and search
   - Responsive design (mobile-first)
   - Real-time data with API
   - Professional UI/UX

3. **Database Structure**
   - User model with roles
   - Gig model with freelancer info
   - Efficient filtering queries
   - Scalable design

4. **Sample Data Ready**
   - 8 freelancer profiles
   - 17 diverse gigs
   - Multiple categories
   - Realistic pricing ($500-$8000 range)

### Demo Flow

1. Start both backend and frontend
2. Navigate to `/freelance` route
3. Show default gig list
4. Demonstrate filters:
   - Search for "React" or "Python"
   - Filter by "Web Development"
   - Set budget range ($1000-$3000)
5. Show sorting options
6. Click on a gig to view details
7. Show how view count increments
8. Highlight responsive design on mobile view

---

## 📁 File Structure

```
/backend
  /seeds
    ├── seed.js (main seed script)
    ├── users.seed.js (8 freelancer profiles)
    └── gigs.seed.js (17 sample gigs)
  /src
    /controllers
      └── gig.controller.js
    /models
      ├── User.model.js
      └── Gig.model.js
    /routes
      └── gig.routes.js

/web-app
  /src
    /modules/freelance
      ├── GigList.jsx (enhanced UI component)
      ├── GigDetail.jsx
      ├── CreateGig.jsx
      /styles
        └── GigList.css (professional styling)
      /services
        └── gig.service.js
```

---

## 🔧 Customization

### Add More Gigs

Edit `/backend/seeds/gigs.seed.js` and add more gig objects following the same structure.

### Change Categories

Update the `CATEGORIES` array in `GigList.jsx`:

```javascript
const CATEGORIES = [
  "Your Category",
  "Another Category",
  // ...
]
```

### Modify Styling

Edit `/web-app/src/modules/freelance/styles/GigList.css` for colors, spacing, and layout.

### Update Freelancer Data

Edit `/backend/seeds/users.seed.js` to change freelancer names, ratings, and images.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- Ensure MongoDB is running locally
- Check `.env` file has correct `MONGODB_URI`
- Verify connection string format

### "Gigs not loading in frontend"

- Check backend is running on port 5000
- Verify API URL in `gig.service.js`: `http://localhost:5000/api/gigs`
- Check browser console for CORS errors

### Port already in use

- Backend: Change port in `backend/server.js`
- Frontend: Vite will use next available port (usually 5174, 5175, etc.)

---

## 📝 Database Schema

### User Model

```json
{
  "uid": "String (Firebase UID)",
  "name": "String",
  "email": "String",
  "profileImage": "String",
  "rating": "Number",
  "reviews": "Number",
  "roles": {
    "freelancer": "Boolean",
    "intern": "Boolean",
    "mentor": "Boolean",
    "admin": "Boolean"
  }
}
```

### Gig Model

```json
{
  "title": "String",
  "description": "String",
  "category": "String",
  "budget": {
    "min": "Number",
    "max": "Number"
  },
  "skills": "[String]",
  "postedBy": "String (freelancer uid)",
  "freelancerName": "String",
  "freelancerImage": "String",
  "freelancerRating": "Number",
  "freelancerReviews": "Number",
  "deliveryTime": "Number (days)",
  "status": "String (active/inactive/completed/archived)",
  "proposals": "Number",
  "views": "Number",
  "image": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🚀 Next Steps

1. ✅ Gig list UI completed
2. ✅ Database seeding completed
3. 📋 Consider adding:
   - Gig detail page with full information
   - Proposal submission system
   - Freelancer profile pages
   - Review/rating system
   - Payment integration
   - Messaging system

---

## 📞 Need Help?

Check the following:

1. Backend logs - `npm run dev` should show connection status
2. Frontend console (F12) - Check for API errors
3. MongoDB - Verify data is in database
4. Network tab - Check API requests and responses

---

**Last Updated:** May 2, 2026  
**Project:** SyncSaas Career Platform  
**Branch:** feature/freelancing-gigListPage-saisidhartha

---

## 📋 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

**Configure MongoDB Connection:**
- Update `.env` file with your MongoDB URI
- Default: `mongodb://localhost:27017/syncsaas`

```env
MONGODB_URI=mongodb://localhost:27017/syncsaas
```

### 2. Seed Database with Sample Data

```bash
npm run seed
```

This will:
- Create 8 freelancer profiles with ratings and reviews
- Create 17 gigs across 9 different categories:
  - Web Development (2 gigs)
  - Mobile Development (2 gigs)
  - Design (2 gigs)
  - Writing (2 gigs)
  - Marketing (2 gigs)
  - Data Analysis (2 gigs)
  - Video Editing (2 gigs)
  - AI & Machine Learning (2 gigs)
  - Cloud Computing (1 gig)

### 3. Start Backend Server

```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd web-app
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🎨 Features Implemented

### Frontend (Gig List Page)
✅ **Modern, Responsive UI**
- Professional card-based grid layout
- Sidebar filters with advanced search
- Sort options (Newest, Budget High/Low, Top Rated, Popular)
- Grid/List view toggle
- Loading, error, and empty states
- Mobile-optimized responsive design

✅ **Filtering & Search**
- Search by title and description
- Filter by category (10 categories available)
- Budget range filtering
- Filter reset functionality

✅ **Gig Display**
- Gig title, description, and category
- Freelancer profile info with ratings
- Budget information
- Proposal and view counts
- Delivery time
- Skill tags
- Professional image placeholders

✅ **Sorting Options**
- Newest first
- Budget: High to Low
- Budget: Low to High
- Top Rated
- Most Popular (by views)

### Backend (API)
✅ **Gig Endpoints**
- `GET /api/gigs` - Get all gigs with filters
- `GET /api/gigs/:id` - Get single gig (increments view count)
- `GET /api/gigs/category/:category` - Get gigs by category
- `POST /api/gigs` - Create new gig (authenticated)
- `PUT /api/gigs/:id` - Update gig (authenticated)
- `DELETE /api/gigs/:id` - Delete gig (authenticated)
- `GET /api/gigs/my-gigs/list` - Get user's gigs (authenticated)

✅ **Database**
- 8 seeded freelancer profiles
- 17 sample gigs with realistic data
- Professional descriptions and pricing
- Real avatars via pravatar.cc
- Sample images via unsplash API

---

## 🎬 For Your Seminar Presentation

### Talking Points

1. **Architecture**
   - Full-stack MERN application
   - Role-based access control
   - MongoDB with Mongoose
   - Firebase authentication

2. **Features Demonstrated**
   - Advanced filtering and search
   - Responsive design (mobile-first)
   - Real-time data with API
   - Professional UI/UX

3. **Database Structure**
   - User model with roles
   - Gig model with freelancer info
   - Efficient filtering queries
   - Scalable design

4. **Sample Data Ready**
   - 8 freelancer profiles
   - 17 diverse gigs
   - Multiple categories
   - Realistic pricing ($500-$8000 range)

### Demo Flow

1. Start both backend and frontend
2. Navigate to `/freelance` route
3. Show default gig list
4. Demonstrate filters:
   - Search for "React" or "Python"
   - Filter by "Web Development"
   - Set budget range ($1000-$3000)
5. Show sorting options
6. Click on a gig to view details
7. Show how view count increments
8. Highlight responsive design on mobile view

---

## 📁 File Structure

```
/backend
  /seeds
    ├── seed.js (main seed script)
    ├── users.seed.js (8 freelancer profiles)
    └── gigs.seed.js (17 sample gigs)
  /src
    /controllers
      └── gig.controller.js
    /models
      ├── User.model.js
      └── Gig.model.js
    /routes
      └── gig.routes.js

/web-app
  /src
    /modules/freelance
      ├── GigList.jsx (enhanced UI component)
      ├── GigDetail.jsx
      ├── CreateGig.jsx
      /styles
        └── GigList.css (professional styling)
      /services
        └── gig.service.js
```

---

## 🔧 Customization

### Add More Gigs
Edit `/backend/seeds/gigs.seed.js` and add more gig objects following the same structure.

### Change Categories
Update the `CATEGORIES` array in `GigList.jsx`:
```javascript
const CATEGORIES = [
  "Your Category",
  "Another Category",
  // ...
]
```

### Modify Styling
Edit `/web-app/src/modules/freelance/styles/GigList.css` for colors, spacing, and layout.

### Update Freelancer Data
Edit `/backend/seeds/users.seed.js` to change freelancer names, ratings, and images.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running locally
- Check `.env` file has correct `MONGODB_URI`
- Verify connection string format

### "Gigs not loading in frontend"
- Check backend is running on port 5000
- Verify API URL in `gig.service.js`: `http://localhost:5000/api/gigs`
- Check browser console for CORS errors

### Port already in use
- Backend: Change port in `backend/server.js`
- Frontend: Vite will use next available port (usually 5174, 5175, etc.)

---

## 📝 Database Schema

### User Model
```
{
  uid: String (Firebase UID),
  name: String,
  email: String,
  profileImage: String,
  rating: Number,
  reviews: Number,
  roles: {
    freelancer: Boolean,
    intern: Boolean,
    mentor: Boolean,
    admin: Boolean
  }
}
```

### Gig Model
```
{
  title: String,
  description: String,
  category: String,
  budget: {
    min: Number,
    max: Number
  },
  skills: [String],
  postedBy: String (freelancer uid),
  freelancerName: String,
  freelancerImage: String,
  freelancerRating: Number,
  freelancerReviews: Number,
  deliveryTime: Number (days),
  status: String (active/inactive/completed/archived),
  proposals: Number,
  views: Number,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Next Steps

1. ✅ Gig list UI completed
2. ✅ Database seeding completed
3. 📋 Consider adding:
   - Gig detail page with full information
   - Proposal submission system
   - Freelancer profile pages
   - Review/rating system
   - Payment integration
   - Messaging system

---

## 📞 Need Help?

Check the following:
1. Backend logs - `npm run dev` should show connection status
2. Frontend console (F12) - Check for API errors
3. MongoDB - Verify data is in database
4. Network tab - Check API requests and responses

---

**Last Updated:** May 2, 2026  
**Project:** SyncSaas Career Platform  
**Branch:** feature/freelancing-gigListPage-saisidhartha
