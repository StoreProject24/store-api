/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Listar subcategorías
 *     description: Obtiene todas las subcategorías disponibles con paginación
 *     tags:
 *       - Subcategories
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
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de categoría padre
 *     responses:
 *       200:
 *         description: Lista de subcategorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subcategory'
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
 *     summary: Crear nueva subcategoría
 *     description: Crea una nueva subcategoría dentro de una categoría existente
 *     tags:
 *       - Subcategories
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
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptops Gaming"
 *               description:
 *                 type: string
 *                 example: "Laptops de alto rendimiento para gaming"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://s3.amazonaws.com/bucket/subcategory.jpg"
 *     responses:
 *       201:
 *         description: Subcategoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     subcategory:
 *                       $ref: '#/components/schemas/Subcategory'
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Categoría padre no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/subcategories/{subcategoryId}:
 *   get:
 *     summary: Obtener subcategoría por ID
 *     description: Obtiene los detalles de una subcategoría específica
 *     tags:
 *       - Subcategories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Subcategory'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Subcategoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     summary: Actualizar subcategoría
 *     description: Actualiza la información de una subcategoría existente
 *     tags:
 *       - Subcategories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la subcategoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptops Gaming Pro"
 *               description:
 *                 type: string
 *                 example: "Laptops de gama alta para gaming profesional"
 *     responses:
 *       200:
 *         description: Subcategoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     subcategory:
 *                       $ref: '#/components/schemas/Subcategory'
 *                 status:
 *                   type: number
 *                   example: 200
 *       404:
 *         description: Subcategoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Eliminar subcategoría
 *     description: Elimina una subcategoría (soft delete)
 *     tags:
 *       - Subcategories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría eliminada exitosamente
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
 *         description: Subcategoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
