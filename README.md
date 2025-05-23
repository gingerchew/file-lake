# FileLake

> A pretty drag and drop file uploader built with web components

# Example

```html
<form>
	<file-lake name="files"></file-lake>
</form>
<script type="module">
	import { define } from "file-lake";
	define();
</script>
```

This will generate a clean looking file upload interface for users to drag and drop files onto.

## TODO

- UX
    - [ ] Dragging a file over the lake should show an indicator to the user
    - [ ] Items in the file list should be removable (add a close button to list item)
- Animations
    - [ ] Mouse indicator animation is a little janky
    - [ ] Dropping or selecting a file should animate in nicely (view transitions?)
    - [ ] As more files are added, the lake should grow to fit the list
- Functionality
    - [ ] Accept type should inherit from attribute on `file-lake`
    - [ ] Size Limitations, able to be set with attribute `size-limit`

### Thanks to

- FilePond by PQina
    - Thank you for raising the bar for file upload inputs and inspiring this side project.
