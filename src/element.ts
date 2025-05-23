import { on, off } from "./utils";
// @ts-ignore
import FileLakeStyles from "./styles.css?inline"; // Update to import attributes once supported by Vite;

export class FileLake extends HTMLElement {
	static formAssociated = true;
	#internals = this.attachInternals();
	#root = this.attachShadow({ mode: "open" });
	get #fileInput() {
		return this.shadowRoot?.querySelector<HTMLInputElement>(
			'[type="file"]'
		)!;
	}
	tpl() {
		return `<div class="wrapper">
			<input type="file" id="${this.id}-upload" />
			<div class="lake">
				<file-list></file-list>
				<slot name="label"></slot>
				<label for="${this.id}-upload"></label>
			</div>
			<div class="mouse-tracker"></div>
		</div>`;
	}
	save() {
		const files = this.#fileInput.files!;
		if (!files) return;
		const fd = new FormData();
		for (let i = 0, l = files?.length; i < l; i += 1) {
			const file = files.item(i)!;
			fd.append(`${this.getAttribute("name")}[${i}]`, file, file.name);
		}
		this.#internals.setFormValue(fd);
	}
	handleEvent(_e: Event) {}
	connectedCallback() {
		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(FileLakeStyles);
		this.id = this.id || `${this.localName}-${Date.now()}`;
		this.#root.adoptedStyleSheets.push(stylesheet);
		this.#root.innerHTML = this.tpl();
		on(this, "command", this, true);
		on(this, "input", this, true);
		on(this.#root.querySelector('[type="file"]')!, "change", this, false);
	}
	disconnectedCallback() {
		off(this, "command", this, true);
		off(this, "input", this, true);
		off(this.#root.querySelector('[type="file"]')!, "change", this, false);
	}
}
