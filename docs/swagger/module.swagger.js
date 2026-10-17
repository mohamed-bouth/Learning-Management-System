/**
 *
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get modules
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Modules retrieved successfully }
 *   post:
 *     summary: Create a module
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [course, title, description, estimatedDuration]
 *             properties:
 *               course: { type: string }
 *               title: { type: string, minLength: 3, maxLength: 256 }
 *               description: { type: string, minLength: 3, maxLength: 256 }
 *               estimatedDuration: { type: number, minimum: 0 }
 *     responses:
 *       201: { description: Module created successfully }
 *       400: { description: Invalid module data }
 *
 */

/**
 *
 * @swagger
 * /api/modules/course/{id}:
 *   get:
 *     summary: Get modules by course
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Modules retrieved successfully }
 *
 */

/**
 *
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course: { type: string }
 *               title: { type: string }
 *               description: { type: string }
 *               estimatedDuration: { type: number }
 *               order: { type: integer, minimum: 1 }
 *     responses:
 *       200: { description: Module updated successfully }
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Module deleted successfully }
 *
 */

/**
 *
 * @swagger
 * /api/modules/reorder:
 *   patch:
 *     summary: Reorder modules
 *     tags: [Modules]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [modules]
 *             properties:
 *               modules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, order]
 *                   properties:
 *                     id: { type: string }
 *                     order: { type: integer, minimum: 1 }
 *     responses:
 *       200: { description: Modules reordered successfully }
 *
 */
