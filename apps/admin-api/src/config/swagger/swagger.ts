import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Store API - Admin',
      version: '1.0.0',
      description: 'API para administración de tiendas, productos y usuarios',
      contact: {
        name: 'API Support',
        email: 'support@store-api.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'https://api.store.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token from /api/auth/login',
        },
      },
      schemas: {
        AuthTokenResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              description: 'JWT access token (expires in 2 hours)',
            },
            refreshToken: {
              type: 'string',
              description: 'Refresh token (expires in 1 day)',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            rol: {
              type: 'string',
              enum: ['ADMIN', 'USER', 'ADMINSTORE'],
              example: 'USER',
            },
            statusId: {
              type: 'number',
              example: 1,
            },
            storeId: {
              type: 'number',
              example: 1,
              nullable: true,
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Laptop',
            },
            price: {
              type: 'number',
              format: 'float',
              example: 999.99,
            },
            description: {
              type: 'string',
              example: 'High-performance laptop',
            },
            storeId: {
              type: 'number',
              example: 1,
            },
            categoryId: {
              type: 'number',
              example: 1,
            },
            status: {
              type: 'number',
              example: 1,
            },
          },
        },
        Store: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Electronics Store',
            },
            description: {
              type: 'string',
              example: 'Premium electronics',
            },
            userId: {
              type: 'number',
              example: 1,
            },
            statusId: {
              type: 'number',
              example: 1,
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Electrónica',
            },
            description: {
              type: 'string',
              example: 'Productos de electrónica y gadgets',
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://s3.amazonaws.com/bucket/category.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Brand: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Samsung',
            },
            description: {
              type: 'string',
              example: 'Marca líder en electrónica',
            },
            logoUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://s3.amazonaws.com/bucket/samsung-logo.png',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Sale: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            storeId: {
              type: 'number',
              example: 1,
            },
            customerName: {
              type: 'string',
              example: 'Juan García',
            },
            customerEmail: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com',
            },
            customerPhone: {
              type: 'string',
              example: '+34 612345678',
            },
            shippingAddress: {
              type: 'string',
              example: 'Calle Principal 123, Madrid',
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled'],
              example: 'completed',
            },
            totalAmount: {
              type: 'number',
              format: 'float',
              example: 199.98,
            },
            notes: {
              type: 'string',
              example: 'Envío express',
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'number',
                  },
                  quantity: {
                    type: 'number',
                  },
                  price: {
                    type: 'number',
                    format: 'float',
                  },
                },
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Setting: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            storeId: {
              type: 'number',
              example: 1,
            },
            key: {
              type: 'string',
              example: 'store_currency',
            },
            value: {
              type: 'string',
              example: 'EUR',
            },
            description: {
              type: 'string',
              example: 'Moneda de la tienda',
            },
            type: {
              type: 'string',
              enum: ['string', 'number', 'boolean', 'json'],
              example: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Subcategory: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Laptops Gaming',
            },
            description: {
              type: 'string',
              example: 'Laptops de alto rendimiento para gaming',
            },
            categoryId: {
              type: 'number',
              example: 1,
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              example: 'https://s3.amazonaws.com/bucket/subcategory.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        StatsOverview: {
          type: 'object',
          properties: {
            totalSales: {
              type: 'number',
              example: 150,
            },
            totalRevenue: {
              type: 'number',
              format: 'float',
              example: 15000.50,
            },
            totalProducts: {
              type: 'number',
              example: 45,
            },
            activeProducts: {
              type: 'number',
              example: 40,
            },
            totalCustomers: {
              type: 'number',
              example: 230,
            },
            newCustomers: {
              type: 'number',
              example: 25,
            },
            averageOrderValue: {
              type: 'number',
              format: 'float',
              example: 100.00,
            },
          },
        },
        SalesStats: {
          type: 'object',
          properties: {
            period: {
              type: 'string',
              enum: ['day', 'week', 'month', 'year'],
            },
            totalSales: {
              type: 'number',
            },
            totalRevenue: {
              type: 'number',
              format: 'float',
            },
            chartData: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    format: 'date',
                  },
                  sales: {
                    type: 'number',
                  },
                  revenue: {
                    type: 'number',
                    format: 'float',
                  },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Invalid credentials',
            },
            status: {
              type: 'number',
              example: 401,
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    './src/modules/*/docs/*.swagger.ts',
    './src/config/healthCheck/healthCheck.swagger.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
