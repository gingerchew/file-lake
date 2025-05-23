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
