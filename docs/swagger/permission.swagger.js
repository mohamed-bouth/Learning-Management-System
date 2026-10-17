/**
 *
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags:
 *       - Permissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Permissions retrieved successfully }
 *       401: { description: Authentication required }
 *
 */

/**
 *
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags:
 *       - Permissions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200: { description: Permission retrieved successfully }
 *       400: { description: Invalid permission ID }
 *       404: { description: Permission not found }
 */
