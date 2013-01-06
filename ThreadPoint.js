define(['ofio/ofio', 'ofio/ofio.model', 'ofio/ofio.cache', 'vendor/underscore'], function(Ofio){
  var ThreadPoint = new Ofio({
    modules : arguments
  });


  ThreadPoint.prototype.attributes = function(){
    this.thread = null;
    this.point = null;
    this.n = null;
  };


  ThreadPoint.prototype.init = function(){
    this.point.on('change:value', this.reset_cache.bind(this));
  };


  ThreadPoint.prototype.reset_cache = function(){
    this.x.reset_cache();
    this.y.reset_cache();
    this.back_x.reset_cache();
    this.back_y.reset_cache();
    this.front_x.reset_cache();
    this.front_y.reset_cache();
  };


  ThreadPoint.prototype.x = function(){
    return Math.round((this.n - this.thread.start_point()) * this.thread.width() / this.thread.steps());
  }.cache();


  ThreadPoint.prototype.y = function(){
    return Math.round(this.thread.height() - this.point.value + 10);
  }.cache();


  ThreadPoint.prototype.back_x = function(){
    return this.x() - this.thread.bezier_width;
  }.cache();


  ThreadPoint.prototype.back_y = function(){
    return this.y();
  }.cache();


  ThreadPoint.prototype.front_x = function(){
    return this.x() + this.thread.bezier_width;
  }.cache();


  ThreadPoint.prototype.front_y = function(){
    return this.y();
  }.cache();


  return ThreadPoint;
});