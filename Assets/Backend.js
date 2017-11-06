var Calculator = {
  //Variables
  in_memory_value: "",
  calculator_screen: "calculator-screen",
  calculator_result: "calculator-result",
  result_value: "",

  //Constants declaration
  ADD: "+",
  SUB: "-",
  MUL: "*",
  DIV: "/",
  MOD: "%",
  BRO: "(",
  BRC: ")",
  SQT: "sqrt (",
  SIN: "sin (",
  COS: "cos (",
  TAN: "tan (",
  ASIN: "asin (",
  ACOS: "acos (",
  ATAN: "atan (",
  RANDOM: "random number",
  LOG: "log (",

  //Calculate and update result textbox
  calculate: function() {
    this.result_value = this.engine.execute(this.in_memory_value);
    this.update_result();
  },

  //Clear all inputs click event of button 'C'
  clear: function() {
    document.getElementById(this.calculator_screen).innerHTML = "";
    document.getElementById(this.calculator_result).innerHTML = "";
    this.in_memory_value = "";
    this.result_value = "";
  },

  //Delete last number from input and set result as ''
  delete: function() {
    document.getElementById(this.calculator_result).innerHTML = "";
    var screen_txtbox = document.getElementById(this.calculator_screen);
    var length = screen_txtbox.innerHTML.length - 1;
    screen_txtbox.innerHTML = screen_txtbox.innerHTML.substr(0, length);
    this.in_memory_value = screen_txtbox.innerHTML;
  },

  //Execute operation; supports scientific calculations
  engine: {
    execute: function(value) {
      try {
        return eval(this.parse(value));
      } catch (err) {
        alert("Error occured");
      }
    },

    parse: function(value) {
      if (value != null || value != "") {
        //Power function Math.pow(base, exponant)
        if (value.indexOf("^") != -1) {
          var index = value.indexOf("^");
          var length = value.length;

          var base = value.substr(0, index);
          var exponant = value.substr(index + 1, length);
          value = "Math.pow(" + base + "," + exponant + ")";
        }

        //Replace string with its original math function
        value = this.replaceFunction(value, "sqrt", "Math.sqrt");
        value = this.replaceFunction(value, "sin", "Math.sin");
        value = this.replaceFunction(value, "cos", "Math.cos");
        value = this.replaceFunction(value, "tan", "Math.tan");
        value = this.replaceFunction(value, "asin", "Math.asin");
        value = this.replaceFunction(value, "acos", "Math.acos");
        value = this.replaceFunction(value, "atan", "Math.atan");
        value = this.replaceFunction(value, "random number", "Math.random()");
        value = this.replaceFunction(value, "log", "Math.log");

        return value;
      }
      return 0;
    },

    //Implementation of replace function
    replaceFunction: function(value, reg, fun) {
      return value.replace(new RegExp("\\b" + reg + "\\b", "g"), fun);
    }
  },

  //Append new value into input textbox
  put: function(value) {
    this.in_memory_value += value;
    this.update_memory();
  },

  //Update inner html of calculator's input textbox
  update_memory: function() {
    document.getElementById(
      this.calculator_screen
    ).innerHTML = this.in_memory_value;
  },

  //Update inner html of calculator's result textbox
  update_result: function() {
    document.getElementById(
      this.calculator_result
    ).innerHTML = this.result_value;
  }
};

//Ready function
$(document).ready(function() {
  $(".btn").click(function(e) {
    e.preventDefault();

    if ($(this).data("constant") != undefined) {
      return Calculator.put(Calculator[$(this).data("constant")]);
    }

    if ($(this).data("method") != undefined) {
      return Calculator[$(this).data("method")]();
    }

    return Calculator.put($(this).html());
  });
});
