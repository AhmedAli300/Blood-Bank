# Blood Bank System - Complete API Endpoints

## Base URLs
- **User Service**: `http://localhost:4000`
- **Bank Service**: `http://localhost:5000`

---

## USER SERVICE (Port 4000)

### Health Check
| | |
|---|---|
| **URL** | `GET http://localhost:4000/health` |
| **Headers** | None |
| **Response** | `{"status": "OK", "service": "user-service", "timestamp": "..."}` |

---

### Authentication

#### 1. Register User
| | |
|---|---|
| **URL** | `POST http://localhost:4000/auth/register` |
| **Headers** | `Content-Type: application/json` |
| **Body** | `{"name": "John Doe", "email": "john@example.com", "password": "password123", "phone": "+1234567890", "role": "USER"}` |
| **Response** | `{"message": "User registered successfully", "user": {"id": 1, "name": "...", "email": "...", "role": "USER"}, "token": "eyJhbG..."}` |

#### 2. Login
| | |
|---|---|
| **URL** | `POST http://localhost:4000/auth/login` |
| **Headers** | `Content-Type: application/json` |
| **Body** | `{"email": "john@example.com", "password": "password123"}` |
| **Response** | `{"message": "Login successful", "user": {"id": 1, "name": "...", "role": "USER"}, "token": "eyJhbG..."}` |

---

### Users (Super Admin Only)

#### 3. Get All Users
| | |
|---|---|
| **URL** | `GET http://localhost:4000/users` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>` |
| **Response** | `{"users": [{"id": 1, "name": "...", "email": "...", "role": "..."}]}` |

#### 4. Get User by ID
| | |
|---|---|
| **URL** | `GET http://localhost:4000/users/:id` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>` |
| **Response** | `{"user": {"id": 1, "name": "...", "email": "...", "role": "..."}}` |

#### 5. Get My Profile
| | |
|---|---|
| **URL** | `GET http://localhost:4000/users/profile/me` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"user": {"id": 1, "name": "...", "email": "...", "role": "..."}}` |

---

### Blood Requests

#### 6. Create Request (DRAFT)
| | |
|---|---|
| **URL** | `POST http://localhost:4000/requests/create` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"blood_type": "A+", "quantity": 2, "governorate": "Cairo", "city": "Nasr City", "patient_name": "Patient Name", "reason": "Surgery"}` |
| **Response** | `{"message": "Request created successfully", "request": {"id": 1, "status": "DRAFT", "blood_type": "A+", ...}}` |

#### 7. Upload Documents
| | |
|---|---|
| **URL** | `POST http://localhost:4000/requests/upload-documents/:id` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: multipart/form-data` |
| **Body** | FormData with `national_id_image` (file) and `medical_proof_image` (file) |
| **Response** | `{"message": "Documents uploaded successfully", "request": {"id": 1, "national_id_image_url": "...", "medical_proof_image_url": "...", "status": "CREATED"}}` |

#### 8. Send Request to Bank
| | |
|---|---|
| **URL** | `POST http://localhost:4000/requests/send-to-bank/:id` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"bank_id": 1}` |
| **Response** | `{"message": "Request sent to bank successfully", "request": {"id": 1, "status": "SENT_TO_BANK", "bank_id": 1}}` |

#### 9. Get My Requests
| | |
|---|---|
| **URL** | `GET http://localhost:4000/requests/my-requests` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>` |
| **Response** | `{"requests": [{"id": 1, "status": "SENT_TO_BANK", "blood_type": "A+", ...}]}` |

---

### Payments

#### 10. Create Payment Intent (Stripe)
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/create` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"request_id": 1, "amount": 100.00, "bank_id": 1}` |
| **Response** | `{"message": "Payment intent created successfully", "data": {"payment_id": 1, "client_secret": "pi_...", "amount": 100, "status": "PENDING", "request_status_updated": "PAYMENT_PENDING"}}` |

#### 11. Confirm Payment
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/confirm` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"payment_intent_id": "pi_..."}` |
| **Response** | `{"message": "Payment confirmed successfully", "data": {"payment_id": 1, "status": "COMPLETED", "request_status": "PAID"}}` |

#### 12. Get Payment Details
| | |
|---|---|
| **URL** | `GET http://localhost:4000/payments/:id` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>` |
| **Response** | `{"message": "Payment details retrieved successfully", "data": {"payment": {...}, "stripe_status": "succeeded"}}` |

#### 13. Get User Payments
| | |
|---|---|
| **URL** | `GET http://localhost:4000/payments?status=COMPLETED&limit=20&offset=0` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>` |
| **Response** | `{"message": "Payment history retrieved successfully", "data": {"payments": [...], "statistics": {...}, "pagination": {...}}}` |

#### 14. Refund Payment (Super Admin Only)
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/refund` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"payment_id": "pi_...", "amount": 50.00}` (amount optional for full refund) |
| **Response** | `{"message": "Payment refunded successfully", "data": {"refund_id": "re_...", "amount_refunded": 50, "payment_status": "REFUNDED"}}` |

#### 15. Stripe Webhook
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/webhooks/stripe` |
| **Headers** | `Stripe-Signature: <SIGNATURE>`, `Content-Type: application/json` |
| **Body** | Raw Stripe webhook payload |
| **Response** | `{"success": true, "message": "Payment succeeded processed"}` |

