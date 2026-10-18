# Load Shedding & Power Management API

## Overview

- Base path: `/api/v1`
- Total distinct method/path endpoints: **62**
- Authentication: protected endpoints accept an access token from the `accessToken` cookie or an `Authorization` header.
- Access labels: `Public`, `Customer only`, `Technician only`, `Admin only`, or the listed role combination.

## 1. Auth APIs

1. `POST /api/v1/auth/register` - Create a new user account. **Public**
2. `POST /api/v1/auth/verify-email` - Verify a user's email address. **Public**
3. `POST /api/v1/auth/resend-otp` - Resend the email verification OTP. **Public**
4. `POST /api/v1/auth/resen-otp` - Legacy typo alias for resending the email verification OTP. **Public**
5. `POST /api/v1/auth/login` - Log in a user and issue authentication tokens. **Public**
6. `POST /api/v1/auth/refresh-token` - Refresh the user's access token. **Public**
7. `POST /api/v1/auth/google-login` - Log in or register through Google authentication. **Public**
8. `POST /api/v1/auth/logout` - Log the authenticated user out and clear the session. **Public**
9. `PATCH /api/v1/auth/update-profile` - Update the authenticated user's profile information and profile image. **Admin, Customer, or Technician**
10. `GET /api/v1/auth/get-me` - Get the authenticated user's profile. **Admin, Customer, or Technician**
11. `GET /api/v1/auth/technician-count` - Get the total number of technicians. **Public**
12. `POST /api/v1/auth/forgot-password-otp` - Send a password-reset OTP to the user email. **Public**
13. `POST /api/v1/auth/verify-password-otp` - Verify the password-reset OTP. **Public**
14. `PATCH /api/v1/auth/reset-password` - Reset the authenticated or valid user password using the verified OTP. **Public**

## 15. Technician Profile APIs

15. `PATCH /api/v1/technician` - Update the authenticated technician's profile and resume. **Technician only**
16. `PATCH /api/v1/technician/update-status` - Approve or update a technician profile's verification status. **Admin only**

## 17. Zone APIs

17. `POST /api/v1/zone` - Create a distribution zone with an optional zone image. **Admin only**
18. `PATCH /api/v1/zone/:zoneId` - Update a distribution zone and optionally replace its image. **Admin only**
19. `GET /api/v1/zone` - Get all distribution zones. **Public**
20. `GET /api/v1/zone/:zoneId` - Get details of a specific distribution zone. **Public**

## 21. Substation APIs

21. `POST /api/v1/substation` - Create a distribution substation. **Admin only**
22. `PATCH /api/v1/substation/:substationId` - Update a distribution substation. **Admin only**
23. `GET /api/v1/substation` - Get all substations. **Public**
24. `GET /api/v1/substation/:substationId` - Get details of a specific substation. **Public**

## 25. Feeder APIs

25. `POST /api/v1/feeder` - Create a distribution feeder. **Admin only**
26. `PATCH /api/v1/feeder/:feederId` - Update a distribution feeder. **Admin only**
27. `GET /api/v1/feeder` - Get all feeders. **Public**
28. `GET /api/v1/feeder/:feederId` - Get details of a specific feeder. **Public**

## 29. Area APIs

29. `POST /api/v1/area` - Create a distribution area. **Admin only**
30. `PATCH /api/v1/area/:areaId` - Update a distribution area. **Admin only**
31. `GET /api/v1/area` - Get all distribution areas. **Public**
32. `GET /api/v1/area/:areaId` - Get details of a specific area. **Admin, Customer, or Technician**

## 33. Unexpected Outage APIs

33. `POST /api/v1/outage` - Report an unexpected power outage. **Customer only**
34. `GET /api/v1/outage` - Get all reported outages for administrative management. **Admin only**
35. `GET /api/v1/outage/counts` - Get outage counts grouped by status. **Public**
36. `GET /api/v1/outage/my-outage` - Get outages reported by the authenticated customer. **Customer only**
37. `GET /api/v1/outage/my-assigned-outages` - Get non-deleted outages assigned to the authenticated technician. **Technician only**
38. `GET /api/v1/outage/:outageId` - Get outage details. **Admin or Customer**
39. `PATCH /api/v1/outage/:outageId` - Update reported outage details. Status cannot be changed here. **Customer only**
40. `PATCH /api/v1/outage/:outageId/assign-technician` - Assign a technician to a reported outage. **Admin only**
41. `PATCH /api/v1/outage/:outageId/status` - Update an outage's status according to the workflow. **Admin or Technician**
42. `DELETE /api/v1/outage/:outageId` - Delete an outage. **Admin, Customer, or Technician**

