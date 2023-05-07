const routes=require('./routes');
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV!=='production'?'localhost':'0.0.0.0',
    routes: {
      cors: {
        origin:['*'],
        // origin: ['http://notesapp-v1.dicodingacademy.com'],
        // headers: ['Content-Type', 'Authorization'],
        // additionalHeaders: ['X-Requested-With'],
        // credentials: true
      },
    },
  });
 
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 init();