#### 16. Initiate Payment (Simplified)
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/initiate` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"request_id": 1}` |
| **Response** | `{"request": {"id": 1, "status": "PAYMENT_PENDING"}, "message": "Payment initiated"}` |

#### 17. Confirm Payment Simplified
| | |
|---|---|
| **URL** | `POST http://localhost:4000/payments/confirm-simplified` |
| **Headers** | `Authorization: Bearer <USER_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"request_id": 1, "amount": 100}` |
| **Response** | `{"request": {"id": 1, "status": "PAID"}, "message": "Payment confirmed"}` |

---

### Notifications (User Service)

#### 18. Get User Notifications
| | |
|---|---|
| **URL** | `GET http://localhost:4000/notifications` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"notifications": [{"id": 1, "type": "REQUEST_SENT_TO_BANK", "title": "...", "message": "...", "is_read": false}]}` |

#### 19. Get Unread Count
| | |
|---|---|
| **URL** | `GET http://localhost:4000/notifications/unread-count` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"count": 5}` |

#### 20. Get Notification by ID
| | |
|---|---|
| **URL** | `GET http://localhost:4000/notifications/:id` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"notification": {"id": 1, "type": "...", "title": "...", "message": "..."}}` |

#### 21. Mark Notification as Read
| | |
|---|---|
| **URL** | `PATCH http://localhost:4000/notifications/:id/read` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"message": "Notification marked as read", "notification": {"id": 1, "is_read": true}}` |

#### 22. Mark All as Read
| | |
|---|---|
| **URL** | `PATCH http://localhost:4000/notifications/read-all` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"message": "All notifications marked as read", "updated": 5}` |

#### 23. Cleanup All Notifications
| | |
|---|---|
| **URL** | `DELETE http://localhost:4000/notifications/cleanup` |
| **Headers** | `Authorization: Bearer <TOKEN>` |
| **Response** | `{"message": "All notifications deleted successfully", "deleted": 10}` |

---

## BANK SERVICE (Port 5000)

### Health Check
| | |
|---|---|
| **URL** | `GET http://localhost:5000/health` |
| **Headers** | None |
| **Response** | `{"status": "OK", "service": "bank-service", "timestamp": "..."}` |

---

### Blood Banks

#### 24. Get All Banks (Public)
| | |
|---|---|
| **URL** | `GET http://localhost:5000/blood-banks` |
| **Headers** | None |
| **Response** | `{"bloodBanks": [{"id": 1, "name": "Cairo Blood Bank", "governorate": "Cairo", ...}]}` |

#### 25. Get Bank by ID (Public)
| | |
|---|---|
| **URL** | `GET http://localhost:5000/blood-banks/:id` |
| **Headers** | None |
| **Response** | `{"bloodBank": {"id": 1, "name": "Cairo Blood Bank", ...}}` |

#### 26. Create Bank (Super Admin)
| | |
|---|---|
| **URL** | `POST http://localhost:5000/blood-banks/create` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"name": "New Blood Bank", "governorate": "Cairo", "city": "Nasr City", "address": "123 Street", "phone": "+1234567890", "email": "bank@example.com"}` |
| **Response** | `{"message": "Blood bank created successfully", "bloodBank": {"id": 1, "name": "..."}}` |

#### 27. Update Bank (Super Admin)
| | |
|---|---|
| **URL** | `PUT http://localhost:5000/blood-banks/:id` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"name": "Updated Name", "phone": "+9876543210"}` |
| **Response** | `{"message": "Blood bank updated successfully", "bloodBank": {"id": 1, "name": "Updated Name"}}` |

#### 28. Delete Bank (Super Admin)
| | |
|---|---|
| **URL** | `DELETE http://localhost:5000/blood-banks/:id` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>` |
| **Response** | `{"message": "Blood bank deleted successfully"}` |

#### 29. Create Bank Admin (Super Admin)
| | |
|---|---|
| **URL** | `POST http://localhost:5000/blood-banks/:bankId/admin` |
| **Headers** | `Authorization: Bearer <SUPER_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"name": "Bank Admin", "email": "admin@bank.com", "password": "password123", "phone": "+1234567890"}` |
| **Response** | `{"message": "Bank admin created successfully", "user": {"id": 2, "name": "...", "role": "BANK_ADMIN", "bank_id": 1}}` |

---

### Inventory (Bank Admin Only)

#### 30. Create Inventory Item
| | |
|---|---|
| **URL** | `POST http://localhost:5000/inventory/banks/:bank_id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"blood_type": "A+", "quantity": 10, "expiry_date": "2025-12-31"}` |
| **Response** | `{"message": "Inventory item created successfully", "inventory": {"id": 1, "blood_type": "A+", "quantity": 10}}` |

