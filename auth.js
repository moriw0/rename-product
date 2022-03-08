import express from 'express';
import { Shopify } from '@shopify/shopify-api'
import dotenv from 'dotenv'
dotenv.config();

const host = '127.0.0.1';
const port = process.env.PORT || 3000;

const {API_KEY, API_SECRET_KEY, SCOPES, HOST } = process.env;

const shops = {};

Shopify.Context.initialize({
  API_KEY: API_KEY,
  API_SECRET_KEY: API_SECRET_KEY,
  SCOPES: SCOPES,
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
});

const app = express();

app.get('/', async (req, res) => {
  if (typeof shops[req.query.shop] !== 'undefined') {
  res.send('Hello tonka2')
  } else {
    res.redirect(`/auth?shop=${req.query.shop}`);
  }
});

app.get('/auth', async (req, res) => {
  const authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    '/auth/callback',
    false,
  )
  res.redirect(authRoute);
});

app.get('/auth/callback', async (req, res) => {
  const shopSession = await Shopify.Auth.validateAuthCallback(
    req,
    res,
    req.query
  );
  console.log(shopSession);

  shops[shopSession.shop] = shopSession;

  res.redirect(`https://${shopSession.shop}//admin/apps/oauth-node-1`);
});

app.listen(port, () =>{
  console.log(`running at http://${host}:${port}`);
});
