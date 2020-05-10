const sliderImages = document.querySelectorAll('.sliderImages');

function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
}

function checkImages(e) {
	// console.count(e);
	// console.log(window.scrollY);
	sliderImages.forEach((sliderImage) => {
		//half way throu the image
		const slideInAt =
			window.scrollY + window.innerHeight - sliderImage.height / 2;
		// console.log(slideInAt); // how far down we scrolled
		//bottom of the image
		const imageBottom = sliderImage.offsetTop + sliderImage.height;
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;
		if (isHalfShown && isNotScrolledPast) {
			sliderImage.classList.add('active');
		} else {
			sliderImage.classList.remove('active');
		}
	});
}

window.addEventListener('scroll', debounce(checkImages));