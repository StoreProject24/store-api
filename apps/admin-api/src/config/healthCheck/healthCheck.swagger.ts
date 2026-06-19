/**
 * @swagger
 * /healthCheck:
 *   get:
 *     summary: Verificar salud de la API
 *     description: Endpoint para monitorear el estado de la API y sus dependencias (MongoDB, etc)
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API en estado saludable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [healthy, degraded, unhealthy]
 *                       example: "healthy"
 *                     uptime:
 *                       type: number
 *                       description: Tiempo en segundos que lleva corriendo el servidor
 *                       example: 125.456
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-06-18T12:34:56.789Z"
 *                     services:
 *                       type: object
 *                       properties:
 *                         mongodb:
 *                           type: boolean
 *                           description: Estado de conexión a MongoDB
 *                           example: true
 *                 status:
 *                   type: number
 *                   example: 200
 *       503:
 *         description: API degradada o no disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [healthy, degraded, unhealthy]
 *                       example: "degraded"
 *                     uptime:
 *                       type: number
 *                       example: 45.123
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-06-18T12:34:56.789Z"
 *                     services:
 *                       type: object
 *                       properties:
 *                         mongodb:
 *                           type: boolean
 *                           description: Estado de conexión a MongoDB
 *                           example: false
 *                 status:
 *                   type: number
 *                   example: 503
 */
