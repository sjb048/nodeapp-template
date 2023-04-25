const fs = require('fs');
const path = require('path');
loadModel =(model)=>{
    let coreModel =  require(`../app/models/${model}`);
    return new coreModel;
};

loadLibrary = (library) => {
    return require(`../app/libraries/${library}`);
};

loadENV = () =>{
    return require(`../env`);
};



