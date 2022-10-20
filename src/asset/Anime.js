export default class Anime {
	constructor(selector, option) {
		this.selector = selector;
		this.option = option;
		this.startTime = performance.now();
		this.currentValue = null;

		if (this.option.prop === 'scroll') this.currentValue = this.selector.scrollY;
		else this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]);

		this.isString = typeof this.option.value;

		if (this.isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);
			const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
			const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];

			for (let condition of x) {
				if (this.option.prop == condition) this.currentValue = (this.currentValue / parentW) * 100;
			}
			for (let condition of y) {
				if (this.option.prop == condition) this.currentValue = (this.currentValue / parentH) * 100;
			}
			this.option.value = parseFloat(this.option.value);
		}

		if (this.option.value === this.currentValue) return;
		requestAnimationFrame((time) => this.run(time));
	}

	run(time) {
		let timelast = time - this.startTime;
		let progress = timelast / this.option.duration;

		if (progress < 0) progress = 0;
		if (progress > 1) progress = 1;
		if (progress < 1) {
			requestAnimationFrame((time) => this.run(time));
		} else {
			if (this.option.callback) {
				setTimeout(() => {
					this.option.callback();
				}, 0);
			}
		}
		let result = this.currentValue + (this.option.value - this.currentValue) * progress;

		if (this.isString === 'string') this.selector.style[this.option.prop] = result + '%';
		else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
		else if (this.option.prop === 'scroll') window.scroll(0, result);
		else this.selector.style[this.option.prop] = result + 'px';
	}
}
