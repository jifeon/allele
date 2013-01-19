define([
  'ofio/ofio'
], function(Ofio){
  var OperationsManager = new Ofio({
    modules : arguments
  });


  OperationsManager.prototype.init = function(){
    
  };

  return OperationsManager;
});