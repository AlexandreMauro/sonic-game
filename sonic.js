//Arquivo: sonic.js
//Função construtura para objeto sonic
/*No construtor da classe 'Sonic', vamos iniciar o objeto que 
 controla a spritesheet. Usaremos inicialmente a linha zero, 
 que representa a nave parada. */

function Sonic(context, teclado, imagem, imgExplosao) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 0;
   this.y =0;
   this.velocidade = 0;
   //O sprite inicia na linha 3 e coluna 2
   this.spritesheet = new Spritesheet(context, imagem, 3, 2);
   this.spritesheet.linha = 0;
   this.spritesheet.intervalo = 100;
   this.imgExplosao = imgExplosao;
   this.acabaramVidas = null;
   this.vidasExtras = 3;
}
/*Devemos cronometrar o movimento da 'Sonic' aplicando no método 
'atualizar', a fórmula a seguir: 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores em 
'sonic.velocidade' da página HTML.*/

Sonic.prototype = {
   /*São quatro 'if', sem o uso do 'else', para permitir que 
   mais de uma seta possam estar pressionadas ao mesmo tempo.
   Isso permite mover a nave na diagonal.*/
   atualizar: function() {
      var incremento = 
          this.velocidade * this.animacao.decorrido / 1000;
      
      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
         this.x -= incremento;
         
      if (this.teclado.pressionada(SETA_DIREITA) && 
               this.x < this.context.canvas.width - 36)
         this.x += incremento;
         
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   /*Tratando a spritesheet da nave:
   - Selecionar o quadro da spritesheet
   - Para definir a linha a ser animada, lemos o estado das setas do teclado
   */
   desenhar: function() {
      if (this.teclado.pressionada(SETA_ESQUERDA))
         this.spritesheet.linha = 1;
      else if (this.teclado.pressionada(SETA_DIREITA))
         this.spritesheet.linha = 2;
      else
         this.spritesheet.linha = 0;      
      
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Tratar as colisões | Definir retângulos de colisão
   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
         {x: this.x+7, y: this.y+39, largura: 29, altura: 33},
         {x: this.x+27, y: this.y+23, largura: 30, altura: 53},
         {x: this.x+39, y: this.y+39, largura: 29, altura: 33}
      ];
      
      // Desenhando os retângulos para visualização | Comentar após concluir modificações
      var ctx = this.context;
      /*
      for (var i in rets) {
         ctx.save();
         ctx.strokeStyle = 'yellow';
         ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
                        rets[i].altura);
         ctx.restore();
      }*/
      
      return rets;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   colidiuCom: function(outro) {
      // Se colidiu com um ESPINHO...
      if (outro instanceof Espinho) {

         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         
         var exp1 = new Explosao(this.context, this.imgExplosao,
                                 this.x, this.y);
         var exp2 = new Explosao(this.context, this.imgExplosao,
                                 outro.x, outro.y);
         
         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);
         
         var sonic = this;
         exp1.fimDaExplosao = function() {
            sonic.vidasExtras--;
            
            if (sonic.vidasExtras < 0) {
               if (sonic.acabaramVidas) sonic.acabaramVidas();
            }
            else {
               // Recolocar o SONIC no engine
               sonic.colisor.novoSprite(sonic);
               sonic.animacao.novoSprite(sonic);
               
               sonic.posicionar();
            }
         }
        
      }if (outro instanceof Joaninha) {
      
         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         
         var exp1 = new Explosao(this.context, this.imgExplosao,
                                 this.x, this.y);
         var exp2 = new Explosao(this.context, this.imgExplosao,
                                 outro.x, outro.y);
         
         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);
         
         var sonic = this;
         exp1.fimDaExplosao = function() {
            sonic.vidasExtras--;
            
            if (sonic.vidasExtras < 0) {
               if (sonic.acabaramVidas) sonic.acabaramVidas();
            }
            else {
               // Recolocar o sonic no engine
               sonic.colisor.novoSprite(sonic);
               sonic.animacao.novoSprite(sonic);
               
               sonic.posicionar();
            }
         }
      }if (outro instanceof Ring) {
         //this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         //this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         var exp1 = new ExplosaoRing(this.context, 
            this.x, this.y);
         var exp2 = new ExplosaoRing(this.context, 
                     outro.x, outro.y);

         //this.animacao.novoSprite(exp1);
         //this.animacao.novoSprite(exp2);

         var sonic = this;
         exp1.fimDaExplosaoRing = function() {
         sonic.vidasExtras;

         if (sonic.vidasExtras < 0) {
         if (sonic.acabaramVidas) sonic.acabaramVidas();
         }
         else {
         // Recolocar o sonic no engine
         sonic.colisor.novoSprite(sonic);
         sonic.animacao.novoSprite(sonic);

         sonic.posicionar();
         }
         }
         
         }
      
      
      
   },//Não esquecer dessa vírgula sempre que for criar um novo método.

   /*Na imagem 'sonic-spritesheet.png' temos a nave parada, movendo-se 
   para a esquerda e movendo-se para a direita. Em uma linha, a 
   animação ocorre avançando as colunas. Em cada uma destas linhas, 
   há duas colunas que animam o fogo na cauda. */
   posicionar: function() {
      var canvas = this.context.canvas;
      this.x = canvas.width / 2- 40;  // 36 / 2
      this.y = canvas.height - 98;
   }
}

        /*}
        1) drawImage(imagem, x, y, largura, altura): desenha a imagem
        inteira, na posição e tamanho especificados
        
        2) drawImage(imagem, xOrigem, yOrigem, larguraOrigem, alturaOrigem, 
        xDestino, yDestino, larguraDestino, alturaDestino): desenha parte 
        da imagem.*/
