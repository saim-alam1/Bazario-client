# Bazario

A modern **full-stack multi-vendor e-commerce marketplace** built with a focus on scalability, performance, and real-world application architecture. Bazario provides dedicated experiences for customers, vendors, and administrators, combining secure authentication, online payments, inventory management, and intuitive dashboards into a seamless marketplace platform.

**Live Demo:** https://bazario-22fc3.web.app/

---

## Overview

Bazario was developed to simulate the architecture and workflow of a production-grade e-commerce marketplace. The application emphasizes clean code organization, role-based access control, responsive design, and secure backend communication while delivering a smooth shopping experience.

The platform allows customers to browse products, manage orders, and complete secure payments, while vendors can manage their stores, products, and inventory. Administrators have access to tools for managing the overall platform.

---

## Features

### Customer

- Browse products by category
- Advanced search and filtering
- Product details page
- Shopping cart
- Wishlist management
- Secure Stripe checkout
- Order history
- User profile management
- Responsive shopping experience

### Vendor

- Vendor dashboard
- Add, update, and delete products
- Product image upload
- Inventory management
- Order management
- Sales overview

### Administrator

- Admin dashboard
- User management
- Vendor management
- Product moderation
- Platform monitoring
- Role-based access control

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router v7
- TanStack React Query
- Tailwind CSS v4
- DaisyUI
- Axios
- Firebase Authentication
- React Hook Form
- Stripe
- Framer Motion
- AOS
- Swiper
- Recharts
- React Helmet Async
- React Toastify
- SweetAlert2
- Lottie React
- Browser Image Compression
- Date-fns

### Backend

- Node.js
- Express.js
- MongoDB Native Driver
- Firebase Admin SDK
- Stripe API
- CORS
- dotenv

---

## Authentication & Security

- Firebase Authentication
- JWT verification using Firebase Admin SDK
- Protected API routes
- Role-based authorization
- Secure payment processing with Stripe
- Environment variable configuration for sensitive credentials

---

## Core Features

Bazario is designed around three independent user roles, each with a dedicated dashboard and feature set tailored to their responsibilities within the marketplace.

---

# Customer Experience

Customers can enjoy a complete online shopping experience with tools that make purchasing and order management intuitive.

### Shopping

- Browse products by category
- Product search with filtering and sorting
- Product details page
- Shopping cart
- Wishlist management
- Secure Stripe checkout
- Order history
- Responsive user experience

### Order Tracking

Customers can monitor every stage of their purchases.

- Order placed
- Processing
- In Transit
- Delivered
- Order timeline visualization
- Delivery status updates

### Personal Dashboard

Customers have access to personalized statistics, including:

- Total products purchased
- Total amount spent
- Orders currently in transit
- Completed deliveries
- Pending deliveries
- Cancelled orders
- Recent purchase history

### Reviews & Feedback

- Submit product reviews
- Rate purchased products
- Report issues directly to platform administrators

### Notifications

Receive real-time platform notifications for:

- Order updates
- Delivery status changes
- Promotional announcements
- Account-related activities

---

# Vendor Dashboard

Each vendor operates their own marketplace dashboard to efficiently manage products, inventory, and business performance.

### Product Management

- Add new products
- Update product information
- Delete products
- Upload product images
- Increase inventory
- Monitor low-stock products
- Identify out-of-stock products
- Pause product listings
- Resume product listings

### Inventory Control

- Real-time inventory tracking
- Stock quantity updates
- Inventory status monitoring
- Product availability management

### Order Management

Vendors can update order progress through different delivery stages.

- Order Placed
- Processing
- In Transit
- Delivered

### Business Analytics

Vendors have access to comprehensive performance metrics, including:

- Total revenue
- Monthly earnings
- Total products sold
- Best-performing product categories
- Lowest-performing categories
- Products currently in stock
- Products out of stock
- Pending orders
- Completed orders
- Active listings

### Financial Overview

The dashboard provides financial insights such as:

- Lifetime earnings
- Monthly earnings
- Pending payouts
- Platform balance
- Amount currently owed by the platform

### Communication

Vendors can report platform-related issues directly to administrators.

Examples include:

- Technical problems
- Payment issues
- Marketplace disputes
- Product listing concerns

### Notifications

Receive notifications for:

- New orders
- Delivery updates
- Product reports
- Administrative announcements
- Payment updates

---

# Administrator Dashboard

Administrators oversee the complete marketplace and manage the platform ecosystem.

### Platform Analytics

Monitor the overall health of the marketplace through centralized statistics.

- Total registered customers
- Total registered vendors
- Total active users
- New customer registrations
- Monthly user growth
- Total orders
- Total products
- Platform revenue
- Monthly platform revenue
- Vendor earnings
- Marketplace performance

### User Management

Administrators can manage both customers and vendors.

Actions include:

- View user profiles
- Suspend accounts temporarily
- Permanently ban accounts
- Restore suspended users
- Monitor account activity

### Vendor Management

- Review vendor performance
- Manage vendor accounts
- Monitor vendor reports
- View vendor earnings
- Handle marketplace disputes

### Content Moderation

- Monitor product listings
- Remove inappropriate products
- Manage reported content
- Review customer feedback
- Review vendor reports

### Reports & Reviews

Administrators receive reports submitted by both customers and vendors.

Examples include:

- Product complaints
- Platform issues
- Vendor reports
- Customer reports
- Abuse reports

### Financial Dashboard

Track marketplace performance through detailed financial metrics.

- Total platform earnings
- Current month's revenue
- Vendor payouts
- Overall marketplace transactions
- Sales trends

### Notifications

Receive administrative notifications for:

- New reports
- User violations
- Vendor requests
- Platform announcements
- Marketplace activities

---

# Authentication & Authorization

- Firebase Authentication
- Secure backend token verification using Firebase Admin SDK
- Role-Based Access Control (RBAC)
- Protected API routes
- Secure session management

---

# Payments

Integrated with Stripe for secure online payments.

Features include:

- Secure checkout
- Payment verification
- Transaction tracking
- Order confirmation

---

# Analytics

Interactive dashboards provide meaningful insights through visual charts.

Analytics include:

- Sales overview
- Revenue tracking
- Monthly growth
- Category performance
- Customer statistics
- Vendor statistics
- Platform performance

Powered by **Recharts**.

---

# Notifications

The platform includes a role-aware notification system.

Notifications are available for:

### Customers

- Order updates
- Delivery updates
- Account activities

### Vendors

- New orders
- Product status
- Inventory alerts
- Payment updates

### Administrators

- Reports
- User activities
- Vendor requests
- Platform announcements

---

# Responsive Design

Bazario is fully responsive across:

- Desktop
- Laptop
- Tablet
- Mobile devices

The interface is designed with accessibility and usability in mind to provide a consistent experience across different screen sizes.

---

# Performance Optimizations

- React Query server-state management
- Lazy data fetching
- Optimized API requests
- Browser image compression
- Efficient component rendering
- Responsive image handling
- Clean reusable component architecture

---

## Goals

This project was built to strengthen practical experience with:

- Designing scalable full-stack applications
- Building RESTful APIs
- Managing complex application state
- Implementing secure authentication
- Integrating online payment systems
- Developing responsive and accessible user interfaces
- Structuring maintainable production-style projects

---

## Support & Feedback

If you have suggestions, feedback, or ideas for improvement, feel free to open an issue or connect with me on LinkedIn.

---
