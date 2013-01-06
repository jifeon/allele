define(['ofio/ofio', 'vendor/jquery.min', 'vendor/jquery.mousewheel'], function(Ofio){
  var module = new Ofio.Module({
    name         : 'thread.mouse',
    dependencies : arguments
  });

  module.init = function(){
    this.k_zoom = 0.95;
    this.start_x = null;
    this.start_offset = null;

    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
  };

  module.events = {
    'mousewheel'         : 'mousewheel',
    'mousedown'          : 'mousedown'
  };

  module.mousewheel = function(e, delta, delta_x, delta_y){
    if (delta_x) this.move(delta_x);
    if (delta_y) this.resize(e, delta_y);
    return false;
  };

  module.mousedown = function(e){
    this.start_x = e.pageX;
    this.start_offset = this.offset;

    $(document)
      .bind('mousemove', this.mousemove)
      .bind('mouseup', this.mouseup);
  };

  module.mousemove = function(e){
    this.offset = this.start_offset + e.pageX - this.start_x;
  };

  module.mouseup = function(){
    $(document)
      .unbind('mousemove', this.mousemove)
      .unbind('mouseup', this.mouseup);
  };

  module.move = function(delta){
    this.offset += delta;
    this.redraw();
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