"use strict";

define([], function() {

  function sum () {
    var index, result = 0, num;

    if (arguments.length) {
      for(index = 0; index < arguments.length; index++) {
        num = parseInt(arguments[index]);

        if (!isNaN(num)) {
          result += num;
        }
      }
    }

    return result;
  }

  return {
    sum: sum
  };
});
