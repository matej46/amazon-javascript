import {cart, removeFromCart, updateCartQuantity, updateQuantity} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'



let cartSummaryHtml = ''
let totalQuantity = 0;

  totalQuantity=updateCartQuantity()
  document.querySelector('.js-checkout-items-count').innerHTML = totalQuantity




cart.forEach((cartItem, index) => {
  const productId = cartItem.productId;
  
  let matchingProduct;
  
  products.forEach((product) => {
    if (product.id === productId)
      {matchingProduct = product}
  })

  
  const deliveryOptionId = cartItem.deliveryOptionId

  let deliveryOption;
  
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  })

  const today = dayjs()
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
  const dateString = deliveryDate.format('dddd, MMMM D')


  cartSummaryHtml += 
  `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
              ${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
             data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}">
            Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
         ${deliveryOptionsHTML(index, cartItem)}
        </div>
      </div>
    </div>
  `;


})   

function deliveryOptionsHTML(index, cartItem) {

  let html = ''

  deliveryOptions.forEach( (deliveryOption) => {

    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
    const dateString = deliveryDate.format('dddd, MMMM D')

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`

    const isChecked = deliveryOption.id===cartItem.deliveryOptionId

       html+= `
    <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${index}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `

  })

  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;



document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId
    removeFromCart(productId)
   
  const container = document.querySelector(`.js-cart-item-container-${productId}`)
  container.remove()
  totalQuantity=updateCartQuantity()
  document.querySelector('.js-checkout-items-count').innerHTML = totalQuantity
  })
})


document.querySelectorAll('.js-update-link').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    const productId = updateLink.dataset.productId
    console.log(productId)
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity')
  })
})

document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {
    const productId = saveLink.dataset.productId
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    const updatedQuantity = container.querySelector('.js-quantity-input').value
    updateQuantity(productId, updatedQuantity)
    updateCartQuantity()

   document.querySelector(`.js-quantity-label-${productId}`).innerHTML=updatedQuantity

    container.classList.remove('is-editing-quantity')
  })
})

console.log(cart)


