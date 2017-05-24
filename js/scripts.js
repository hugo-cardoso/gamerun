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

  var nivel = 1;

  var niveis = new Array({
    bg: "largada"
  },{
    bg: "nivel1"
  },{
    bg: "pista"
  })

  function removerPista(){
    $('#view > .cenario').last().remove();
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

    nivel = nivel+1;

    console.log(nivel)

    if(nivel == 1){

      var divNova = "<div class='cenario largada' style='bottom:" + ref + "px;'></div>"

    } else if (nivel == 2) {

      var divNova = "<div class='cenario pista' style='bottom:" + ref + "px;'></div>"

    } else {

        var divNova = "<div class='cenario nivel1' style='bottom:" + ref + "px;'></div>"
        nivel = 0;
    }

    $('#view > .cenario').first().before(divNova);

  };

  function correr() {

    var proximoObj = $("#view > .cenario").first();
    var proximoObjY = parseInt(Number($("#view > .cenario").first().css("bottom").replace("px","")));
    var objetoAtual = $("#view > .cenario").last();
    var objetoAtualY = parseInt(Number($("#view > .cenario").last().css("bottom").replace("px","")));

    console.log(objetoAtualY);

    if(proximoObjY <= 26) {
      var refTop = proximoObjY + 925;
      objetoAtual.remove();
      criarPista(refTop);
    }

    var proximoObj = $("#view > .cenario").first();
    var proximoObjY = parseInt(Number($("#view > .cenario").first().css("bottom").replace("px","")));
    var objetoAtual = $("#view > .cenario").last();
    var objetoAtualY = parseInt(Number($("#view > .cenario").last().css("bottom").replace("px","")));

    $(proximoObj).css({bottom: parseInt(proximoObjY - velocity) + "px"});
    $(objetoAtual).css({bottom: parseInt(objetoAtualY - velocity) + "px"});

  }

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
  $('#view > .cenario').last().remove();
};
