//моильное меню
function mobileMenu() {
	const navTrigger = document.querySelector('.nav-trigger');
	const navMobile = document.querySelector('.nav-mobile');
	const navMobileItems = document.querySelectorAll('.nav-mobile__item');

	navTrigger.addEventListener('click', toggleClass);

	for (const iterator of navMobileItems) {
		iterator.addEventListener('click', toggleClass);
	}

	function toggleClass(e) {
		e.preventDefault();
		navTrigger.classList.toggle('is-active');
		navMobile.classList.toggle('is-active');
	};
};
mobileMenu();

//Слайдер 
function slider() {
	const prev = document.querySelector('.scroll-button--prev');
	const next = document.querySelector('.scroll-button--next');
	const sliderList = document.querySelector('.slider__list');
	const sliderItems = document.querySelectorAll('.slider__item');

	next.addEventListener('click', moveNext);
	prev.addEventListener('click', movePrev);


	let num = 2;

	function movePrev() {
		num++;
		if (num > sliderItems.length) {
			num = 1;
		}
		setOrder();
		sliderList.classList.remove('is-reverse');
		moveItem();
	};

	function moveNext() {
		num--;
		if (num === 0) {
			num = sliderItems.length;
		}
		setOrder();
		sliderList.classList.add('is-reverse');
		moveItem();
	};

	function setOrder() {
		let key = num;

		for (const i of sliderItems) {
			i.style.order = key;
			key++;
			if (key > sliderItems.length) {
				key = 1;
			}
		}
	};

	function moveItem() {
		sliderList.classList.remove('is-move');
		setTimeout(() => {
			sliderList.classList.add('is-move');
		}, 50);
	};
};
slider();

//всплывающее меню слайдера
function showConsist() {
	const consists = document.querySelectorAll('.burger__note--consist'); //блочок с бургером
	const compositions = document.querySelectorAll('.burger__composition'); //всплывающий блок ингредиентов

	for (const consistItem of consists) {
		consistItem.addEventListener('mouseover', hiddenMenu);
		consistItem.addEventListener('mouseout', hiddenMenu);
	}

	function hiddenMenu(e) {
		e.preventDefault();
		for (const item of compositions) {
			item.classList.toggle('onVisible');
		};
	};
};
showConsist();

//горизонтальный аккордеон
function teamAccordion() {
	const accordionItems = document.querySelectorAll('.team-accordeon__item');
	const teamAcc = document.querySelector('.team-accordeon');

	teamAcc.addEventListener('click', event => {

		const target = event.target;

		if (target.classList.contains('team-accordeon__head')) {
			const teamItem = target.parentNode;
			const itemContent = target.nextElementSibling;
			const contentHeight = itemContent.firstElementChild.clientHeight;

			for (const item of accordionItems) {
				if (item !== teamItem) {
					item.classList.remove('is-active');
					item.lastElementChild.style.height = 0;
				}
			}
			if (teamItem.classList.contains('is-active')) {
				teamItem.classList.remove('is-active');
				itemContent.style.height = 0;
			} else {
				teamItem.classList.add('is-active');
				itemContent.style.height = contentHeight + 'px';
			}
		}
	});
};
teamAccordion();

//вертикальный аккордеон меню 
function menuAccordeon() {
	const menuItems = document.querySelectorAll('.menu-accordeon__item');
	const menuAcc = document.querySelector('.menu-accordeon__list');

	menuAcc.addEventListener('click', event => {
		event.preventDefault();

		let target = event.target.parentNode;
		let content = target.nextElementSibling;
		let item = target.parentNode;

		const tarWidth = target.clientWidth;
		const windowWidht = document.documentElement.clientWidth;
		const layoutContentWidth = 520;
		const breackpontPhone = 480;
		const closeMenuWidht = tarWidth * menuItems.length;
		const openMenuWidth = closeMenuWidht + layoutContentWidth;

		if (event.target.classList.contains('menu-accordeon__head')) {
			moveMenu();
		}

		target = event.target;
		content = target.nextElementSibling;
		item = target.parentNode;

		if (target.classList.contains('menu-accordeon__link')) {
			moveMenu();
		}

		function moveMenu() {
			for (const it of menuItems) {
				if (it != item) {
					it.classList.remove('is-active');
					it.lastElementChild.style.width = 0;
					menuAcc.style.transform = 'translateX(0)';
				}
			}

			if (item.classList.contains('is-active')) {
				item.classList.remove('is-active');
				content.style.width = 0;
			} else {
				item.classList.add('is-active');
				content.style.width = layoutContentWidth + 'px';

				if (windowWidht > breackpontPhone && windowWidht < openMenuWidth) {
					content.style.width = windowWidht - closeMenuWidht + 'px';
				} else if (windowWidht <= breackpontPhone) {
					let num;
					for (let i = 0; i < menuItems.length; i++) {
						if (menuItems[i] === item) {
							num = menuItems.length - (i + 1);
						}
						menuAcc.style.transform = `translateX(${tarWidth * num}px)`;
						content.style.width = windowWidht - tarWidth + 'px';
					}
				} else {
					content.style.width = layoutContentWidth + 'px';
				}
			}
		}
	});
};
menuAccordeon();

