/**
 *
 * @swagger
 * /api/profiles/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Profile retrieved successfully }
 *       401: { description: Authentication required }
 *
 */

/**
 *
 * @swagger
 * /api/profiles/me/name:
 *   patch:
 *     summary: Update the current user's name
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, minLength: 3, maxLength: 48 }
 *     responses:
 *       200: { description: Name updated successfully }
 *       400: { description: Invalid name }
 *
 */

/**
 *
 * @swagger
 * /api/profiles/me/email:
 *   patch:
 *     summary: Update the current user's email
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Email updated successfully }
 *       400: { description: Invalid email }
 *
 */

/**
 *
 * @swagger
 * /api/profiles/me/password:
 *   post:
 *     summary: Change the current user's password
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword, newPasswordConfirmation]
 *             properties:
 *               oldPassword: { type: string, format: password }
 *               newPassword: { type: string, format: password }
 *               newPasswordConfirmation: { type: string, format: password }
 *     responses:
 *       200: { description: Password updated successfully }
 *       400: { description: Invalid password data }
 *
 */

/**
 *
 * @swagger
 * /api/profiles/me/image:
 *   patch:
 *     summary: Update the current user's profile image
 *     tags: [Profiles]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [profileImage]
 *             properties:
 *               profileImage: { type: string, format: binary }
 *     responses:
 *       200: { description: Profile image updated successfully }
 *       400: { description: Invalid image file }
 */
