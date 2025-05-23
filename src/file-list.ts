import type { CommandEvent } from "./types";
import { getParent } from "./utils";
class FLFileList extends HTMLElement {
	lake = getParent(this);
	handleEvent(e: CommandEvent) {
		switch (e.command) {
			case "--remove":
		}
	}
	render() {}
	connectedCallback() {
		// @ts-ignore Figure out how to get command events properly polyfilled
		this.addEventListener(
			"command" as keyof HTMLElementEventMap,
			this,
			true
		);
	}
}
