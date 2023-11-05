import createElement from "./createElement.js";

/**
 *
 * @param {string} inputClass HTMLElements.selector
 * @param {string} placeholder
 * @param {string} value
 * @param {{string: string}} dataAttributes
 * */
export default function createInput(
  inputClass,
  placeholder,
  value,
  dataAttributes,
) {
  let attr = [{ type: "text" }];
  if (placeholder) {
    attr.concat([{ placeholder: `${placeholder}` }]);
  }
  if (value) {
    attr.concat([{ value: `${value}` }]);
  }
  if (dataAttributes) {
    attr.concat([{ "data-translate": "[placeholder]weather-city-input" }]);
  }
  this.HTMLElements[inputToSearch].element = createElement(
    "input",
    inputClass,
    null,
    attr,
  );
  this.HTMLElements[inputToSearch].selector = `.${inputClass}`;
}
