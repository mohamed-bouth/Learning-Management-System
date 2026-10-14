# Product Specifications: Learning Platform LMS Backend API

| Field | Detail |
| :--- | :--- |
| **Document Type** | Product Specifications (*Cahier des charges produit*) |
| **Product** | Backend API LMS |
| **Cohort / Class** | MERNiavelli - MERN 2026/2027 |
| **Campus** | YouCode Nador |
| **Framework / Context** | Simplon Maghreb / YouCode |
| **Simplon Trainer** | Mehdi LARAIBI |

> **Summary:**  
> This document describes the overall requirements for a learning platform's backend API. It serves as a reference to analyze the product, identify required features, and frame the project deliverables.

---

## 1. Context

A product team wants to build a learning platform to manage training curricula, learning resources, enrollments, learner progress, and simple assessments.

The final product must allow multiple user profiles to operate on the same system:
- **Learners** browse courses, track their progress, and take quizzes;
- **Trainers** create and organize educational content;
- **Administrators** supervise accounts, roles, and the overall integrity of the platform.

These specifications describe the functional requirements expected for the backend of the platform. Detailed technical choices will be specified in the implementation documents.

---

## 2. Product Objectives

The product must enable:
- Centralizing courses and learning paths;
- Organizing each course into ordered modules;
- Attaching educational resources to modules, including files uploaded to the platform;
- Managing users with distinct roles;
- Allowing a learner to enroll in multiple courses concurrently;
- Tracking learner progress;
- Providing simple end-of-module quizzes;
- Recording quiz attempts and calculating scores;
- Enabling trainers to monitor learner progress;
- Exposing platform data for consumption by a web frontend interface.

---

## 3. Target Audience

### 3.1 Visitor (*Visiteur*)
- Can view published courses and explore available training offerings.
- Cannot access content restricted to enrolled learners.

### 3.2 Learner (*Apprenant*)
- Holds a user account.
- Can authenticate, view available courses, enroll in a course, access authorized modules, view resources, mark progress, and take quizzes.

### 3.3 Trainer (*Formateur*)
- Holds an account with specific privileges.
- Can create and structure courses, add modules and resources, publish or unpublish courses, track enrolled learners, and provide feedback.

### 3.4 Administrator (*Administrateur*)
- Oversees the platform.
- Can manage users, roles, courses, and intervene on content whenever necessary.

---

## 4. Functional Scope

### 4.1 Course Catalog
The platform must expose a course catalog containing essential information:
- Course title;
- Short description;
- Detailed description;
- Level (difficulty / proficiency);
- Category or topic;
- Estimated duration;
- Publication status;
- Responsible trainer;
- Number of modules;
- Creation or publication date.

Users must be able to view the list of published courses and access the details of any course.

### 4.2 Course Details
Each course must have a detailed overview containing:
- Title;
- Description;
- Learning objectives;
- Prerequisites (if any);
- Level;
- Estimated duration;
- Responsible trainer;
- List of modules;
- Publication status;
- Useful enrollment information.

> Non-accessible modules may be visible as part of the overall course outline/structure, but their detailed content must be restricted to authorized enrolled learners.
>
> Progression across modules is sequential: accessing or fully completing a module can be conditioned upon the completion of the previous module.

### 4.3 Module Management
A course consists of ordered modules. Each module must contain at least:
- Title;
- Description;
- Order/sequence index within the course;
- Estimated duration;
- Status: draft (*brouillon*) or published (*publié*);
- Associated resources;
- Optional quiz.

*The order of modules is critical for learner progression.*

### 4.4 Educational Resources Management
A resource represents educational content attached to a module.

**Possible resource types:**
- Article;
- Video;
- External link;
- PDF document;
- Image or visual aid;
- Exercise;
- Code repository link;
- Course slides/handouts.

**Each resource must include:**
- Title;
- Type;
- URL, file path, or storage reference;
- Short description;
- Original filename (if uploaded);
- File size;
- Estimated duration;
- Display order within the module.

The platform must support actual file uploads for educational resources. Uploaded files must be linked to a module, accessible only by authorized users, and stored securely. Storage can be local/internal to the application or delegated to a specialized external file storage service depending on technical implementation choices.

### 4.5 Authentication
The platform must support:
- Account registration;
- Login using email and password;
- Establishing a secure session (e.g., JWT / secure session cookie);
- Viewing authenticated user profile;
- Protecting restricted areas/routes.

