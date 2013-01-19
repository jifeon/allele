define([
  'ofio/ofio',
  'ofio/ofio.model'
], function(Ofio){
  var Operation = new Ofio({
    modules : arguments
  });


  Operation.prototype.attributes = function(){
    this.amount = 0;
  };


  Operation.prototype.init = function(){

  };

  return Operation;
});