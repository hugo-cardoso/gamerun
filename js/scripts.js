var wHeight = $(window).height();
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var cronometro = false;
var intervalo;
var createInit = false;
var velocity = 75;
var volta = 0;
var countVolta = false;


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

  function addVolta() {
    volta = volta + 1;
    $("#volta").html(volta);
  }

  function criarPista(ref){

    nivel = nivel+1;

    console.log(nivel)

    if(nivel == 1){
      var divNova = "<div class='cenario largada' style='bottom:" + ref + "px;'></div>"
      countVolta =  true;
    } else if (nivel == 2) {
      if(countVolta){
          addVolta();
      }
      var divNova = "<div class='cenario pista' style='bottom:" + ref + "px;'></div>"

    } else {
      var divNova = "<div class='cenario nivel1' style='bottom:" + ref + "px;'></div>"
      nivel = 0;
    }

    $('#view > .cenario').first().before(divNova);

  };

  function correr() {

    // if(velocity <= 50) {
    //
    // } else {
    //
    // }

    var proximoObj = $("#view > .cenario").first();
    var proximoObjY = parseInt(Number($("#view > .cenario").first().css("bottom").replace("px","")));
    var objetoAtual = $("#view > .cenario").last();
    var objetoAtualY = parseInt(Number($("#view > .cenario").last().css("bottom").replace("px","")));

    console.log(objetoAtualY);

    if(proximoObjY <= 26) {
      var refTop = proximoObjY + 817;
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

  $(window).keydown(function( event ) {
    if ( event.which == 38 ) {
      correr();
    }
  })

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
