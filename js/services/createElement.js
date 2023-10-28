/*params:
 * tag: string
 * className: staring
 * parentElement: HTMLElement
 * attributes: array of objects*/

export default function createElement(
  tag,
  className,
  parentElement,
  attributes,
) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (parentElement) parentElement.append(element);
  if (attributes) {
    attributes.forEach((attr) => {
      const key = Object.keys(attr)[0];
      if (key.split("-").includes("data")) {
        const datasetName = this.createDatasetName(key);
        element.dataset[datasetName] = attr[key];
      } else {
        element.setAttribute(key, attr[key]);
      }
    });
  }
  return element;
}
