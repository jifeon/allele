define([
  'ofio/ofio',
  'ofio/ofio.model'
], function(Ofio){
  var OperationsNode = new Ofio({
    modules : arguments
  });


  OperationsNode.prototype.attributes = function(){
    this.amount = 0;
  };


  OperationsNode.prototype.init = function(){

  };

  return OperationsNode;
});