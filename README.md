# 🛍️ Bazario | Shop Smarter

**Bazario** is a full-stack multi-vendor e-commerce marketplace built with the **MERN Stack**. It provides a complete online shopping ecosystem where customers can discover and purchase products, vendors can manage their own stores, and administrators can oversee the entire platform through a dedicated management dashboard.

🌐 **Live Demo:** https://bazario-22fc3.web.app/

---

# 📖 Project Overview

Bazario is designed to simulate a real-world marketplace inspired by platforms like **Amazon**, **Daraz**, and **Etsy**. The application focuses on scalability, role-based access control, inventory management, vendor operations, and a seamless shopping experience.

---

# ✨ Key Features

## 👤 Customer

Customers can:

- Register and securely log in
- Browse products by category
- Search, filter, and sort products
- View detailed product information
- Add products to Cart and Wishlist
- Complete the checkout process
- Track order status
- Manage profile and shipping addresses
- Leave product reviews
- Report products or issues to administrators

---

## 🏪 Vendor

Approved vendors can:

- Apply to become a seller
- Create and manage their own store
- Add, edit, and delete products
- Manage inventory
- Process customer orders
- Update shipping status
- View earnings
- Access sales analytics
- Manage discounts
- Manage payouts and withdrawals

---

## 🛡️ Admin

Administrators have full control over the marketplace.

Responsibilities include:

- Manage users
- Approve or reject vendor applications
- Manage products
- Monitor customer orders
- Configure platform commissions
- Handle customer reports
- View platform analytics
- Manage vendor payouts

---

# 🌐 Public Pages

- Home
- Shop
- Categories
- Become a Seller
- About
- Contact
- Blog _(Optional)_

### Global Navigation

- 🔍 Search
- ❤️ Wishlist
- 🛒 Shopping Cart
- 🔔 Notifications
- 👤 User Profile

---

# 🏠 Home Page

The landing page includes:

- Hero Banner
- Product Search
- Featured Promotions
- Category Showcase
- Flash Sale Countdown
- Featured Products
- Top Vendors
- New Arrivals
- Footer

---

# 🛍️ Shop Experience

## Product Listing

- Category Filtering
- Price Range Filtering
- Rating Filter
- Brand Filter
- Availability Filter
- Product Sorting
- Grid/List View
- Pagination

## Product Details

- Product Image Gallery
- Product Information
- Pricing & Discounts
- Add to Cart
- Buy Now
- Wishlist
- Vendor Information
- Customer Reviews
- Related Products

---

# 🛒 Shopping Flow

- Shopping Cart
- Quantity Management
- Coupon Support
- Order Summary
- Secure Checkout
- Payment Method Selection
- Order Review
- Order Success Page

---

# 📊 Dashboard Structure

## 👤 Customer Dashboard

- Profile
- Overview
- Order Tracking
- My Orders
- Wishlist
- Cart
- Reviews

---

## 🏪 Vendor Dashboard

- Profile
- Overview
- Products
- Add Product
- Orders
- Inventory
- Discounts
- Analytics
- Reviews
- Payouts
- Withdrawals

---

## 🛡️ Admin Dashboard

- Profile
- Overview
- Manage Users
- Manage Vendors
- Vendor Approval
- Manage Products
- Analytics
- Reports
- Payout Management

---

# 📂 Category System

- Dynamic Category Loading
- Scalable Category Architecture

---

# 🔐 Authentication & Authorization

Bazario implements **Role-Based Access Control (RBAC)** to secure routes and protect platform resources.

| Role     | Access               |
| -------- | -------------------- |
| Guest    | Public Pages         |
| Customer | Customer Dashboard   |
| Vendor   | Vendor Dashboard     |
| Admin    | Full Platform Access |

### Middleware

```Javascript
protect;
authorize("customer");
authorize("vendor");
authorize("admin");
```

---

# 💡 Project Inspiration

Bazario draws inspiration from modern marketplace platforms such as:

- Amazon
- Daraz
- Etsy

while implementing a scalable architecture suitable for future enhancements and enterprise-level marketplace features.
