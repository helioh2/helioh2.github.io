;Este arquivo é o arquivo principal de onde o programa deve ser chamado.
;A única modificação que deve ser feita neste arquivo são os nomes finais das funções chamadas
;dentro do big-bang e o nome final do EstadoMundo. As funções em si devem ser implementadas em "jogo.rkt".

#lang whalesong

(require whalesong/world)
(require "jogo.rkt")   ;importa as funções definidas em "jogo.rkt"
(require "dados.rkt")


;; Jogo -> Jogo
;; inicie o mundo com (main JOGO1)
(define (main j)
  (big-bang j               ; jogador   (estado inicial do mundo)
            (on-tick   proximo-jogo)     ; jogador -> jogador    
                                   ;(retorna um novo estado do mundo dado o atual a cada tick do clock)
            (to-draw   desenha-jogo)   ; jogador -> Image   
                                          ;(retorna uma imagem que representa o estado atual do mundo)
         
            (on-key    trata-tecla)))    ; jogador KeyEvent -> jogador
                                    ;(retorna um novo estado do mundo dado o estado atual e uma interação com o teclado)


(main JOGO1)