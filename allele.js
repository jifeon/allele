requirejs.config({
//  baseUrl: 'js/lib',
  paths: {
    sugar: 'sugar/lib'
  }
});

requirejs(['Thread', 'Point', 'vendor/jquery.min'], function (Thread, Point) {
  window.thread = new Thread({
    $el: $('canvas')
  });

  var points = [];

  for(var i = 0; i < 30; i++){
    points.push(new Point({
      value : Math.round(Math.random() * 110)
    }));
  }

  thread.set_points(points);
});