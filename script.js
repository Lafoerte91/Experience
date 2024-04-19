'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});

// узнать больше
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScroll.addEventListener('click', function() {
  section1.scrollIntoView({behavior: 'smooth'})
})

// Делегирование событий
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()
  console.log(e.target)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// cоздаем табы
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click', function(e) {
  e.preventDefault()
  const clicked = e.target.closest('.operations__tab')
  if(clicked) {
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active')
    tabsContent.forEach(t => t.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  }
})

// Создаем прозрачное меню
const nav = document.querySelector('.nav')

function hover(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('.nav__logo')
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', hover.bind(0.5))
nav.addEventListener('mouseout', hover.bind(1))

// появление меню после прокрутки
const options = {
  threshold: 0,
  rootMargin: '-90px'
}

function callback(entries) {
  if(!entries[0].isIntersecting === true) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}

const observer = new IntersectionObserver(callback, options)

observer.observe(document.querySelector('.header'))

// всплытие секций
// function revealSection(entries, observer) {
//   if(entries[0].isIntersecting) {
//     entries[0].target.classList.remove('section--hidden')
//     observer.unobserve(entries[0].target)
//   }
// }

// const allSections = document.querySelectorAll('section')
// const sectionObserver = new IntersectionObserver(revealSection, {threshold: 0.15})

// allSections.forEach(function(section) {
//   sectionObserver.observe(section)
//   section.classList.add('section--hidden')
// })

// ленивая подгрузка изображений
function loadImg(entries, observer) {
  if(!entries[0].isIntersecting) return
  entries[0].target.src = entries[0].target.dataset.src
  entries[0].target.addEventListener('load', function() {
    entries[0].target.classList.remove('lazy-img')
  })
  observer.unobserve(entries[0].target)
}

const images = document.querySelectorAll('img[data-src]')
const imgObserver = new IntersectionObserver(loadImg, {threshold: 0.15})

images.forEach(img => imgObserver.observe(img))

// слайдер
const slides = document.querySelectorAll('.slide')
const maxSlides = slides.length
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
let currSlide = 0

function goToSlide(slide) {
  slides.forEach((el, index) => {
    el.style.transform = `translateX(${(index - slide) * 100}%)`
  })
}

goToSlide(0)

function nextSlide() {
  if(currSlide == maxSlides - 1) {
    currSlide = 0
  } else {
    currSlide++
  }
  goToSlide(currSlide)
}
function prevSlide() {
  if(currSlide == 0) {
    currSlide = maxSlides - 1
  } else {
    currSlide--
  }
  goToSlide(currSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

