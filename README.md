# Appointment Scheduling API (Node.js)
A Node.js backend snippet that demonstrates real-world appointment scheduling logic with MongoDB for a healthcare-style system. It includes Redis caching to improved database performance, input validation, and conflict detection.

# Data Model
The Appointment model represents scheduled visits between patients and doctors.
It includes indexed fields to support efficient conflict detection and querying
as appointment volume grows.

# Key Features
- Prevents overlapping appointments using time-range conflict detection.
- Validates input and handles common error cases.
- Uses Redis to cache frequently accessed schedules.
- Structured for maintainability and clarity.

# Why I'm Proud of This Code
This code reflects how I approach real production problems. It focuses on
correctness, performance, and readability rather than just making something work.
The conflict detection logic and cache invalidation mirror real-world backend
challenges I’ve encountered in scalable systems.

