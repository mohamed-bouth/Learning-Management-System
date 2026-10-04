/**
 * @swagger
 * /api/modules/{moduleId}/resources:
 *   get:
 *     summary: Get all resources of a module
 *     tags:
 *       - Modules
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
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
 *         description: Number of resources per page
 *
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */