import type { CommandEvent } from "./types";
import { getParent, hash } from "./utils";
const listItem = (
	{ name }: File,
	{ id }: FLFileList
) => `<li style="view-transition-name: file-lake-${hash(name)}">
    ${name}
    <button type="button" command="--remove" commandfor="${id}">&times;</button>
</li>`;
export class FLFileList extends HTMLElement {
	lake = getParent(this);
	fileInput = this.lake.querySelector<HTMLInputElement>('[type="file"]');
	get list() {
		return this.querySelector<HTMLOListElement>("ol")!;
	}
	handleEvent(e: Event) {
		const { command, source } = e as unknown as CommandEvent;
		switch (command) {
			case "--remove":
				const item = source.closest<HTMLLIElement>("[data-hash]");
				if (!item || !this.fileInput?.files) return;
				const files = this.fileInput.files;
				const l = files.length;
				const dt = new DataTransfer();
				for (let i = 0; i < l; i += 1) {
					if (hash(files[i].name) === item.dataset.hash) continue;
					dt.items.add(files[i]);
				}
				this.fileInput.files = dt.files;
				this.render();
				break;
			default:
				import.meta.env.DEV &&
					console.warn(
						`No handler has been set up for the ${command} command.`
					);
		}
	}
	render() {
		if (!this.fileInput?.files) return;

		document.startViewTransition(() => {
			this.list.innerHTML = Array.from(this.fileInput?.files!, file =>
				listItem(file, this)
			).join("");
		});
	}
	connectedCallback() {
		this.id ||= "fl-file-list-" + Date.now();
		this.innerHTML = `<ol></ol>`;
		// @ts-ignore Figure out how to get command events properly polyfilled
		this.addEventListener(
			"command" as keyof HTMLElementEventMap,
			this,
			true
		);
		this.fileInput!.addEventListener("change", () => this.render());
	}
	disconnectedCallback() {
		this.removeEventListener(
			"command" as keyof HTMLElementEventMap,
			this,
			true
		);
	}
}
