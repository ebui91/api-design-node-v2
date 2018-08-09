import express from 'express'
import setupMiddware from './middleware'
import { restRouter } from './api'
import { connect } from './db'
import { signin, protect } from './api/modules/auth'
// Declare an app from express
const app = express();

// Test Endpoint
app.get('/', (req, res, next) => {
  res.status(200).json({ ok: false });
});

export default app
