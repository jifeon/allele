define([
  'ofio/ofio',
  'ThreadPoint',
  'ofio/ofio.jquery',
  'ofio/ofio.canvas',
  'ofio/ofio.cache',
  'thread/thread.mouse'
], function(Ofio, ThreadPoint){
  var Thread = new Ofio({
    modules : arguments
  });


  Thread.prototype.init = function(){
    this.points = null;
    this.offset = 0;
    this.zoom = 1;
    this.translate = 0;

    Object.defineProperty(this, 'bezier_width', {
      get : bezier_width
    });

    this.on('ofio.canvas.update', this.redraw);
  };


  var bezier_width = function(){
    var steps = this.steps();
    return steps ? this.width() / steps / 2 : 0;
  };


  Thread.prototype.steps = function(){
    return this.end_point() - this.start_point();
  };


  Thread.prototype.width = function(){
    return this.shown_steps() * this.step_width();
  }.cache();


  Thread.prototype.shown_steps = function(){
    var step_width = this.step_width();
    var shown_steps = Math.floor(this.canvas.width / step_width);
    if (shown_steps * step_width < this.canvas.width) {
      shown_steps = Math.min(shown_steps + 0  , this.all_steps());
    }

    return shown_steps;
  }.cache();


  Thread.prototype.start_point = function(){
    return Math.max(Math.floor(-this.offset / this.step_width()), 0)
  }.cache();


  Thread.prototype.end_point = function(){
    return Math.min(this.start_point() + this.shown_steps(), this.all_steps());
  }.cache();


  Thread.prototype.translation = function(){
    return Math.round(this.offset + this.step_width() * this.start_point());
  }.cache();


  Thread.prototype.height = function(){
    return 100;
  };


  Thread.prototype.full_width = function(){
    return this.canvas.width * this.zoom;
  };


  Thread.prototype.all_steps = function(){
    return this.points.length - 1;
  };


  Thread.prototype.step_width = function(){
    return this.full_width() / this.all_steps();
  }.cache();


  Thread.prototype.set_points = function(points){
    this.points = points.map(function(point, i){
      return new ThreadPoint({
        point  : point,
        thread : this,
        n      : i
      });
    }, this);

    this.redraw();
  };


  Thread.prototype.each_point = function(f, context){
    var start_point = this.start_point();
    var end_point = this.end_point();
    for (var i = start_point; i <= end_point; i++)
      f.call(context || this, this.points[i], i, this.points, i == start_point, i == end_point);
  };


  Thread.prototype.redraw = function(){
    this.reset_cache();
    this.points.forEach(function(point){
      point.reset_cache();
    });

    this.clear_canvas();
    this.ctx.save();
    this.ctx.translate(this.translation(), 0);
    this.draw_thread();
    this.draw_divisions();
    this.ctx.restore();
  };


  Thread.prototype.draw_thread = function(){
    var ctx = this.ctx;

    ctx.fillStyle = 'rgba(17, 144, 194, 0.2)';
    ctx.beginPath();
    this.draw_surface();
    ctx.lineTo(this.width(), this.height());
    ctx.lineTo(0, this.height());
    ctx.fill();
  };


  Thread.prototype.draw_surface = function(){
    this.each_point(function(point, i, points, first, last){
      if (!first) this.ctx.bezierCurveTo(
        points[i - 1].front_x(), points[i - 1].front_y(),
        point.back_x(), point.back_y(),
        point.x(), point.y()
      );

      else this.ctx.moveTo(point.x(), point.y());
    }, this);
  };


  Thread.prototype.draw_divisions = function(){
    var ctx = this.ctx;

    var step_width = this.width() / this.steps();
    if (step_width < 15) return;
    var line_width = ctx.lineWidth = step_width < 100 ? 1 : 2;
    ctx.strokeStyle = 'gray';

    this.each_point(function(point, i, points, first, last){
      if (first || last) return;

      ctx.beginPath();
      ctx.moveTo(point.x() - line_width/2, 0);
      ctx.lineTo(point.x() - line_width/2, this.height());
      ctx.stroke();
    }, this);
  };


//  Thread.prototype.clear = function(){
//    this.ctx.clearRect(0, 0, this.width(), this.height());
//  };


  return Thread;
});