//модальные окна
function reviewsOverlay() {

	const openButton = document.querySelector('.reviews__list');
	const template = document.querySelector('#overlayTemplate').innerHTML;
	const overlay = createOverlay(template);


	openButton.addEventListener('click', event => {
		event.preventDefault();
		const target = event.target;

		let name = target.parentNode.firstElementChild.textContent;
		let contentRev = target.parentNode.firstElementChild.nextElementSibling.textContent;

		if (target.classList.contains('btn--reviews')) {
			overlay.open();
			overlay.setContent(name, contentRev);
		}
	});
};
reviewsOverlay();

//обработка формы
function sentFormData() {
	const myForm = document.querySelector('.form');
	const sendBtn = document.querySelector('.btn--send');

	sendBtn.addEventListener('click', function (event) {
		event.preventDefault();

		let url = myForm.getAttribute('action');
		let method = myForm.getAttribute('method');
		let formData = new FormData(myForm);

		formData.append('name', myForm.elements.name.value);
		formData.append('phone', myForm.elements.phone.value);
		formData.append('comment', myForm.elements.comment.value);
		formData.append('to', 'bigdaddy@gmail.com');

		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
		xhr.send(formData);

		const overlay = createOverlay(document.querySelector('#overlayTemplate').innerHTML);
		xhr.addEventListener('load', () => {
			overlay.open();
			if (xhr.status <= 400) {
				const message = xhr.response.message;
				overlay.setContent('', message);
			} else {
				const message = 'УПС! Ошибочка! Попробуйте снова!';
				overlay.setContent('', message);
			}
		});
	});
};
sentFormData();
//карты
function initMap() {
	ymaps.ready(init);

	const markImage = 'images/svgicons/map-marker.svg';

	function init() {
		let myMap = new ymaps.Map('map', {
				center: [59.925651, 30.395737],
				zoom: 11
			}),

			myPlacemarks = [
				new ymaps.Placemark([59.915025, 30.486548], {
					hintContent: 'Наш адрес',
					balloonContentHeader: 'Мы ждем Вас',
					balloonContent: 'Товарищеский проспект, 20/27',
					balloonContentFooter: 'Приходите к нам'
				}, {
					iconLayout: 'default#image',
					iconImageHref: markImage,
					iconImageSize: [46, 57]
				}),
				new ymaps.Placemark([59.891259, 30.316892], {
					hintContent: 'Наш адрес',
					balloonContentHeader: 'Мы ждем Вас',
					balloonContent: 'Московский проспект, 103к2',
					balloonContentFooter: 'Приходите к нам'
				}, {
					iconLayout: 'default#image',
					iconImageHref: markImage,
					iconImageSize: [46, 57]
				}),
				new ymaps.Placemark([59.947041, 30.385038], {
					hintContent: 'Наш адрес',
					balloonContentHeader: 'Мы ждем Вас',
					balloonContent: 'Тверская улица, 16',
					balloonContentFooter: 'Приходите к нам'
				}, {
					iconLayout: 'default#image',
					iconImageHref: markImage,
					iconImageSize: [46, 57]
				}),
				new ymaps.Placemark([59.973568, 30.311278], {
					hintContent: 'Наш адрес',
					balloonContentHeader: 'Мы ждем Вас',
					balloonContent: 'улица Чапыгина, 13А',
					balloonContentFooter: 'Приходите к нам'
				}, {
					iconLayout: 'default#image',
					iconImageHref: markImage,
					iconImageSize: [46, 57]
				})
			]

		for (const mark of myPlacemarks) {
			myMap.geoObjects.add(mark);
		}
	}
};
initMap();

//создание модального окна
function createOverlay(template) {
	let fragment = document.createElement('div');

	fragment.innerHTML = template;

	const overlayElement = fragment.querySelector('.overlay');
	const headElement = fragment.querySelector('.overlay__head');
	const contentElement = fragment.querySelector('.overlay__content');
	const closeElement = fragment.querySelector('.overlay__close');

	fragment = null;

	overlayElement.addEventListener('click', event => {
		if (event.target === overlayElement) {
			closeElement.click();
		}
	});

	closeElement.addEventListener('click', event => {
		event.preventDefault();
		document.body.removeChild(overlayElement);
	});

	return {
		open() {
			document.body.appendChild(overlayElement);
		},
		close() {
			closeElement.click();
		},
		setContent(head, content) {
			headElement.innerHTML = head;
			contentElement.innerHTML = content;
		}
	};
};

