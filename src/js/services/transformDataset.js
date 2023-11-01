function getAction(dataset){
    return dataset.split('-')[dataset.split('-').length - 1];
  }


function toggleDataset(element){
  if(this.datasetName === 'translate'){
    const field = element.dataset.translate
    let oldDataset = field;
    const action = field.split('-')[field.split('-').length - 1] === 'off' ? 'on' : 'off';
    let newDataset = field.split('-').slice(0, field.split('-').length - 1).concat([action]).join('-');
    return [oldDataset, newDataset];
  }
};

export {toggleDataset, getAction};
