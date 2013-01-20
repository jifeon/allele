define(['ofio/ofio', 'vendor/jquery.min', 'vendor/jquery.mousewheel'], function(Ofio){
  var module = new Ofio.Module({
    name         : 'thread.mouse',
    dependencies : arguments
  });

  module.init = function(){
    this.k_zoom = 0.95;
    this.k_move = 20;
    this.shift_k_move = 8;
    this.shift_k_zoom = 2;
    this.start_x = null;
    this.start_offset = null;

    this.mousemove = _.debounce(this.mousemove.bind(this));
    this.mouseup = _.debounce(this.mouseup.bind(this));
  };

  module.events = {
    'mousewheel'         : 'mousewheel',
    'mousedown'          : 'mousedown'
  };

  module.mousewheel = function(e, delta, delta_x, delta_y){
    var k;
    if (delta_x || e.ctrlKey && delta_y) {
      k = e.shiftKey ? this.k_move * this.shift_k_move : this.k_move;
      this.move(delta * k);
    }
    else if (delta_y) {
      k = e.shiftKey ? this.k_zoom / this.shift_k_zoom : this.k_zoom;
      this.resize(e, delta_y < 0 ? k : 1/k);
    }
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
    var delta = e.pageX - this.start_x;
    if (e.shiftKey) delta *= this.shift_k_move;
    this.offset = this.start_offset + delta;

    this.start_x = e.pageX;
    this.start_offset = this.offset;

    this.redraw();
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

  module.resize = function(e, k){
    var width_before = this.full_width();
    this.zoom *= k;
    var width_after = this.full_width();
    var left = e.pageX - this.offset;

    this.offset -= left * (width_after - width_before) / width_before;
    this.redraw();
  };

  return module;
});