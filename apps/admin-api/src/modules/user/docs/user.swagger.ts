/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     description: Obtiene la información del perfil del usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado - token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/user/update-profile:
 *   put:
 *     summary: Actualizar perfil de usuario
 *     description: Actualiza la información del perfil del usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan García Updated"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juanupdated@example.com"
 *               phone:
 *                 type: string
 *                 example: "+34 612345678"
 *               bio:
 *                 type: string
 *                 example: "Empresario y emprendedor"
 *               profileImage:
 *                 type: string
 *                 format: uri
 *                 example: "https://s3.amazonaws.com/bucket/profile.jpg"
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/user/change-password:
 *   post:
 *     summary: Cambiar contraseña
 *     description: Cambia la contraseña del usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: "old_password_123"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "new_secure_password_456"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "new_secure_password_456"
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Password changed successfully"
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Contraseña actual incorrecta o contraseñas no coinciden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/user/stores:
 *   get:
 *     summary: Obtener tiendas del usuario
 *     description: Obtiene todas las tiendas asociadas al usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tiendas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado - token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/user/avatar:
 *   post:
 *     summary: Subir avatar de usuario
 *     description: Carga un avatar (imagen de perfil) para el usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen (JPG, PNG)
 *     responses:
 *       200:
 *         description: Avatar subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     avatarUrl:
 *                       type: string
 *                       format: uri
 *                       example: "https://s3.amazonaws.com/bucket/avatar.jpg"
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Archivo inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/user/deactivate:
 *   post:
 *     summary: Desactivar cuenta
 *     description: Desactiva la cuenta del usuario autenticado (requiere confirmación de contraseña)
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password_123"
 *               reason:
 *                 type: string
 *                 example: "No longer need the service"
 *     responses:
 *       200:
 *         description: Cuenta desactivada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Account deactivated successfully"
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: Contraseña incorrecta o no autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
