
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
}

module.exports = DomNodeCollection;