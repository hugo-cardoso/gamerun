$(function(){

  var pistaY = 8000;
  var centesimas = 0;
  var segundos = 0;
  var minutos = 0;
  var horas = 0;
  var cronometro = false;
  var intervalo;

  $("#play").click(function(){

    var elm = $("#pista");
    var btn = $("#play");

    if(btn.attr("src") == "assets/play.png") {
      parar();
      $(btn).attr("src", "assets/pause.png")
    } else {
      volta();
      $(btn).attr("src", "assets/play.png")
    }



  });

  function tempo(op) {
    cronometro = true;
    if (op == 1) {
      // document.getElementById('parar').style.display = "block";
      // document.getElementById('comeca').style.display = "none";
    }
    var s = 1;
    var m = 0;
    var h = 0;
    intervalo = window.setInterval(function() {
      if (s == 60) { m++; s = 0; }
      if (m == 60) { h++; s = 0; m = 0; }
      if (h < 10) document.getElementById("hora").innerHTML = "0" + h + ":"; else document.getElementById("hora").innerHTML = h + "h";
      if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + ""; else document.getElementById("segundo").innerHTML = s + "s";
      if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + ":"; else document.getElementById("minuto").innerHTML = m + "m";
      s++;
    },1000);
  }

  function parar() {
    cronometro = false;
    window.clearInterval(intervalo);
    // document.getElementById('parar').style.display = "none";
    // document.getElementById('comeca').style.display = "block";
  }

  function volta() {
    document.getElementById('voltas').innerHTML += document.getElementById('hora').firstChild.data + "" + document.getElementById('minuto').firstChild.data + "" + document.getElementById('segundo').firstChild.data + "<br>";
  }

  function limpa() {
    document.getElementById('voltas').innerHTML = "";
  }

  function correr() {

    if(cronometro == false) {
      tempo();
    }

    pistaY = pistaY + 150;

    $("#pista").css("background-position", "0px " + pistaY + "px");

  }

  var left  = document.getElementById("leftFinger");
  var right = document.getElementById("rightFinger");

  var leftFinger  = new Hammer(left);
  var rightFinger = new Hammer(right);

  leftFinger.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  rightFinger.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  leftFinger.on('swipe', function(ev) {

    correr();

  });

  rightFinger.on('swipe', function(ev) {

    correr();

  });

})
