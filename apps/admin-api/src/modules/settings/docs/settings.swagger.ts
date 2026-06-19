/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Obtener configuraciones
 *     description: Obtiene todas las configuraciones de la tienda del usuario autenticado
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Configuraciones obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Setting'
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
 *   post:
 *     summary: Crear configuración
 *     description: Crea una nueva configuración para la tienda
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *                 example: "store_currency"
 *               value:
 *                 type: string
 *                 example: "EUR"
 *               description:
 *                 type: string
 *                 example: "Moneda de la tienda"
 *               type:
 *                 type: string
 *                 enum: [string, number, boolean, json]
 *                 example: "string"
 *     responses:
 *       201:
 *         description: Configuración creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     setting:
 *                       $ref: '#/components/schemas/Setting'
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/settings/{settingId}:
 *   get:
 *     summary: Obtener configuración por ID
 *     description: Obtiene los detalles de una configuración específica
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Setting'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Actualizar configuración
 *     description: Actualiza el valor de una configuración existente
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 example: "USD"
 *               description:
 *                 type: string
 *                 example: "Dólares estadounidenses"
 *     responses:
 *       200:
 *         description: Configuración actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     setting:
 *                       $ref: '#/components/schemas/Setting'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Eliminar configuración
 *     description: Elimina una configuración existente
 *     tags:
 *       - Settings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: settingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Configuración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
