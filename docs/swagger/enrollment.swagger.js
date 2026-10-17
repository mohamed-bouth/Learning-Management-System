/**
 *
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get enrollments
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *       - in: query
 *         name: course
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [active, completed, cancelled] }
 *     responses:
 *       200: { description: Enrollments retrieved successfully }
 *   post:
 *     summary: Enroll in a course
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [course]
 *             properties:
 *               course: { type: string, description: Course ID }
 *     responses:
 *       201: { description: Enrollment created successfully }
 *       400: { description: Invalid enrollment data }
 *
 */

/**
 *
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get an enrollment by ID
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Enrollment retrieved successfully }
 *       404: { description: Enrollment not found }
 *   put:
 *     summary: Update an enrollment
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learner: { type: string }
 *               course: { type: string }
 *               enrolledAt: { type: string, format: date-time }
 *               status: { type: string, enum: [active, completed, cancelled] }
 *               progress: { type: number, minimum: 0 }
 *     responses:
 *       200: { description: Enrollment updated successfully }
 *   delete:
 *     summary: Delete an enrollment
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Enrollment deleted successfully }
 */
