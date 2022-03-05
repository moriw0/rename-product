import fetch from 'node-fetch';

const apiKey = '00a85a411c4ce18ee457fad05799621a';
const accessToken = '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';
const store = 'testonka3';
const hostName = store + '.myshopify.com';
const apiVersion = '2021-01';
const apiLocation = '/admin/api/';

const shopGraphQl = 'https://' + hostName + apiLocation + apiVersion + '/graphql.json';

const url = shopGraphQl;

const body = {
    query: `{
      products(first:10) {
        edges {
          node {
            title
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
