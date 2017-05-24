var wHeight = $(window).height();
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var cronometro = false;
var intervalo;
var createInit = false;
var velocity = 50;


$(function(){


  var states = new Array({
    splash: true,
    pause: false,
    game: false
  })

  function removerPista(){
    $('#view > .pista-red').last().remove();
  };

  $("#play").click(function(){

    var elm = $("#pista");
    var btn = $("#play");

    if(btn.attr("src") == "assets/play.png") {
      $(btn).attr("src", "assets/pause.png")
    } else {
      $(btn).attr("src", "assets/play.png")
    }

  });

  function criarPista(ref){

    var divNova = "<div class='pista-red' style='bottom:" + ref + "px;'></div>"

    $('#view > .pista-red').first().before(divNova);

  };

  function correr() {

    var proximoObj = $("#view > .pista-red").first();
    var proximoObjY = parseInt(Number($("#view > .pista-red").first().css("bottom").replace("px","")));
    var objetoAtual = $("#view > .pista-red").last();
    var objetoAtualY = parseInt(Number($("#view > .pista-red").last().css("bottom").replace("px","")));

    console.log(objetoAtualY);

    if(proximoObjY <= 26) {
      var refTop = proximoObjY + 925;
      objetoAtual.remove();
      criarPista(refTop);
    }

    var proximoObj = $("#view > .pista-red").first();
    var proximoObjY = parseInt(Number($("#view > .pista-red").first().css("bottom").replace("px","")));
    var objetoAtual = $("#view > .pista-red").last();
    var objetoAtualY = parseInt(Number($("#view > .pista-red").last().css("bottom").replace("px","")));

    $(proximoObj).css({bottom: parseInt(proximoObjY - velocity) + "px"});
    $(objetoAtual).css({bottom: parseInt(objetoAtualY - velocity) + "px"});

  }

  // $(window).scroll(function(){
  //   console.log(Number($(window).scrollTop()));
  // })

  var left  = document.getElementById("leftFinger");
  var right = document.getElementById("rightFinger");

  var leftFinger  = new Hammer(left);
  var rightFinger = new Hammer(right);

  leftFinger.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  rightFinger.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

  leftFinger.on('swipe', function(ev) {

    correr();
    // criarPista();

  });

  rightFinger.on('swipe', function(ev) {

    // criarPista();
    correr();

  });

})

function removerPista(){
  $('#view > .pista-red').last().remove();
};
