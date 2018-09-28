const DomNodeCollection = require('./dom_node_collection.js');


window.$l = function (selector) {
  const arrayQueue = [];
  if (selector.constructor.name === "String") {
    const list = document.querySelectorAll(selector);
    const listArr = Array.from(list);
    return new DomNodeCollection(listArr);
  }
  if (selector instanceof HTMLElement){
    return new DomNodeCollection([selector]);
  }
  if (selector instanceof Function){
    console.log("We are hitting This!");
    arrayQueue.push(selector);
  }
  document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    for (let i = 0; i < arrayQueue.length; i++){
        console.log("Entered FOr Loop!");
      arrayQueue[i]();
    }
  });
  
};
