import { lerp, insertHTML, on, off } from "./utils";
// @ts-ignore
import FileLakeStyles from "./styles.css?raw"; // Update to import attributes once supported by Vite;

export class FileLake extends HTMLElement {
	static formAssociated = true;
	// #internals = this.attachInternals();
	#root = this.attachShadow({ mode: "open" });
	tpl() {
		return `<div class="wrapper">
      <input type="file" id="${this.id}-upload" />
      <div class="lake">
        <ul class="file-list">
        
        </ul>
        <slot name="label"></slot>
        <label for="${this.id}-upload"></label>
      </div>
      <div class="mouse-tracker"></div>
    </div>`;
	}
	setMouseOver({ type }: { type: "mouseover" | string }) {
		this.toggleAttribute("mouseover", type === "mouseover");
	}
	pos = {
		x: 0,
		y: 0,
		prevX: 0,
		prevY: 0,
	};
	handleEvent(e: Event) {
		if (e.type === "mousemove") {
			const evt = e as MouseEvent;
			this.pos.y = evt.clientY;
			this.pos.x = evt.clientX;
		} else if (e.type === "change") {
			const fileList = (e.target! as HTMLInputElement).files!;

			insertHTML(
				this.#root.querySelector(".file-list")!,
				`<li>${fileList[fileList.length - 1].name}</li>`
			);
		} else {
			this.setMouseOver(e);
		}
	}

	render(_frame: number) {
		if (this.pos.prevX === this.pos.x && this.pos.prevY === this.pos.y)
			return requestAnimationFrame(f => this.render(f));

		this.pos.prevX += lerp(this.pos.prevX, this.pos.x);
		this.pos.prevY += lerp(this.pos.prevY, this.pos.y);

		this.style.setProperty("--x", `${this.pos.prevX}px`);
		this.style.setProperty("--y", `${this.pos.prevY}px`);
		return requestAnimationFrame(f => this.render(f));
	}
	connectedCallback() {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(FileLakeStyles);
		this.#root.adoptedStyleSheets.push(stylesheet);
		this.#root.innerHTML = this.tpl();
		on(this, "input", this, true);
		on(this, "mousemove", this, true);
		on(this, "mouseover", this, true);
		on(this, "mouseleave", this, true);
		on(this.#root.querySelector('[type="file"]')!, "change", this, false);
		requestAnimationFrame(f => this.render(f));
	}
	disconnectedCallback() {
		off(this, "input", this, true);
		off(this, "mousemove", this, true);
		off(this, "mouseover", this, true);
		off(this, "mouseleave", this, true);
		off(this.#root.querySelector('[type="file"]')!, "change", this, false);
	}
}
