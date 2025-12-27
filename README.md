# Lumiere E-Commerce Application

A modern, fully-featured e-commerce platform with multi-language support (EN, FR, AR), RTL layouts, and production-ready design.

## 🚀 Features

### Core E-Commerce
- ✅ Product catalog with categories and filtering
- ✅ Real-time product search with live results
- ✅ Shopping cart with persistent storage (localStorage)
- ✅ Multi-step checkout process (shipping → payment → confirmation)
- ✅ User authentication (login/register with form validation)
- ✅ User profile with order history, addresses, and settings
- ✅ Wishlist functionality
- ✅ Product reviews with star ratings
- ✅ Related products recommendations

### Design & UX
- ✅ Premium design system with strict typography hierarchy
- ✅ Smooth animations and micro-interactions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode ready
- ✅ Breadcrumb navigation
- ✅ Toast notifications for user feedback
- ✅ Confirmation dialogs for destructive actions

### Internationalization & Accessibility
- ✅ **3 Languages**: English, French, Arabic
- ✅ **RTL Support**: Full right-to-left layout support for Arabic
- ✅ **WCAG 2.1 AA Compliance**: Accessible keyboard navigation, ARIA labels, semantic HTML
- ✅ **Currency & Date Localization**: Proper formatting per language
- ✅ **Screen Reader Support**: Proper landmarks and live regions

### Form Validation
- ✅ Email format validation
- ✅ Password strength validation (8+ chars, uppercase, number)
- ✅ Card number validation (Luhn algorithm)
- ✅ Expiry date validation
- ✅ CVV validation
- ✅ Postal code validation
- ✅ Real-time error messages

### Performance
- ✅ Image lazy loading
- ✅ Optimized animations
- ✅ Code splitting with Vite
- ✅ Minified production build
- ✅ <2.5s LCP target (mock data)

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Routing**: Wouter (lightweight router)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **i18n**: i18next + react-i18next
- **Form Validation**: Custom validation library + Zod
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Build Tool**: Vite 7
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP**: Fetch API (mock data)

## 📦 Installation

### Prerequisites
- Node.js 16+ (recommended 18 LTS)
- npm or yarn

### Setup

1. **Clone or extract the project**
   ```bash
   cd lumiere-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev:client
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🎮 Development Commands

```bash
# Development (hot reload)
npm run dev:client

# Build for production
npm run build

# Type check
npm check

# Start production build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: 375px (iPhone 12/13)
- **Tablet**: 768px (iPad)
- **Desktop**: 1024px+
- **Large Desktop**: 1920px+

Touch targets minimum 44x44px for accessibility.

## 🌍 Language Support

Switch languages using the globe icon in the header:
- **English** (EN) - Default
- **Français** (FR) - French UI + layout
- **العربية** (AR) - Arabic UI + RTL layout

Language preference persists across sessions.

## 📚 Project Structure

```
lumiere-ecommerce/
├── client/
│   ├── src/
│   │   ├── pages/                # Route pages
│   │   │   ├── Home.tsx         # Landing page
│   │   │   ├── ProductListing.tsx # Shop page
│   │   │   ├── ProductDetail.tsx # Product detail
│   │   │   ├── Cart.tsx         # Shopping cart
│   │   │   ├── Checkout.tsx     # Multi-step checkout
│   │   │   ├── Login.tsx        # Login form
│   │   │   ├── Register.tsx     # Registration form
│   │   │   └── Profile.tsx      # User profile
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── layout/          # Header, Footer
│   │   │   └── shared/          # ProductCard, SearchBar, etc.
│   │   ├── lib/
│   │   │   ├── i18n.ts          # i18next config
│   │   │   ├── store.ts         # Zustand store
│   │   │   ├── validation.ts    # Form validation rules
│   │   │   └── queryClient.ts   # React Query setup
│   │   ├── shared/
│   │   │   ├── models/          # TypeScript types
│   │   │   └── controllers/     # Business logic (ProductController)
│   │   ├── App.tsx              # Main app component
│   │   ├── index.css            # Global styles + design system
│   │   └── main.tsx             # React entry point
│   ├── public/
│   │   └── favicon.png
│   ├── index.html               # HTML template
│   └── tsconfig.json
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎨 Design System

### Typography
- **H1**: 48px, 700 weight, -0.5px letter-spacing
- **H2**: 36px, 700 weight, -0.5px letter-spacing
- **H3**: 28px, 600 weight, -0.5px letter-spacing
- **Body**: 16px, 400 weight, 1.6 line-height
- **Small**: 14px, 400 weight

### Colors
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #4ECDC4 (Turquoise)
- **Background**: #FFFFFF
- **Foreground**: #1A1A2E (Dark Blue-Grey)

### Spacing
8px base unit: 8px, 16px, 24px, 32px, 48px

### Border Radius
12px default (0.75rem)

## 🔐 Form Validation Rules

### Email
Standard RFC 5322 email format

### Password (Registration)
- Minimum 8 characters
- At least one uppercase letter
- At least one number

### Card Number
Luhn algorithm validation (credit card format)

### Expiry Date
MM/YY format, must not be expired

### CVV
3-4 digits only

### Postal Code
Supports US (12345), Canada (A1A 1A1), UK formats

## 📊 Mock Data

The application uses mock product data in `ProductController.ts`:
- 6 sample products across 3 categories (Electronics, Fashion, Home)
- Realistic product images from Unsplash
- Cart state persists in localStorage

To integrate with a real API:
1. Replace `ProductController.ts` API calls
2. Update Zustand store to handle async actions
3. Add authentication tokens to requests
4. Implement proper error handling

## 🚀 Deployment

### Prerequisites
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set environment variables** (create `.env` file):
   ```env
   PORT=5000
   NODE_ENV=production
   DATABASE_URL=postgresql://user:password@host:port/database
   VITE_DEPLOYMENT_URL=https://your-domain.com  # Optional
   ```

### Deployment Options

#### Option 1: Node.js Server (Recommended for Full-Stack)
```bash
# Build
npm run build

