import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export async function getApi() {
  const BASE_URL = 'https://portfolio-js.b.goit.study/api';
  const END_POINT = '/reviews';
  const url = `${BASE_URL}${END_POINT}`;
  try {
    const response = await axios.get(url);
    return response.data; 
  } catch (error) {
    console.error('Error fetching data from API', error);
    throw error;
  }
}


export function createMarkup(data) {
  return data.map(el => 
    `
      <div class="swiper-slide">
        <h1 class="author">${el.author}</h1>
        <p class="text">${el.review}</p>
        <img src="${el.avatar_url}" alt="">
      </div>
    `
  ).join('');
}

async function initSwiper() {
  try {
    const data = await getApi();
    const markup = createMarkup(data);
    
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = markup;
    
    new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { 
          slidesPerView: 1,
          spaceBetween: 10
        },
        768: { 
          slidesPerView: 1,
          spaceBetween: 20
        },
        1280: { 
          slidesPerView: 2,
          spaceBetween: 30
        }
      },
      centeredSlides: false, 
      slidesPerView: 'auto', 
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initSwiper);
