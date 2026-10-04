/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of courses per page
 *
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter courses by category name
 *         example: "JavaScript"
 *
 *       - in: query
 *         name: level
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - easy
 *             - normal
 *             - hard
 *         description: Filter courses by difficulty level
 *         example: "normal"
 *
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Search courses by title or description
 *         example: "javascript"
 *
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - createdAt
 *             - publicationDate
 *         description: Sort courses by creation or publication date
 *         example: "createdAt"
 * 
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *         description: Sort courses by Asc or Desc
 *         example: "asc"
 *
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *       500:
 *         description: Internal server error
 */

 /**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: "68d123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

 /**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - title
 *               - description
 *               - level
 *               - objective
 *             properties:
 *               category:
 *                 type: string
 *                 description: Category ID
 *                 example: "68d123456789abcdef123456"
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 256
 *                 example: "Learn JavaScript"
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 256
 *                 example: "Learn JavaScript from beginner to advanced"
 *               level:
 *                 type: string
 *                 enum:
 *                   - easy
 *                   - normal
 *                   - hard
 *                 example: "normal"
 *               objective:
 *                 type: string
 *                 minLength: 16
 *                 example: "Understand JavaScript fundamentals and advanced concepts"
 *               estimatedDuration:
 *                 type: number
 *                 example: 20
 *               publicationStatus:
 *                 type: string
 *                 enum:
 *                   - draft
 *                   - unpublished
 *                   - published
 *                 default: draft
 *                 example: "draft"
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid course data
 *       500:
 *         description: Internal server error
 */

 /**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: "68d123456789abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "68d123456789abcdef123456"
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 256
 *                 example: "Advanced JavaScript"
 *               description:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 256
 *                 example: "Advanced JavaScript concepts"
 *               level:
 *                 type: string
 *                 enum:
 *                   - easy
 *                   - normal
 *                   - hard
 *                 example: "hard"
 *               objective:
 *                 type: string
 *                 minLength: 16
 *                 example: "Master advanced JavaScript concepts and patterns"
 *               estimatedDuration:
 *                 type: number
 *                 example: 30
 *               publicationStatus:
 *                 type: string
 *                 enum:
 *                   - draft
 *                   - unpublished
 *                   - published
 *                 example: "published"
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Invalid course data
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

 /**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: "68d123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

 /**
 * @swagger
 * /api/courses/{courseId}/modules:
 *   get:
 *     summary: Get all modules of a course
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *         example: "68d123456789abcdef123456"
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of modules per page
 *
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */