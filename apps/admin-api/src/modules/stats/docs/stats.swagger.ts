/**
 * @swagger
 * /api/stats/overview:
 *   get:
 *     summary: Obtener resumen de estadísticas
 *     description: Obtiene un resumen general de estadísticas de la tienda (ventas, productos, clientes)
 *     tags:
 *       - Stats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Período de estadísticas
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/StatsOverview'
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
 * /api/stats/sales:
 *   get:
 *     summary: Obtener estadísticas de ventas
 *     description: Obtiene análisis detallado de ventas, ingresos y tendencias
 *     tags:
 *       - Stats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Período de análisis
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final (YYYY-MM-DD)
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *           default: day
 *         description: Agrupar resultados por período
 *     responses:
 *       200:
 *         description: Estadísticas de ventas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/SalesStats'
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/stats/products:
 *   get:
 *     summary: Obtener estadísticas de productos
 *     description: Obtiene análisis de productos más vendidos, stock, etc.
 *     tags:
 *       - Stats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de productos a mostrar
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [sales, revenue, stock]
 *           default: sales
 *         description: Ordenar por criterio
 *     responses:
 *       200:
 *         description: Estadísticas de productos obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     topProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           name:
 *                             type: string
 *                           sales:
 *                             type: number
 *                           revenue:
 *                             type: number
 *                             format: float
 *                           stock:
 *                             type: number
 *                     lowStockProducts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/stats/customers:
 *   get:
 *     summary: Obtener estadísticas de clientes
 *     description: Obtiene análisis de clientes, compras, y tendencias
 *     tags:
 *       - Stats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Período de análisis
 *     responses:
 *       200:
 *         description: Estadísticas de clientes obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCustomers:
 *                       type: number
 *                     newCustomers:
 *                       type: number
 *                     repeatCustomers:
 *                       type: number
 *                     averageOrderValue:
 *                       type: number
 *                       format: float
 *                     customerRetentionRate:
 *                       type: number
 *                       format: float
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /api/stats/daily:
 *   get:
 *     summary: Obtener estadísticas diarias
 *     description: Obtiene estadísticas agregadas diariamente (datos para gráficos)
 *     tags:
 *       - Stats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Cantidad de días a mostrar
 *     responses:
 *       200:
 *         description: Estadísticas diarias obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       sales:
 *                         type: number
 *                       revenue:
 *                         type: number
 *                         format: float
 *                       customers:
 *                         type: number
 *                       orders:
 *                         type: number
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
