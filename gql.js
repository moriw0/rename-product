import fetch from 'node-fetch';
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker';
dotenv.config();

const { ACCEESS_TOKEN } = process.env;

const accessToken = ACCEESS_TOKEN;
const store = 'testonka3';
const hostName = store + '.myshopify.com';
const apiVersion = '2021-01';
const apiLocation = '/admin/api/';

const shopGraphQl = 'https://' + hostName + apiLocation + apiVersion + '/graphql.json';

const url = shopGraphQl;

const randomTitle = faker.commerce.productName();

// const body = {
//   query: `mutation {
//     productCreate(input: {title: "Awsome"}) {
//         product {
//           id
//           title
//         }
//       }
//     }
//   ` 
// };

// const body = {
//   query: `{
//       shop {
//           name
//         }
//     }`
// };

// const body = {
//   query: `{
//     products(first:1) {
//       edges {
//         node {
//           title
//           id
//           variants(first:1) {
//             edges {
//               node {
//                 id
//               }
//             }
//           }
//         } 
//       }
//     }
//   }`
// };


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
      "id": "gid://shopify/Product/7595691737326",
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
          "X-Shopify-Access-Token" : accessToken
      },
      body: JSON.stringify(body)
  }
)
.then(res => {
  console.log(`status = ${res.status}, ${res.statusText}`);
  return res.json();
})
.then(json => {
  console.log("data returned:\n", json);
})
.catch(err => console.error(err));; 
