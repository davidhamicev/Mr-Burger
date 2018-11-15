const navTrigger = document.querySelector('.nav-trigger');
const navMenu = document.querySelector('.nav-mobile');
let flag = false;

navTrigger.addEventListener('click', function () {
	if (!flag) {
		navTrigger.classList.add('is-active');
		navMenu.classList.add('is-active');
		flag = true;
	} else if (flag) {
		navTrigger.classList.remove('is-active');
		navMenu.classList.remove('is-active');
		flag = false;
	}
});