> [!IMPORTANT]
> Passwords must **never** be stored in plain text.

### 4.6 Roles and Permissions
Three primary roles are required:
- `learner` (*apprenant*)
- `trainer` (*formateur*)
- `admin` (*administrateur*)

**Permission rules:**
- A visitor can only view published courses.
- A learner can view published courses and content belonging to courses they are enrolled in.
- A trainer can manage their own courses.
- An administrator can supervise all users and all content.
- A user must not be able to modify a resource that does not belong to them, unless they are an administrator.

### 4.7 Course Enrollments
A learner must be able to enroll in one or more published courses.

**An enrollment record must contain:**
- Enrolled learner;
- Target course;
- Enrollment date;
- Status: active, completed, or cancelled;
- Overall calculated progress percentage.

A learner can take multiple courses in parallel. For any given course, an active enrollment must remain unique to prevent duplicate progress records, quizzes, and analytics.

### 4.8 Learner Progression
The platform must track learner progression within a course.

**Expected features:**
- Mark a resource as completed/viewed;
- Mark a module as completed according to established rules;
- Compute overall course completion percentage;
- Allow a learner to resume a course where they left off;
- Allow trainers to view the progress of enrolled learners.

> [!NOTE]
> Progress must be calculated on the backend.

### 4.9 Module Quizzes
A module may include a simple quiz.

**A quiz must contain:**
- Title;
- Short description;
- Questions;
- Answer choices;
- Correct answers stored on the backend;
- Minimum passing score (optional);
- Status: active or inactive.

Learners must be able to submit their answers. The system must compute the score and record the attempt.

> [!WARNING]
> Correct answers must **never** be exposed in routes/endpoints accessible to learners.

### 4.10 Quiz Attempts
Each attempt must record:
- Learner;
- Target quiz;
- Submitted answers;
- Obtained score;
- Submission timestamp;
- Pass/fail result based on the defined threshold.

Trainers must be able to consult learner quiz results for their courses.

### 4.11 Trainer Feedback
A trainer must be able to leave simple feedback regarding a learner's progress.

**A feedback record must contain:**
- Target learner;
- Target course;
- Authoring trainer;
- Feedback text content;
- Creation date.

Feedback must remain linked to both the course and the learner concerned.

---

## 5. Expected Business Data Models

The exact database schema is not prescribed. The following describes the business entities and attributes to consider when designing models:

### 5.1 User (*Utilisateur*)
Represents an individual interacting with the platform.
- Full name
- Unique email
- Secure hashed password
- Role (`learner`, `trainer`, `admin`)
- Account status
- Creation timestamp

### 5.2 Course (*Cours*)
Represents a published or in-preparation learning curriculum.
- Title
- Description
- Objectives
- Level
- Category
- Estimated duration
- Publication status
- Responsible trainer
- Associated modules

### 5.3 Module
Represents an ordered stage/unit in a course.
- Title
- Description
- Sequence order
- Estimated duration
- Associated course
- Associated resources
- Optional quiz

### 5.4 Resource (*Ressource*)
Represents educational material attached to a module.
- Title
- Type
- URL, file path, or storage key
- Description
- Original file name (if applicable)
- File size (if applicable)
- Estimated duration
- Associated module
- Display order

### 5.5 Enrollment (*Inscription*)
Links a learner to a course.
- Learner reference
- Course reference
- Enrollment date
- Status
- Overall progress

### 5.6 Progress (*Progression*)
Represents the advancement state of a learner on a resource or module.
- Learner reference
- Course reference
- Module reference
- Optional resource reference
- Status
- Start date
- Completion date

### 5.7 Quiz
Represents an evaluation attached to a module.
- Associated module
- Title
- Questions
- Choice options
- Correct answers
- Passing score threshold
- Status (active/inactive)

### 5.8 Quiz Attempt (*Tentative de quiz*)
Represents a learner's quiz submission.
- Learner reference
- Quiz reference
- Submitted answers
- Score
- Result (pass/fail)
- Submission date

### 5.9 Feedback
Represents trainer evaluation/feedback on learner progress.
- Trainer reference
- Learner reference
- Course reference
- Content / comment
- Creation timestamp

---

## 6. Business Rules (*Règles de gestion*)

