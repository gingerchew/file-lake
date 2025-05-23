import { FileLake } from "./element";
import { FLFileList } from "./file-list";

export const define = (name = "file-lake") => {
	customElements.define("file-list", FLFileList);
	customElements.define(name, FileLake);
};
