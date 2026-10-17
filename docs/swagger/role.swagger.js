/**
 *
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Roles retrieved successfully }
 *   post:
 *     summary: Create a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 50 }
 *     responses:
 *       201: { description: Role created successfully }
 *
 */

/**
 *
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200: { description: Role retrieved successfully }
 *   put:
 *     summary: Update a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, minLength: 2, maxLength: 50 }
 *     responses:
 *       200: { description: Role updated successfully }
 *   delete:
 *     summary: Delete a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200: { description: Role deleted successfully }
 *
 */

/**
 *
 * @swagger
 * /api/roles/{id}/permissions:
 *   put:
 *     summary: Replace role permissions
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [permissionIds]
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200: { description: Permissions updated successfully }
 */
