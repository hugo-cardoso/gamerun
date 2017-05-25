var wHeight = $(window).height();
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var cronometro = false;
var intervalo;
var createInit = false;
var velocity = 105;
var volta = 0;
var countVolta = false;
var nivel = 1;

var tapSound = new buzz.sound("assets/tap.mp3");

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

function run(){
  $("#view").toggleClass("active");
};

function correr() {

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

  tapSound.play();
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
