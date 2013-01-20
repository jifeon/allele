define([
  'ofio/ofio',
  'pages/Page',
  'Thread',
  'Point',
  'db/db_versions'
], function(Ofio, Page, Thread, Point, db_versions){
  var MainPage = new Ofio({
    extend: Page
  });


  MainPage.prototype.db = {
    name      : 'allele',
    version   : 2,
    versions  : db_versions
  };


  MainPage.prototype.init = function(){
    MainPage.parent.init.call(this);

    this.thread = new Thread({
      $el: $('canvas')
    });

    var points = [];
    for(var i = 0; i < 30; i++){
      points.push(new Point({
        value : Math.round(Math.random() * 110)
      }));
    }

    this.thread.set_points(points);
  };


  return MainPage;
});