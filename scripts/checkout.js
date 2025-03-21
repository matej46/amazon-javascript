import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadPage() {
  try {
    await loadProductsFetch()

  await new Promise((resolve) => {
    // throw 'error2';
    loadCart(() => {
      // reject('error 3')
      resolve()
    });
  })

  } catch(error) {
    console.log('Unexpected error. Please try again later')
  }
  

  renderOrderSummary()
  renderPaymentSummary()

}

loadPage()

// loadPage().then((value) => {
//   console.log('next step')
//   console.log(value)
// })

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve()
//     });
//   })
// ]).then(() => {
//   renderOrderSummary()
//   renderPaymentSummary()
// });

// new Promise((resolve) => {

//   loadProducts(() => {
//     resolve('value1')
//   })
// }).then((value) => {
//   console.log(value)
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve()
//     });
//   }).then(() => {
//     renderOrderSummary()
//     renderPaymentSummary()
//   })


// });






// loadProducts(() => {
//   loadCart(()=> {
//     renderOrderSummary()
//     renderPaymentSummary()
//   })
// })