# Start production server
npm start
```

The server will:
- Serve the built frontend from `dist/public`
- Handle API routes
- Listen on the port specified by `PORT` env var (default: 5000)

#### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Note**: For Vercel, you may need to configure:
- Build command: `npm run build`
- Output directory: `dist/public`
- Install command: `npm install`

#### Option 3: Netlify (UI Only - Recommended for Frontend)
The project includes a `netlify.toml` configuration file for easy deployment.

**Quick Deploy:**
1. **Connect your GitHub repository** to Netlify:
   - Go to [Netlify](https://www.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will automatically detect the `netlify.toml` configuration

2. **Deploy settings** (auto-configured via `netlify.toml`):
   - Build command: `npm run build:client`
   - Publish directory: `dist/public`
   - Node version: 20 (set in Netlify dashboard if needed)

3. **Optional Environment Variables** (in Netlify dashboard):
   ```
   VITE_DEPLOYMENT_URL=https://your-site.netlify.app
   ```

**Manual Deploy:**
```bash
# Build client only
npm run build:client

# Deploy dist/public folder to Netlify via CLI or drag-and-drop
```

**Note**: This deploys only the frontend UI. The backend server is not included.

#### Option 4: Docker
Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

Then:
```bash
docker build -t lumiere-ecommerce .
docker run -p 5000:5000 -e DATABASE_URL=your_db_url lumiere-ecommerce
```

### Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string (required for database operations)
  - Format: `postgresql://user:password@host:port/database`

**Optional:**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to `production` for production builds
- `VITE_DEPLOYMENT_URL` - Full URL for OpenGraph meta images (e.g., `https://yourdomain.com`)

### Database Setup

1. **Provision a PostgreSQL database** (e.g., Supabase, Railway, Neon, or self-hosted)

2. **Run database migrations**:
   ```bash
   npm run db:push
   ```

3. **Update storage** - Currently using in-memory storage. For production:
   - Replace `MemStorage` in `server/storage.ts` with database-backed storage
   - Implement proper user authentication and session management

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- Keyboard navigation support (Tab, Enter, Escape)
- Visible focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Semantic HTML (main, header, footer, nav)
- Form validation with inline error messages
- Color not the only indicator (icons + text)
- Screen reader support with live regions
- Minimum 44x44px touch targets

## 🔍 Search Functionality

- **Desktop**: Integrated dropdown in header
- **Mobile**: Full-width modal search
- **Features**:
  - Real-time filtering as you type
  - Search by product name or description
  - Clear button (X icon)
  - Keyboard shortcuts (Escape to clear)
  - No results messaging

## 📝 Recent Enhancements

- ✅ Enhanced form validation with specific error messages
- ✅ Breadcrumb navigation on product pages
- ✅ Related products recommendations
- ✅ Confirmation dialogs for destructive actions (remove from cart)
- ✅ Micro-interactions on buttons (hover: scale 1.02x, active: scale 0.98x)
- ✅ Comprehensive i18n with error messages
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Toast notifications for all user actions
- ✅ Image lazy loading
- ✅ RTL layout support (Arabic)

## 🐛 Known Limitations

This is a **frontend mockup** with simulated data. To make it production-ready:

1. **Backend Integration**: Connect to real API endpoints
2. **Authentication**: Implement JWT-based auth
3. **Payment Processing**: Integrate Stripe/PayPal
4. **Database**: Store user data and orders
5. **Email**: Send order confirmation emails
6. **Analytics**: Track user behavior
7. **Error Tracking**: Implement Sentry

## 📞 Support

For issues or questions:
1. Check the code comments
2. Review the design system in `index.css`
3. Check form validation rules in `lib/validation.ts`

## 📄 License

MIT

---

**Happy shopping with Lumiere! 🛍️**
