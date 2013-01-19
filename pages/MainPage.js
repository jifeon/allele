define(['ofio/ofio', 'pages/Page', 'Thread', 'Point'], function(Ofio, Page, Thread, Point){
  var MainPage = new Ofio({
    extend: Page
  });


  MainPage.prototype.init = function(){
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