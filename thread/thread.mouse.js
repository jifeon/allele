define(['ofio/ofio', 'vendor/jquery.min', 'vendor/jquery.mousewheel'], function(Ofio){
  var module = new Ofio.Module({
    name         : 'thread.mouse',
    dependencies : arguments
  });

  module.init = function(){
    this.k_zoom = 0.95;
  };

  module.events = {
    'mousewheel'         : 'mousewheel',
    'mousedown'          : 'mousedown',
    'mousemove document' : 'mousemove',
    'mouseup document'   : 'mouseup'
  };

  module.mousewheel = function(e, delta, delta_x, delta_y){
    if (delta_x) this.move(delta_x);
    if (delta_y) this.resize(e, delta_y);
    return false;
  };

  module.mousedown = function(){

  };

  module.mousemove = function(){

  };

  module.mouseup = function(){

  };

  module.move = function(delta){

  };

  module.resize = function(e, delta){
    var width_before = this.full_width();
    this.zoom *= delta > 0 ? this.k_zoom : 1 / this.k_zoom;
    var width_after = this.full_width();
    var left = e.pageX - this.offset;

    this.offset -= left * (width_after - width_before) / width_before;
    this.redraw();
  };

  return module;
});