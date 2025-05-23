import { lerp } from "./utils";

export class FLMouseTracker extends HTMLElement {
	x = 0;
	y = 0;
	px = 0;
	py = 0;
	render() {
		if (this.px !== this.x && this.py !== this.y) {
			this.px += lerp(this.px, this.x);
			this.py += lerp(this.py, this.y);
			this.style.setProperty("--x", `${this.px}px`);
			this.style.setProperty("--y", `${this.py}px`);
		}
		return requestAnimationFrame(() => this.render());
	}
	connectedCallback() {
		this.addEventListener("pointerover", e => {
			this.x = e.clientX;
			this.y = e.clientY;
		});
		this.addEventListener("pointerenter", () =>
			this.toggleAttribute("over", true)
		);
		this.addEventListener("pointerleave", () =>
			this.toggleAttribute("over", false)
		);
		this.render();
	}
}