#### 31. Update Inventory Item
| | |
|---|---|
| **URL** | `PUT http://localhost:5000/inventory/banks/:bank_id/:id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"quantity": 15, "expiry_date": "2025-12-31"}` |
| **Response** | `{"message": "Inventory updated successfully", "inventory": {"id": 1, "quantity": 15}}` |

#### 32. Delete Inventory Item
| | |
|---|---|
| **URL** | `DELETE http://localhost:5000/inventory/banks/:bank_id/:id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"message": "Inventory item deleted successfully"}` |

#### 33. Get Bank Inventory
| | |
|---|---|
| **URL** | `GET http://localhost:5000/inventory/banks/:bank_id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"inventory": [{"id": 1, "blood_type": "A+", "quantity": 10, "expiry_date": "..."}]}` |

---

### Requests (Bank Admin)

#### 34. Get Bank Requests (Pending)
| | |
|---|---|
| **URL** | `GET http://localhost:5000/requests/bank-requests` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"message": "Bank requests retrieved successfully", "data": [{"id": 1, "status": "SENT_TO_BANK", ...}], "count": 5}` |

#### 35. Approve Request
| | |
|---|---|
| **URL** | `PUT http://localhost:5000/requests/approve/:id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"message": "Request approved successfully", "request": {"id": 1, "status": "APPROVED", "order_number": "ORD-2024-000001"}, "inventory": {...}}` |

#### 36. Reject Request
| | |
|---|---|
| **URL** | `PUT http://localhost:5000/requests/reject/:id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>`, `Content-Type: application/json` |
| **Body** | `{"reason": "Insufficient documentation"}` |
| **Response** | `{"message": "Request rejected successfully", "request": {"id": 1, "status": "REJECTED", "rejection_reason": "..."}}` |

---

### Notifications (Bank Service)

#### 37. Get Bank Admin Notifications
| | |
|---|---|
| **URL** | `GET http://localhost:5000/notifications` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"notifications": [{"id": 1, "type": "BANK_NEW_REQUEST", "title": "...", "message": "..."}]}` |

#### 38. Get Unread Count
| | |
|---|---|
| **URL** | `GET http://localhost:5000/notifications/unread-count` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"count": 3}` |

#### 39. Get Notification by ID
| | |
|---|---|
| **URL** | `GET http://localhost:5000/notifications/:id` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"notification": {"id": 1, "type": "...", "title": "..."}}` |

#### 40. Mark as Read
| | |
|---|---|
| **URL** | `PATCH http://localhost:5000/notifications/:id/read` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"message": "Notification marked as read", "notification": {...}}` |

#### 41. Mark All as Read
| | |
|---|---|
| **URL** | `PATCH http://localhost:5000/notifications/read-all` |
| **Headers** | `Authorization: Bearer <BANK_ADMIN_TOKEN>` |
| **Response** | `{"message": "All notifications marked as read", "updated": 3}` |

---

## Complete User Flow Test Sequence

### Flow 1: User Registration → Request → Payment
```
1. POST /auth/register (User)
2. POST /auth/login (Get USER_TOKEN)
3. POST /requests/create (Create DRAFT request)
4. POST /requests/upload-documents/:id (Upload docs → CREATED)
5. GET /blood-banks (View available banks - public)
6. POST /requests/send-to-bank/:id (Send to bank → SENT_TO_BANK)
7. (Bank Admin approves → APPROVED)
8. POST /payments/create (Create payment intent → PAYMENT_PENDING)
9. POST /payments/confirm (Confirm payment → PAID)
10. GET /notifications (Check notifications)
```

### Flow 2: Super Admin Setup
```
1. POST /auth/register (with role: SUPER_ADMIN)
2. POST /auth/login (Get SUPER_ADMIN_TOKEN)
3. POST /blood-banks/create (Create bank)
4. POST /blood-banks/:bankId/admin (Create bank admin)
5. GET /users (View all users)
```

### Flow 3: Bank Admin Operations
```
1. POST /auth/login (Bank admin login → BANK_ADMIN_TOKEN)
2. GET /inventory/banks/:bank_id (View inventory)
3. POST /inventory/banks/:bank_id (Add blood type)
4. PUT /inventory/banks/:bank_id/:id (Update quantity)
5. GET /requests/bank-requests (View pending requests)
6. PUT /requests/approve/:id (Approve request)
7. GET /notifications (Check notifications)
```

---

## Status Lifecycle
```
DRAFT → CREATED → SENT_TO_BANK → APPROVED → PAYMENT_PENDING → PAID
                          ↓
                       REJECTED
```

## Notification Types
- `REQUEST_SENT_TO_BANK` - User notification
- `REQUEST_APPROVED` - User notification
- `REQUEST_REJECTED` - User notification
- `PAYMENT_SUCCESS` - User notification
- `PAYMENT_FAILED` - User notification
- `BANK_NEW_REQUEST` - Bank admin notification

---

## Error Response Format
```json
{
  "error": "Error description",
  "message": "Detailed error message"
}
```

## Success Response Format
```json
{
  "message": "Success description",
  "data": { ... }
}
```