//onePageScroll
function pageScroll() {
	const wrapper = document.querySelector('.wrapper');
	const content = wrapper.querySelector('.maincontent');
	const sections = content.querySelectorAll('.section');
	const points = document.querySelectorAll('.pagination__item');
	const dataScrollto = document.querySelectorAll('[data-scroll-to]');

	let isScroll = false;

	addNavigation();
	wheel();
	keyPush();

	function moveToPage(numSection) {
		const position = `${numSection * -100}%`;

		if (isScroll) return;

		isScroll = true;

		addClass(sections);

		content.style.transform = `translateY(${position})`;

		setTimeout(() => {
			isScroll = false;
			addClass(points);
		}, 1000);

		function addClass(array) {
			array[numSection].classList.add('is-active');
			for (const iterator of array) {
				if (iterator !== array[numSection]) {
					iterator.classList.remove('is-active');
				}
			}
		}
	}

	function addNavigation() {
		for (const iterator of dataScrollto) {
			iterator.addEventListener('click', e => {
				e.preventDefault();
				moveToPage(iterator.dataset.scrollTo);
			});
		}
	}

	function wheel() {
		document.addEventListener('wheel', e => {
			const direct = e.deltaY > 0 ? 'up' : 'down';
			scrollToPage(direct);
		})
	}

	function defineSection(array) {
		for (let i = 0; i < array.length; i++) {
			const element = array[i];

			if (element.classList.contains('is-active')) {
				return {
					elIndex: i,
					elActive: element,
					elNext: element.nextElementSibling,
					elPrev: element.previousElementSibling
				};
			}
		}
	}

	function scrollToPage(direct) {
		let section = defineSection(sections);

		if (direct === 'up' && section.elNext) {
			let numSection = section.elIndex + 1;
			moveToPage(numSection);
		}

		if (direct === 'down' && section.elPrev) {
			let numSection = section.elIndex - 1;
			moveToPage(numSection);
		}
	}

	function keyPush() {
		document.addEventListener('keydown', e => {
			switch (e.keyCode) {
				case 40:
					scrollToPage('up');
					break;
				case 38:
					scrollToPage('down');
					break;
			}
		});
	}

	var isMobileDevice = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobileDevice.Android() || isMobileDevice.BlackBerry() || isMobileDevice.iOS() || isMobileDevice.Opera() || isMobileDevice.Windows());
		}
	};

	if (isMobileDevice.any()) {
		swipe();
	}

	function swipe() {
		let touchStartY = 0;
		let touchEndY = 0;

		document.addEventListener('touchstart', e => {
				touchStartY = e.changedTouches[0].screenY;
			},
			false
		);

		wrapper.addEventListener('touchmove', e => e.preventDefault());

		document.addEventListener(
			'touchend',
			e => {
				touchEndY = e.changedTouches[0].screenY;
				let direct = swipeDirect();
				scrollToPage(direct);
			},
			false
		);

		function swipeDirect() {
			let dif = touchStartY - touchEndY;
			if (dif > 100) {
				return 'up';
			} else if (dif < -100) {
				return 'down';
			}
		}
	}
};
pageScroll();

//Секция с видео
function moveVideo() {
	const videoElement = document.querySelector('video');
	const playBytton = document.querySelector('.player__start');
	const panelScroll = document.querySelector('.player__playback');
	const buttonScroll = document.querySelector('.player__playback-button');
	let duration;
	playBytton.addEventListener('click', e => {
		e.preventDefault();
		duration = videoElement.duration;
		let interval;

		if (videoElement.paused) {
			videoElement.play();
			playBytton.classList.add('paused')
		} else {
			videoElement.pause();
			playBytton.classList.remove('paused')
		}

		clearInterval(interval);
		interval = setInterval(() => {
			const completed = videoElement.currentTime;
			const percent = (completed / duration) * 100;
			changePositionPersent(percent);
		}, 1000);
	});

	panelScroll.addEventListener('click', e => {
		const newButtonPosition = e.pageX - panelScroll.getBoundingClientRect().left;
		const panelScrollWidth = panelScroll.getBoundingClientRect().width;
		const clickedPercent = (newButtonPosition / panelScrollWidth) * 100;
		const newPlayerTime = (duration / 100) * clickedPercent;

		videoElement.currentTime = newPlayerTime;
		changePositionPersent(clickedPercent);
	})

	function changePositionPersent(percent) {
		buttonScroll.style.left = `${percent}%`;
	}
};
moveVideo();