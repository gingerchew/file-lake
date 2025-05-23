import { FileLake } from "./element";
import { FLFileList } from "./file-list";
import { FLMouseTracker } from "./mouse-tracker";

export const define = (name = "file-lake") => {
	customElements.define("mouse-tracker", FLMouseTracker);
	customElements.define("file-list", FLFileList);
	customElements.define(name, FileLake);
};
