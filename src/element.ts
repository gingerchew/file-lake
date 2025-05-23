import { lerp, insertHTML, on, off, hash } from "./utils";
// @ts-ignore
import FileLakeStyles from "./styles.css?raw"; // Update to import attributes once supported by Vite;

interface CommandEvent {
	source: HTMLButtonElement;
	command: string;
}

export class FileLake extends HTMLElement {
	static formAssociated = true;
	// #internals = this.attachInternals();
	#root = this.attachShadow({ mode: "open" });
	get #fileInput() {
		return this.#root.querySelector<HTMLInputElement>('[type="file"]')!;
	}
	get #files() {
		return this.#fileInput!.files;
	}
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
	handleCommand(e: CommandEvent) {
		const { command, source } = e;

		switch (command) {
			case "--remove":
				const item = source.closest<HTMLLIElement>("[data-hash]");
				if (!item || !this.#files) return;
				const dt = new DataTransfer();
				for (let i = 0; i < this.#files.length; i += 1) {
					if (hash(this.#files[i].name) === item.dataset.hash)
						continue;
					dt.items.add(this.#files[i]);
				}

				this.#fileInput.files = dt.files;
				this.renderFileList();
		}
	}
	renderFileList() {
		const fileList =
			this.#root.querySelector<HTMLUListElement>(".file-list")!;
		const { files } =
			this.#root.querySelector<HTMLInputElement>('[type="file"]')!;

		const tpl = (file: File) => `<li data-hash="${hash(file.name)}">
            ${file.name}<button type="button" command="--remove" commandfor="${this.id}">&times;</button>
        </li>`;
		const l = files!.length;
		if (!files || l === 0) return;

		document.startViewTransition(() => {
			fileList.innerHTML = "";
			for (let i = 0; i < l; i += 1) {
				const currentFile = files.item(i);
				if (!currentFile) continue;
				insertHTML(fileList, tpl(currentFile));
			}
		});
	}
	handleEvent(e: Event) {
		if (e.type === "command") {
			this.handleCommand(e as unknown as CommandEvent);
		} else if (e.type === "mousemove") {
			const evt = e as MouseEvent;
			this.pos.y = evt.clientY;
			this.pos.x = evt.clientX;
		} else if (e.type === "change") {
			const fileList = (e.target! as HTMLInputElement).files!;
			document.startViewTransition(() => {
				insertHTML(
					this.#root.querySelector(".file-list")!,
					`<li data-name=">
                        ${fileList[fileList.length - 1].name}
                        <button type="button" command="--remove-item" commandfor="${this.id}">&times;</button>
                    </li>`
				);
			});
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
		this.id = this.id || `${this.localName}-${Date.now()}`;
		this.#root.adoptedStyleSheets.push(stylesheet);
		this.#root.innerHTML = this.tpl();
		on(this, "command", this, true);
		on(this, "input", this, true);
		on(this, "mousemove", this, true);
		on(this, "mouseover", this, true);
		on(this, "mouseleave", this, true);
		on(this.#root.querySelector('[type="file"]')!, "change", this, false);
		requestAnimationFrame(f => this.render(f));
	}
	disconnectedCallback() {
		off(this, "command", this, true);
		off(this, "input", this, true);
		off(this, "mousemove", this, true);
		off(this, "mouseover", this, true);
		off(this, "mouseleave", this, true);
		off(this.#root.querySelector('[type="file"]')!, "change", this, false);
	}
}
