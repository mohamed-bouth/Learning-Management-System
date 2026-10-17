/**
 *
 * @swagger
 * /api/modules/{id}/resources:
 *   get:
 *     summary: Get all resources of a module
 *     tags:
 *       - Resources
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200: { description: Resources retrieved successfully }
 *       404: { description: Module not found }
 *
 */

/**
 *
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get resources
 *     tags: [Resources]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Resources retrieved successfully }
 *   post:
 *     summary: Create a resource
 *     tags: [Resources]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [module, title, description, type, estimatedDuration, displayOrder]
 *             properties:
 *               module: { type: string }
 *               title: { type: string }
 *               description: { type: string }
 *               type: { type: string, enum: [article, video, externalLink, pdf, image, exercise, codeRepository, courseMaterial] }
 *               estimatedDuration: { type: string }
 *               displayOrder: { type: integer, minimum: 1 }
 *               url: { type: string }
 *               file: { type: string, format: binary }
 *     responses:
 *       201: { description: Resource created successfully }
 *
 */

/**
 *
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Get a resource
 *     tags: [Resources]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Resource retrieved successfully }
 *   put:
 *     summary: Update a resource
 *     tags: [Resources]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               type: { type: string }
 *               file: { type: string, format: binary }
 *     responses:
 *       200: { description: Resource updated successfully }
 *   delete:
 *     summary: Delete a resource
 *     tags: [Resources]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ $ref: '#/components/parameters/Id' }]
 *     responses:
 *       200: { description: Resource deleted successfully }
 */
