
class DomNodeCollection {
  constructor(array) {
    this.elements = array;
  }
  
  html(args){
    if (arguments.length === 0){
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach(e => e.innerHTML = args);
    }
  }
  
  empty() {
    this.elements.forEach(e => e.innerHTML = "");
  }
  
  append(arg) {
    this.elements.forEach(el => {
        el.append(arg.outerHTML);
    });
  }
  
  attr(name, val) {
    this.elements.forEach(e => e.setAttribute(name, val));
  }
  
  addClass(className) {
    this.elements.forEach(e => e.classList.add(className));
  }
  
  removeClass(className) {
    this.elements.forEach(e => e.classList.remove(className));
  }
  
  children(){
    let result = [];
    for (let i = 0; i < this.elements.length; i++){
      if (this.elements[i].children.length === 0){
        result.push(this.elements[i]);
      } else {
        result.concat(Array.from(this.elements[i].children));
        // let currentNode = new DomNodeCollection(Array.from(this.elements[i].children));
        result.push(this.elements[i]);
      }
    }
    return new DomNodeCollection(result);
  }
  
  parent(){
    let result = [];
    for(let i=0;i<this.elements.length;i++) {
      if (this.elements[i].parentElement && result.indexOf(this.elements[i].parentElement) < 0) {
        result.push(this.elements[i].parentElement);
      }  
    }
    return new DomNodeCollection(result);
  }
  
  find(string) {
    let result = [];
    for(let i=0;i<this.elements.length;i++) {
      result.push(this.elements[i].querySelectorAll(string));
    }
    
    return new DomNodeCollection(result);
  }
  
  remove(){
    // this.empty();
    for (let i = 0; i < this.elements.length; i++){
      this.elements[i].parentNode.removeChild(this.elements[i]);
    }
  }
  
  on(action, callback){
    const handleAction = (e) => {
      callback(e);
    };
    for (let i = 0; i < this.elements.length; i++){
      this.elements[i].addEventListener(action, handleAction);
      this.callback = handleAction;
    }
  }
  
  off(action, callback = this.callback){
    console.log(`this is the callback: ${this.callback}`);
    for (let i = 0; i < this.elements.length; i++){
        this.elements[i].removeEventListener(action, callback);
    }
  }
}



module.exports = DomNodeCollection;