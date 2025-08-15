import { mainFastify } from './http/implementation/fastify/mainFastify';

async function bootstrap() {
  const http = new mainFastify();
  const app = await http.initialize();
  await app.listen({ port: 3000, host: '0.0.0.0' });
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});