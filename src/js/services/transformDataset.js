function getAction(dataset){
    return dataset.split('-')[dataset.split('-').length - 1];
  }


function toggleDatasetName(element, datasetName){
  if(datasetName === 'translate'){
    const oldDataset = element.dataset.translate
    const action = oldDataset.split('-')[oldDataset.split('-').length - 1] === 'off' ? 'on' : 'off';
    let newDataset = oldDataset.split('-').slice(0, oldDataset.split('-').length - 1).concat([action]).join('-');
    return [oldDataset, newDataset];
  }
}




export {toggleDatasetName, getAction};
