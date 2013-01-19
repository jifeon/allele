define([
  'ofio/ofio'
], function(Ofio){
  var Page = function(modules){
    var PageClass = new Ofio({
      modules : modules,
      extend  : Page.getLast()
    });

    Page.classes.push(PageClass);

    return PageClass;
  };


  Page.classes = [];


  Page.init = function(){
    window.page = new (this.getLast() || Ofio);
  };


  Page.getLast = function(){
    var pages_count = Page.classes.length;
    return pages_count ?  Page.classes[pages_count - 1] : null;
  };


  return Page;
});