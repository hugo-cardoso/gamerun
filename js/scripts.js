var wHeight = $(window).height();
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var cronometro = false;
var intervalo;
var createInit = false;
var velocity = 0;
var volta = 0;
var countVolta = false;
var nivel = 1;
var points = 0;
var level = 0;

var tapSound = new buzz.sound("assets/tap.mp3");
var completeSound = new buzz.sound("assets/complete.mp3");

function removerPista(){
  $('#view > .cenario').last().remove();
};

function addVolta() {
  volta = volta + 1;
  completeSound.play();
  $("#volta").html(volta);
}

function criarPista(ref){

  nivel = nivel+1;

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

setInterval(function(){
  if(velocity <= 0){

  } else {
    velocity = parseInt(velocity - (velocity * 0.1));
    // correr();
  }
}, 1000);

$(".challenge").click(function(){
  $(this).hide();
});

function createChellenger(){
  $(".challenge").show();
  setTimeout(function(){
    if($(".challenge").css("display") === "block"){
      level = 0;
      velocity = 0;
      points = points - parseInt(points / 2);

      $("#speed").html(velocity);
      $("#points").html(points);

      $(".challenge").hide();
    }
  }, 3000);
}

function correr() {

  velocity = velocity + 10;
  $("#speed").html(velocity);
  points += parseInt(velocity * 0.02);
  $("#points").html(points);

  console.log(velocity);

  var proximoObj = $("#view > .cenario").first();
  var proximoObjY = parseInt(Number($("#view > .cenario").first().css("bottom").replace("px","")));
  var objetoAtual = $("#view > .cenario").last();
  var objetoAtualY = parseInt(Number($("#view > .cenario").last().css("bottom").replace("px","")));

  if(proximoObjY <= 26) {
    var refTop = proximoObjY + 817;
    objetoAtual.remove();
    criarPista(refTop);
  }

  if(velocity >= 300 && level != 1) {
    level = 1;
    console.log("Level 1")
    createChellenger();
  } else if (velocity >= 400 && velocity <= 500 && level != 2) {
    level = 2;
    console.log("Level 2")
    createChellenger();
  } else if (velocity >= 500 && velocity <= 600 && level != 3) {
    level = 3;
    console.log("Level 3")
    createChellenger();
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

leftFinger.on('swipedown', function(ev) {

  correr();

});

rightFinger.on('swipedown', function(ev) {

  correr();

});
