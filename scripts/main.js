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

//вертикальный аккордион меню 
function menuAccordion() {
	const menuItem = document.querySelectorAll('.menu-accordeon__item');
	const menuAcc = document.querySelector('.menu-accordeon__list');

	menuAcc.addEventListener('click', event => {
		event.preventDefault();
		const target = event.target;
		
		for (const it of menuItem) {
			if ( it !== target.parentNode) {
				it.classList.remove('is-active');
				it.lastElementChild.style.width = 0;
			}
		}
		if (target.classList.contains('menu-accordeon__link')) {
			const menuContent = target.nextElementSibling;
			//console.log(menuContent.parentNode);
		
			if (menuContent.parentNode.classList.contains('is-active')) {
				menuContent.parentNode.classList.remove('is-active');
				menuContent.style.width = 0;
			} else {
				menuContent.parentNode.classList.add('is-active');
				menuContent.style.width = 520 + 'px';
			}
		}
	});
};
menuAccordion();