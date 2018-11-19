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


//всплывающее меню 
function showConsist() {
	const consist = document.querySelectorAll('.burger__note--consist');
	const composition = document.querySelector('.burger__composition');

	for (const iterator of consist) {
		iterator.addEventListener('mouseover', toggleClass);
		iterator.addEventListener('mouseout', toggleClass);
	}

	function toggleClass(e) {
		e.preventDefault();
		composition.classList.toggle('onVisible');
	};
};

showConsist();