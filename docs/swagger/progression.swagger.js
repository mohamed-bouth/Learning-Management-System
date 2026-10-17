/**
 * @swagger
 * /api/progressions/{id}/complete:
 *   patch:
 *     summary: Mark a progression as complete
 *     tags:
 *       - Progressions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200: { description: Progression completed successfully }
 *       400: { description: Invalid progression ID }
 *       404: { description: Progression not found }
 */
