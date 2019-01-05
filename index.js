import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

/**
 * Initialize and start an HTTP server
 */
function init() {
  // Start the tubo server
  app.listen(
    PORT, () => console.log(`Listening on ${PORT}`)
  );
}

try {
  init();
} catch(error) {
  console.log(`Error `, error);
}
