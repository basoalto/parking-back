import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors eliminado para evitar conflicto con el middleware manual de CORS
  // Permitir explícitamente OPTIONS para todas las rutas
  app.use((req, res, next) => {
    console.log(`[CORS Middleware] ${req.method} ${req.originalUrl}`);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept, Origin, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();