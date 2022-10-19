Iniciar en modo fork
npm run start -fork -- --port=8083

Iniciar en modo cluster
npm run start -cluster -- --port=8083

Default (modo fork, puerto 8080)
npm run start

Iniciar en modo --prof para pruebas de rendimiento
npm run prof

Iniciar con 0x para obtener diagramas de flama
npm run start
Luego para ejecutar las pruebas con Autocannon (en otra terminal)
npm run test

Iniciar en modo inspect para pruebas de rendimiento con DevTools
npm run inspect