1. A user has a single primary role.
2. An email address must be associated with only one account.
3. A course belongs to a designated responsible trainer.
4. A course can be in draft status or published.
5. Only published courses are publicly discoverable.
6. A course contains one or more modules.
7. Modules within a course are strictly ordered.
8. Module progression may be conditioned upon completing the preceding module.
9. A resource belongs to exactly one module.
10. A file resource must remain associated with the module to which it was uploaded.
11. A learner can enroll in multiple published courses simultaneously.
12. A learner cannot have two active enrollments for the same course (prevents duplicate progress, quizzes, and stats).
13. Course progress is calculated from progress across its modules and resources.
14. A quiz belongs to a single module.
15. A quiz attempt belongs to one learner and one quiz.
16. Correct answers must never be sent in API responses destined for learners.
17. A trainer can only inspect data related to their own courses, unless granted an administrator role.
18. Errors must be returned in a consistent, standardized JSON format.

---

## 7. Search, Filtering, and Sorting

The platform must allow querying and filtering courses according to multiple criteria:
- Category;
- Level;
- Publication status;
- Trainer;
- Keyword search in title or description.

Results must be sortable at least by creation date or publication date.  
Simple pagination is recommended when list responses grow large.

---

## 8. Security and Privacy

The platform must safeguard accounts, learning content, and progress records:
- Passwords must never be stored in plain text (use strong hashing such as bcrypt/argon2).
- Restricted routes must be accessible only to authenticated and authorized users.
- Role-based access control (RBAC) must strictly enforce permitted actions.
- Trainers cannot access data from courses they do not own, unless they are admins.
- Uploaded files must be validated (file type, size, sanity check) before storage.
- Private files must not be publicly accessible without proper authorization.
- Error messages must remain informative without leaking sensitive stack traces or internal configuration.

---

## 9. File Storage

The platform must handle uploaded educational resources. Files can be stored in:
- An internal storage directory within the application server;
- A dedicated specialized external storage service;
- A cloud-compatible object storage provider (e.g., S3-compatible, Cloudinary, etc.).

> The specifications do not impose a specific vendor. The storage strategy is a technical implementation decision.

---

## 10. Content & Seed Data Requirements

The platform must include a mock but realistic seed dataset:
- Multiple users with different roles (`learner`, `trainer`, `admin`);
- Several published courses;
- At least one draft course;
- Multiple modules per course;
- Multiple resource types (articles, videos, files, links);
- Realistic uploaded file resources;
- Active and past learner enrollments;
- Diverse progression states;
- Several quizzes with submitted attempts;
- Trainer feedbacks.

*Content must remain professional, plausible, and tailored to a web development learning platform.*

---

## 11. Out of Scope (*Hors périmètre*)

The following items are explicitly **not expected**:
- Full React frontend interface;
- Advanced graphical UI;
- Live video streaming service;
- Payment processing / gateways;
- Official certifications / accredited diplomas;
- Real-time instant messaging / chat;
- Email dispatching / transactional notifications;
- Video conferencing / virtual classrooms;
- Machine-learning recommendation engine;
- Advanced analytical dashboards;
- Third-party platform integrations;
- Detailed cloud infrastructure deployment;
- Detailed low-level technical architecture design.

---

## 12. Product Acceptance Criteria

The product is considered compliant and acceptable if:
- [x] A visitor can view published courses.
- [x] A user can register an account and log in.
- [x] Passwords are not stored in plain text.
- [x] A secure session / token grants access to protected areas.
- [x] User roles strictly restrict unauthorized actions.
- [x] A trainer can create and structure their courses.
- [x] A course can contain ordered modules.
- [x] A module can contain learning resources, including uploaded files.
- [x] A learner can enroll in multiple published courses.
- [x] A learner cannot create duplicate active enrollments for the same course.
- [x] A learner can access authorized module content.
- [x] Learner progression is tracked and computed backend-side.
- [x] A quiz can be submitted and evaluated backend-side.
- [x] Correct answers are never exposed to learners.
- [x] A trainer can monitor learners enrolled in their courses.
- [x] Client and user error responses are clear, meaningful, and consistent JSON.
- [x] Uploaded files are securely stored and mapped to their respective modules.
- [x] Private files are inaccessible without valid authorization.

---

## 13. Scope Clarification & Roadmap

This document outlines the high-level functional requirements of the product.  
Subsequent implementation documents and project phases will incrementally define:
- Features to deliver at each sprint/milestone;
- Detailed technical constraints;
- Required project deliverables;
- Specific evaluation and validation criteria.
