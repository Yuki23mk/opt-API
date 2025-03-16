import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OptiOil API',
      version: '1.0.0',
      description: 'OptiOilのAPIドキュメント',
    },
  },
  apis: [path.resolve(process.cwd(), 'pages/api/**/*.js')],  // ← ここが重要！
};

const swaggerSpec = swaggerJsdoc(options);

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
}
