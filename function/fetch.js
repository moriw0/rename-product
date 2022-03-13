import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const { ACCEESS_TOKEN, SHOP} = process.env;

const url = `https://${SHOP}/admin/api/2021-01/graphql.json`;

export const fetchProductId = async () => {
  console.log('fetching product_id...\n')
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

  const product_id = await fetch (
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
    return json.data.products.edges[0].node.id;
  })
  .catch(err => console.error(err));

  console.log(`returned:\n  ${product_id}\n`);
  return product_id;
};
