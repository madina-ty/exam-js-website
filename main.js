const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

var firstIndex = 0;
function automaticSlide() {
    setTimeout(automaticSlide, 2000);
  
    const img = document.querySelectorAll('.main__img');
  
    for (let pics = 0; pics < img.length; pics++) {
      img[pics].style.display = 'none';
    }
  
    firstIndex++;
    if (firstIndex >= img.length) {
      firstIndex = 0;
    }
  
    img[firstIndex].style.display = 'block';
  }
  
  automaticSlide();

let valueDisplay = document.querySelectorAll('.num');
let interval = 5000;

valueDisplay.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));

  let duration = Math.floor(interval/endValue);
  let counter = setInterval(function(){
    startValue += 1;

    valueDisplay.textContent = startValue;
    if(startValue == endValue) {
      clearInterval(counter);
    }
  },duration);
});

document.querySelector('.learn-more').addEventListener('click', function() {
  const initialInfo = document.querySelector('.initial-info');
  const moreInfo = document.querySelector('.more-info');
  const outer = document.querySelector('.outer');
  const socials = document.querySelector('.about__socials');
  
  // Toggle the visibility of the sections
  if (initialInfo.style.display !== 'none') {
    initialInfo.style.display = 'none';  
    moreInfo.style.display = 'block'; 
    outer.style.display = 'none';
    socials.style.display = 'block';
    this.textContent = 'Show Less';       
  } else {
    initialInfo.style.display = 'block';   
    moreInfo.style.display = 'none';  
    outer.style.display = 'flex';
    socials.style.display = 'none';
    this.textContent = 'Learn more';       
  }
});

const countdownDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector('.days').textContent = String(days).padStart(2, '0');
  document.querySelector('.hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
  document.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector('.discount__heading').textContent = "Sale Ended";
    document.querySelector('.discount__subheading').textContent = "";
  }
}, 1000);

const products = [
  {
    id: 0,
    image:'pictures/purpleBook.png',
    title: 'Book Club',
    price:'120',
  },
  {
    id: 1,
    image:'pictures/pinkBook.png',
    title: 'World Book Day',
    price:'100',
  },
  {
    id: 2,
    image:'pictures/yellowBook.png',
    title: 'Book Club',
    price:'125',
  },
  {
    id: 3,
    image:'pictures/blueBook.png',
    title: 'World Book Day',
    price:'120',
  },
  {
    id: 4,
    image:'pictures/darkBlueBook.png',
    title: 'World Book Day',
    price:'130',
  },
  {
    id: 5,
    image:'pictures/книга.png',
    title: 'World Book Day',
    price:'123',
  },
];

const categories = [...new Set(products.map((item) => item))]; 
let i = 0;

document.getElementById('root').innerHTML = products.map((item) => {
  const { image, title, price } = item;
  return `
    <div class='box'>
      <div class='img-box'>
        <img class='images' src=${image} alt=${title}> </div>
      <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}</h2>   

        <button class='btn' onclick='addToCart(${item.id})'>Add to Cart</button> </div>
    </div>
  `;
}).join('');

let cart = [];

function displaycart() {
  const cartItemContainer = document.getElementById('cartItem');
  const totalElement = document.getElementById('total');
  let total = 0;

  if (cart.length === 0) {
    cartItemContainer.innerHTML = 'Your cart is empty';
    totalElement.innerHTML = '$ 0.00';
    document.querySelector('.count').innerText = '0';
  } else {
    cartItemContainer.innerHTML = cart.map((item, index) => {
      const { image, title, price } = item;
      total += parseFloat(price); 
      return `
        <div class='cart-item'>
          <div class='row-img'>
            <img class='rowing' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size:15px;'>$${price}</h2>
          <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
        </div>
      `;
    }).join('');
    totalElement.innerHTML = `$ ${total.toFixed(2)}`; 
    document.querySelector('.count').innerText = cart.length;
  }
}

function addToCart(productId) {
  console.log("Adding product with ID:", productId);
  cart.push(products.find(product => product.id === productId));
  displaycart();
}

function delElement(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    displaycart();
  } else {
    console.error("Invalid index for deletion");
  }
}
