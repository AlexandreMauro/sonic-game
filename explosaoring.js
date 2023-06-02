//Arquivo: explosaoring.js
//Função construtura para objeto explosão

var SOM_RING = new Audio();
SOM_RING.src = 'snd/pegou-ring.mp3';
SOM_RING.volume = 0.4;
SOM_RING.load();

function ExplosaoRing(context, imagem, x, y) {
   /*
   this.context = context;
   this.imagem = imagem;

   //Definindo o quadro do spritesheet | linha 1 e coluna 5
   this.spritesheet = new Spritesheet(context, imagem, 1, 5);
   //Definir um intervalo de tempo para mudança de quadro
   this.spritesheet.intervalo = 75;
   this.x = x;
   this.y = y;
   this.animando = false;
   
   var explosaoring = this;
   this.fimDaExplosaoRing = null;
   this.spritesheet.fimDoCiclo = function() {
      explosao.animacao.excluirSprite(explosaoring);
      if (explosaoring.fimDaExplosaoRing) explosao.fimDaExplosaoRing();
   }
   */
   SOM_RING.currentTime = 0.0;
   SOM_RING.play();
}
/*
ExplosaoRing.prototype = {
   atualizar: function() {
      
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Desenhamos o quadro atual e animamos a spritesheet
   desenhar: function() {
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   }
}
*/