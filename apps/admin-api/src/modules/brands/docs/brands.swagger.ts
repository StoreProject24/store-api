/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Listar marcas
 *     description: Obtiene todas las marcas disponibles
 *     tags:
 *       - Brands
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre de marca
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
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
 *     summary: Crear nueva marca
 *     description: Crea una nueva marca de productos
 *     tags:
 *       - Brands
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
 *                 example: "Samsung"
 *               description:
 *                 type: string
 *                 example: "Marca líder en electrónica"
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://s3.amazonaws.com/bucket/samsung-logo.png"
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     brand:
 *                       $ref: '#/components/schemas/Brand'
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: La marca ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/brands/{brandId}:
 *   get:
 *     summary: Obtener marca por ID
 *     description: Obtiene los detalles de una marca específica
 *     tags:
 *       - Brands
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Marca no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Actualizar marca
 *     description: Actualiza la información de una marca existente
 *     tags:
 *       - Brands
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samsung Electronics"
 *               description:
 *                 type: string
 *                 example: "Marca global líder en tecnología"
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     brand:
 *                       $ref: '#/components/schemas/Brand'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Marca no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Eliminar marca
 *     description: Elimina una marca (soft delete)
 *     tags:
 *       - Brands
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
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
 *         description: Marca no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
