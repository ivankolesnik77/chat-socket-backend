'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const platform_socket_io_1 = require('@nestjs/platform-socket.io');
const swagger_1 = require('@nestjs/swagger');
const express = require('express');
const path_1 = require('path');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  app.enableCors({ origin: process.env.CLIENT_DOMAIN });
  app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
  app.use(
    '/uploads',
    express.static((0, path_1.join)(__dirname, '..', 'uploads')),
  );
  const config = new swagger_1.DocumentBuilder()
    .setTitle('Netflix')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('messages')
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3001;
  await app
    .listen(port)
    .then(() => console.log(`Server is running on ${port}!`));
}
bootstrap();
//# sourceMappingURL=main.js.map
