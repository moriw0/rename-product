import fetch from 'node-fetch';
import dotenv from 'dotenv'
import cron from 'node-cron';
import { renameFunction } from './renameProduct.js';
dotenv.config();

const { ACCEESS_TOKEN, SHOP, INTERVAL } = process.env;

const url = `https://${SHOP}/admin/api/2021-01/graphql.json`;


console.log('fetching product_id...')
const body = {
  query: `query{
    products(first:1) {
      edges {
        node {
          id
        } 
      }
    }
  }
  `
};

fetch (
  url,
  {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token" : ACCEESS_TOKEN
      },
      body: JSON.stringify(body)
  }
)
.then(res => {
  console.log(`status = ${res.status}, ${res.statusText}`);
  return res.json();
})
.then(json => {
  console.log("data returned:\n", json.data.products.edges[0].node.id);
  const product_id = json.data.products.edges[0].node.id;
  console.log("started cron rename job");
  cron.schedule(INTERVAL, () => renameFunction(product_id));
})
.catch(err => console.error(err));; 
