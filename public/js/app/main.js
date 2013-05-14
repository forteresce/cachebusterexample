"use strict";

require(['jquery', 'app/dependency'], function($, dep) {
  
  $(function() {
    $('#btn').click(function(e) {
      e.preventDefault();
      $('#result').text('Sum: ' + dep.sum.apply(null, $('#numbers').val().split(',')));
    });
  });
  
});