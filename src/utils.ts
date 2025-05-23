export const lerp = (p: number, t: number, m = 0.2): number => (t - p) * m;

export const insertHTML = (
  el: HTMLElement,
  html: string,
  insert: InsertPosition = "beforeend"
) => el.insertAdjacentHTML(insert, html);
export const on = (
  el: HTMLElement,
  event: keyof HTMLElementEventMap,
  cb: EventListenerOrEventListenerObject,
  opt: boolean | AddEventListenerOptions
) => el.addEventListener(event, cb, opt);
export const off = (
  el: HTMLElement,
  event: keyof HTMLElementEventMap,
  cb: EventListenerOrEventListenerObject,
  opt: boolean | AddEventListenerOptions
) => el.removeEventListener(event, cb, opt);
