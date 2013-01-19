define([
  'ofio/ofio',
  'ofio/ofio.idb'
], function(Ofio, ThreadPoint){
  var Page = new Ofio({
    modules : arguments
  });

  return Page;
});