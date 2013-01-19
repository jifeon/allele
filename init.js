requirejs.config({
//  baseUrl: 'js/lib',
//  paths: {
//  }
});

requirejs(['pages/MainPage'], function (Page) {
  window.page = new Page;
});