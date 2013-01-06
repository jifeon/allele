define(['ofio/ofio', 'ofio/ofio.model'], function(Ofio){
  var Point = new Ofio({
    modules : arguments
  });


  Point.prototype.attributes = function(){
    this.value = 0;
  };


  return Point;
});