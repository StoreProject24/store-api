/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Listar tiendas
 *     description: Obtiene todas las tiendas del usuario autenticado
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de tiendas obtenida exitosamente
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
 *   post:
 *     summary: Crear nueva tienda
 *     description: Crea una nueva tienda para el usuario autenticado
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mi Tienda Premium"
 *               description:
 *                 type: string
 *                 example: "Tienda de productos premium"
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://s3.amazonaws.com/bucket/logo.png"
 *               bannerUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://s3.amazonaws.com/bucket/banner.jpg"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "contact@tienda.com"
 *               contactPhone:
 *                 type: string
 *                 example: "+34 612345678"
 *               address:
 *                 type: string
 *                 example: "Calle Principal 123, Madrid"
 *     responses:
 *       201:
 *         description: Tienda creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     store:
 *                       $ref: '#/components/schemas/Store'
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
 * /api/stores/{storeId}:
 *   get:
 *     summary: Obtener tienda por ID
 *     description: Obtiene los detalles de una tienda específica
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tienda
 *     responses:
 *       200:
 *         description: Tienda obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Tienda no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Actualizar tienda
 *     description: Actualiza la información de una tienda existente
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tienda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mi Tienda Premium Plus"
 *               description:
 *                 type: string
 *                 example: "Tienda de productos premium y exclusivos"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: "newemail@tienda.com"
 *               address:
 *                 type: string
 *                 example: "Calle Nueva 456, Barcelona"
 *     responses:
 *       200:
 *         description: Tienda actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     store:
 *                       $ref: '#/components/schemas/Store'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Tienda no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Deshabilitar/Habilitar tienda
 *     description: Cambia el estado de la tienda (activa/inactiva)
 *     tags:
 *       - Stores
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tienda
 *     responses:
 *       200:
 *         description: Estado de tienda cambiado exitosamente
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
 *         description: Tienda no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
