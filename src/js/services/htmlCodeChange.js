import translate from "../data/translation/translation.js";

const htmlCodeChange = {
  datasetChange(datasetName, oldDatasetValue, newDatasetValue){
    document.querySelector(`[data-${datasetName}="${oldDatasetValue}"]`).dataset[datasetName] = `${newDatasetValue}`;
  },

  blockInnerToggle(element, lang, elementDataset){
    element.innerHTML = translate[lang][elementDataset];
  },
}



export default htmlCodeChange;