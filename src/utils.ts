export const lerp = (p: number, t: number, m = 0.2): number => (t - p) * m;

export const insertHTML = (
	el: HTMLElement,
	html: string,
	insert: InsertPosition = "beforeend"
) => el.insertAdjacentHTML(insert, html);
export const on = (
	el: HTMLElement,
	event: "command" | keyof HTMLElementEventMap,
	cb: EventListenerOrEventListenerObject,
	opt: boolean | AddEventListenerOptions
) => el.addEventListener(event, cb, opt);
export const off = (
	el: HTMLElement,
	event: "command" | keyof HTMLElementEventMap,
	cb: EventListenerOrEventListenerObject,
	opt: boolean | AddEventListenerOptions
) => el.removeEventListener(event, cb, opt);

export const hash = (n = "" + Date.now()) => {
	var hash = 0,
		l = n.length,
		i,
		chr;
	if (l === 0) return hash;
	for (i = 0; i < l; i++) {
		chr = n.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return "" + hash;
};

export const getParent = (instance: HTMLElement) => {
	let p = instance.parentNode!;
	while (p instanceof ShadowRoot === false) {
		p = p?.parentNode!;
	}
	return p;
};

/**
 * Metric system baby!
 */
const base = 1000,
	KB = base,
	MB = base * base,
	GB = base * base * base;

export const getPrettySize = (size: number) => {
	const bytes = Math.round(Math.abs(size));

	if (bytes < KB) {
		return `${bytes} bytes`;
	}
	if (bytes < MB) {
		return `${Math.floor(bytes / KB)} KB`;
	}
	if (bytes < GB) {
		return `${Math.floor(bytes / MB)} MB`;
	}
	return `${Math.floor(bytes / GB)} GB`;
};