## 43. Load Shedding APIs

43. `POST /api/v1/load-shedding` - Create a load-shedding schedule. **Admin only**
44. `GET /api/v1/load-shedding` - Get all load-shedding schedules. **Public**
45. `GET /api/v1/load-shedding/:loadsheddingId` - Get details of a load-shedding schedule. **Admin, Customer, or Technician**
46. `PATCH /api/v1/load-shedding/:loadsheddingId` - Update a load-shedding schedule. **Admin only**

## 47. Payment APIs

47. `POST /api/v1/payment/create` - Create a payment for the authenticated customer. **Customer only**
48. `POST /api/v1/payment/confirm` - Confirm and verify an SSLCommerz payment; redirects to the configured result page. **Public**
49. `GET /api/v1/payment/invoice/:transId/download` - Download a PDF invoice for the authenticated customer's completed payment. **Customer only**
50. `GET /api/v1/payment` - Get the authenticated customer's payment history. **Customer only**
51. `GET /api/v1/payment/:paymentId` - Get payment details. **Admin or Customer**

Successful invoice downloads return `application/pdf` as an attachment named `invoice-<transId>.pdf`. The payment must be completed and belong to the authenticated customer. A PDF invoice is also emailed after successful payment verification.

## 52. Planned Outage APIs

52. `POST /api/v1/planned-outage` - Create a planned outage schedule. **Admin only**
53. `GET /api/v1/planned-outage` - Get all planned outage schedules. **Public**
54. `GET /api/v1/planned-outage/:plannedOutageId` - Get details of a planned outage. **Admin or Customer**
55. `PATCH /api/v1/planned-outage/:plannedOutageId` - Update a planned outage schedule. **Admin only**

## 56. Admin APIs

56. `GET /api/v1/admin/users` - Get users with search and filtering for administration. **Admin only**
57. `PATCH /api/v1/admin/users/:userId` - Update a user's status, such as banning or unbanning the user. **Admin only**
58. `GET /api/v1/admin/technician` - Get technician users for management and outage assignment. **Admin only**
59. `GET /api/v1/admin/payment-record` - Get payment records with search and pagination for administration. **Admin only**

## 60. Analytics APIs

60. `GET /api/v1/analytics/customer-analytics` - Get outage and payment analytics for the authenticated customer. **Customer only**
61. `GET /api/v1/analytics/technician-analytics` - Get outage assignment and status analytics for the authenticated technician. **Technician only**
62. `GET /api/v1/analytics/admin-analytics` - Get platform-wide user, outage, payment, load-shedding, and planned-outage analytics. **Admin only**

All analytics endpoints return a standard success response with the report in the `data` property.

### Customer analytics data

- `totalReportedOutages` - Total non-deleted outages reported by the customer.
- `highPriorityOutages` - Total non-deleted high-priority outages reported by the customer.
- `restoredOutages` - Total non-deleted outages reported by the customer that have been restored.
- `totalSpent` - Total completed payment amount for the customer.
- `outageStatus` - Outage counts grouped by status.

### Technician analytics data

- `totalAssignedOutages` - Total non-deleted outages assigned to the technician.
- `activeOutages` - Assigned or in-progress outages assigned to the technician.
- `restoredOutages` - Restored outages assigned to the technician.
- `highPriorityOutages` - High-priority outages assigned to the technician.
- `outageStatus` - Outage counts grouped by status.

### Admin analytics data

- `totalUsers` - Total number of users.
- `totalTechnicians` - Total number of technician users.
- `totalReportedOutages` - Total non-deleted outages.
- `activeOutages` - Non-deleted outages with reported, acknowledged, assigned, or in-progress status.
- `restoredOutages` - Total non-deleted restored outages.
- `totalRevenue` - Total completed payment amount.
- `totalLoadSheddingSchedules` - Total load-shedding schedules.
- `totalPlannedOutages` - Total planned outages.
- `outageStatus` - Outage counts grouped by status.
- `userStatus` - User counts grouped by status.

## Count Summary

| Module | Endpoint count |
| --- | ---: |
| Auth | 14 |
| Technician Profile | 2 |
| Zone | 4 |
| Substation | 4 |
| Feeder | 4 |
| Area | 4 |
| Unexpected Outage | 10 |
| Load Shedding | 4 |
| Payment | 5 |
| Planned Outage | 4 |
| Admin | 4 |
| Analytics | 3 |
| **Total** | **62** |

## Notes

- This document describes the routes currently registered in the source code, including endpoints whose business logic may still be incomplete.