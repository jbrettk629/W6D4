const DomNodeCollection = require('./dom_node_collection.js');


window.$l = function (selector) {
  if (selector.constructor.name === "String") {
    const list = document.querySelectorAll(selector);
    const listArr = Array.from(list);
    return new DomNodeCollection(listArr);
  }
  if (selector instanceof HTMLElement){
    return new DomNodeCollection([selector]);
  }
  
};