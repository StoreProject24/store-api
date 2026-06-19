/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Listar ventas
 *     description: Obtiene todas las ventas de la tienda del usuario autenticado con paginación y filtros
 *     tags:
 *       - Sales
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
 *       - in: query
 *         name: statusId
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6]
 *         description: Filtrar por estado de la venta
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial para filtro (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final para filtro (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sale'
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
 *     summary: Crear nueva venta
 *     description: Registra una nueva venta con productos
 *     tags:
 *       - Sales
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - customerName
 *               - customerEmail
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "Juan García"
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               customerPhone:
 *                 type: string
 *                 example: "+34 612345678"
 *               shippingAddress:
 *                 type: string
 *                 example: "Calle Principal 123, Madrid"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - price
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 99.99
 *               notes:
 *                 type: string
 *                 example: "Envío express"
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     sale:
 *                       $ref: '#/components/schemas/Sale'
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
 * /api/sales/{saleId}:
 *   get:
 *     summary: Obtener venta por ID
 *     description: Obtiene los detalles de una venta específica incluyendo productos
 *     tags:
 *       - Sales
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Sale'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Actualizar venta
 *     description: Actualiza la información de una venta existente
 *     tags:
 *       - Sales
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *                 example: "completed"
 *               shippingAddress:
 *                 type: string
 *                 example: "Calle Principal 456, Barcelona"
 *               notes:
 *                 type: string
 *                 example: "Enviado por correo certificado"
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     sale:
 *                       $ref: '#/components/schemas/Sale'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Cancelar venta
 *     description: Cancela una venta existente
 *     tags:
 *       - Sales
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta cancelada exitosamente
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
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
