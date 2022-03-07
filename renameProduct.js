import fetch from 'node-fetch';
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker';
dotenv.config();

const { ACCEESS_TOKEN, SHOP } = process.env;

const url = `https://${SHOP}/admin/api/2021-01/graphql.json`;

export function renameFunction(product_id) { 
  const randomTitle = faker.commerce.productName();
  const body = {
    query: `mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            title
          }
        }
      }
    ` ,
    variables: {
      "input": {
        "id": product_id,
        "title": randomTitle
      }
    }
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
    console.log("renamed:\n", json.data.productUpdate.product.title);
  })
  .catch(err => console.error(err));; 
};
