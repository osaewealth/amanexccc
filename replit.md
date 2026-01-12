# Coty Beauty Web Application

## Overview

This is a full-stack web application for Coty Inc., the beauty company. The application is built with React (frontend) and Express.js (backend), featuring a modern design system using shadcn/ui components and TailwindCSS. The app uses Drizzle ORM with PostgreSQL for data management and includes custom Coty brand styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: TailwindCSS with custom Coty brand colors and variables
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Pattern**: RESTful API with `/api` prefix
- **Middleware**: Request logging, JSON parsing, CORS handling
- **Development**: Hot reload with tsx for TypeScript execution

### Data Storage
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Development Storage**: In-memory storage implementation for development
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Frontend Structure
- **Pages**: Home page and 404 error page
- **Components**: Complete shadcn/ui component library
- **Hooks**: Custom hooks for mobile detection and toast notifications
- **Utilities**: Class name merging utilities and API request helpers

### Backend Structure
- **Server**: Express application with Vite integration for development
- **Routes**: Centralized route registration system
- **Storage**: Abstracted storage interface with memory-based implementation
- **Vite Integration**: Development server with HMR support

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Validation**: Zod schemas for type-safe data validation
- **Migrations**: Drizzle Kit for database schema management

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js handles requests with `/api` prefix routing
3. **Data Access**: Storage abstraction layer provides CRUD operations
4. **Database**: PostgreSQL with Drizzle ORM for production data persistence
5. **Response**: JSON responses with proper error handling and logging

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Database ORM and query builder
- **express**: Backend web framework
- **react**: Frontend UI library
- **vite**: Build tool and development server

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **typescript**: Type safety across the application
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle Kit manages schema migrations

### Environment Configuration
- **Development**: Local development with hot reload and memory storage
- **Production**: Node.js server with PostgreSQL database
- **Database URL**: Required `DATABASE_URL` environment variable

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema synchronization

### Hosting Considerations
- **Static Assets**: Frontend built to `dist/public` for static serving
- **API Routes**: Express server handles backend API requests
- **Database**: PostgreSQL database with connection pooling
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)