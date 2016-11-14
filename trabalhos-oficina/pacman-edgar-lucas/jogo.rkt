; Este arquivo deve conter as definições das funções do jogo (com exceção da main).
; As definições devem incluir assinatura, propósito, protótipo e templates utilizados.

#lang whalesong
(require whalesong/image)
(require whalesong/world)
(require "constantes.rkt") ;importa as constantes definidas no arquivo "constantes.rkt"
(require "dados.rkt") ;importa as definições de dados definidas no arquivo "dados.rkt"

(provide (all-defined-out)) ;permite que outros arquivos importem deste


;; PacMan -> PacMan
;; produz o próximo pacaman
;;(define (proximo-pacman j) 0)    ;;protótipo
(define (proximo-pacman pac) 
    (local [
    (define proximopacman-x 
      (+ (pacman-x pac) (pacman-dx pac)))
    (define proximopacman-y 
      (+ (pacman-y pac) (pacman-dy pac)))]
  (cond [(or (= (pacman-dx pac) VEL-PACMAN-INO) (= (pacman-dx pac) VEL-PACMAN-VOLTANDO))
         (make-pacman proximopacman-x (pacman-y pac) (pacman-dx pac) (pacman-dy pac) (pacman-poder? pac) (pacman-tempo pac))]
        [else 
         (make-pacman (pacman-x pac) proximopacman-y (pacman-dx pac) (pacman-dy pac) (pacman-poder? pac) (pacman-tempo pac))])))  
         
          
    
(check-expect (proximo-pacman(make-pacman 0 0 2 0 #f 0))(make-pacman 2 0 2 0 #f 0))
(check-expect (proximo-pacman(make-pacman 10 20 0 10 #f 0))(make-pacman 10 30 0 10 #f 0))

;; Fantasma -> Fantasma
;; produz o próximo Fantasma
;;(define (proximo-Fantasma f) 0)    ;;protótipo
(define (proximo-fantasma f)
  (local[ 
         (define proximofan-x
           (+ (fantasma-x f) (fantasma-dx f)))
         (define proximofan-y
           (+ (fantasma-y f) (fantasma-dy f)))
         ]
    (cond[(or (= (fantasma-dx f) VEL-FAN-INO) (= (fantasma-dx f) VEL-FAN-VOLTANDO))
         (make-fantasma proximofan-x (fantasma-y f) (fantasma-dx f) (fantasma-dy f))]
        [else 
         (make-fantasma (fantasma-x f) proximofan-y (fantasma-dx f) (fantasma-dy f))])))

(check-expect (proximo-fantasma(make-fantasma 0 0 1 0 ))(make-fantasma 1 0 1 0 ))
(check-expect (proximo-fantasma(make-fantasma 1 0 0 -1 ))(make-fantasma 1 -1 0 -1))

;; Fantasma -> Fantasma
;; Muda a Direçao do fantasma
;;(define (proximo-Fantasma f) 0)   ;;protótipo
(define (muda-direcao-fantasma f)
  (local[ 
         (define proxima-d
           (random 100))
         ]
    (cond[(not(= (fantasma-dx f) 0))
          (cond[(= (fantasma-dx f) VEL-FAN-VOLTANDO )
         (make-fantasma (fantasma-x f) (fantasma-y f) VEL-FAN-INO 0)]
         [else (make-fantasma (fantasma-x f) (fantasma-y f) VEL-FAN-VOLTANDO 0)])]
        [else 
         (cond[(= (fantasma-dy f) VEL-FAN-VOLTANDO)
         (make-fantasma (fantasma-x f) (fantasma-y f) 0 VEL-FAN-INO)]
         [else (make-fantasma (fantasma-x f) (fantasma-y f) 0 VEL-FAN-VOLTANDO)])])))

(check-expect (muda-direcao-fantasma(make-fantasma 0 0 -1 0 ))(make-fantasma 0 0 1 0 ))
(check-expect (muda-direcao-fantasma(make-fantasma 0 0 1 0 ))(make-fantasma 0 0 -1 0))
(check-expect (muda-direcao-fantasma(make-fantasma 0 0 0 1 ))(make-fantasma 0 0 0 -1 ))
(check-expect (muda-direcao-fantasma(make-fantasma 0 0 0 -1 ))(make-fantasma 0 0 0 1))
;; Numero, Numero, Numero, Numero -> Numero
;; retorna a distancia entre os dois pontos 
;; (define (soma-cartesiana x y) (+ (dobro x) (dobro y))

(define (distancia-euclidiana x1 y1 x2 y2)
  (local 
    [(define (quadrado x)
      (* x x ))]
  (sqrt ( + (quadrado (- x2 x1)) (quadrado (- y2 y1))))))

;; PACMAN E FAN -> Boolean
;; Verificar se houve colisao entre o PAC-MAN e o FANTASMA passados
;; por parametro
;(define (fantasma-pegou-pacman? pac fan) #f) ;stub

(define (fantasma-pegou-pacman? pac fan)
  (local
    [(define distancia 
       (distancia-euclidiana 
             (pacman-x pac) (pacman-y pac) (fantasma-x fan) (fantasma-y fan)))
     ]
  (<= distancia (+ METADE-PAC METADE-FAN))))

(check-expect (fantasma-pegou-pacman?(make-pacman 0 0 2 0 #f 0)(make-fantasma 0 0 1 0))#t)
(check-expect (fantasma-pegou-pacman?(make-pacman 100 100 2 0 #f 0)(make-fantasma 0 0 0 -1))#f)
;;PAC-MAN E LISTA DE PAREDES
;;Verifica se o pac-man bateu na parede
;(define (pacman-bateu-na-parede? pac fan) #f) ;stub
(define (pacman-bateu-na-parede? pac pa)
  (local
    [(define proximo-pac
       (proximo-pacman pac))
     (define distancia-proximo-pac
       (distancia-euclidiana 
             (pacman-x proximo-pac) (pacman-y proximo-pac) (parede-x pa) (parede-y pa)))
     (define distancia 
       (distancia-euclidiana 
             (pacman-x pac) (pacman-y pac) (parede-x pa) (parede-y pa)))
     ]
    (cond[(>= (+ distancia-proximo-pac VEL-PACMAN-INO) (+ METADE-PAC METADE-BLOCO))#f]
      [else (< distancia (+ METADE-PAC METADE-BLOCO))])))
  
(check-expect (pacman-bateu-na-parede?(make-pacman 0 0 2 0 #f 0)(make-parede 0 0 ))#t)
(check-expect (pacman-bateu-na-parede?(make-pacman 100 100 2 0 #f 0)(make-parede 0 0 ))#f)

;; ListaDeParedes -> Boolean
;; Verificar se há colisao de pac-man com pelo menos uma parede
;(define (pacman-bateu-em-alguma-parede? pac parede)#f)

(define (pacman-bateu-em-alguma-parede? pac parede)
  (cond [(empty? parede) #f]                 
        [else (if (pacman-bateu-na-parede? pac (first parede))
                  #t
                  (pacman-bateu-em-alguma-parede? pac (rest parede)))]))

;;  Fantasma -> Boolean
;; Verifica se ha colisao de fantasma com pele monos uma parede
;;( define(fantamas-bateu-em-alguma-parede? fan parede)#f)
(define (fantasma-bateu-em-alguma-parede? fan pa)
  (local
    [(define proximo-fan
         (proximo-fantasma fan))
     (define distancia-proximo-fan
       (distancia-euclidiana 
             (fantasma-x proximo-fan) (fantasma-y proximo-fan) (parede-x pa) (parede-y pa)))
     (define distancia 
       (distancia-euclidiana 
             (fantasma-x fan) (fantasma-y fan) (parede-x pa) (parede-y pa)))
     ]
    (cond[(>= (+ distancia-proximo-fan VEL-FAN-INO) (+ METADE-FAN METADE-BLOCO))#f]
      [else (< distancia (+ METADE-FAN METADE-BLOCO))])))

(check-expect (fantasma-bateu-em-alguma-parede?(make-fantasma 0 0 0 0)(make-parede 0 0 ))#t)
(check-expect (fantasma-bateu-em-alguma-parede?(make-fantasma 100 100 2 0)(make-parede 0 0 ))#f)

;;  Pac-man e Fantasma -> Boolean
;; Verifica se ha colisao de fantasma com o fantasma
;;( define(fantamas-bateu-em-alguma-parede? fan parede)#f)
(define (pacman-pegou-fantasma? pac fan)
  (local
    [(define distancia 
       (distancia-euclidiana 
             (pacman-x pac) (pacman-y pac) (fantasma-x fan) (fantasma-y fan)))
     ]
    (cond[(and (pacman-poder? pac) (<= distancia (+ METADE-PAC METADE-FAN)))#t]
         [else #f])))
(check-expect (pacman-pegou-fantasma? (make-pacman 0 0 2 0 #f 0)(make-fantasma 0 0 1 0))#f)
(check-expect (pacman-pegou-fantasma? (make-pacman 0 0 2 0 #t 0)(make-fantasma 0 0 0 -1))#t)
(check-expect (pacman-pegou-fantasma? (make-pacman 100 100 2 0 #t 0)(make-fantasma 0 0 1 0))#f)
(check-expect (pacman-pegou-fantasma? (make-pacman 100 100 2 0 #f 0)(make-fantasma 0 0 0 1))#f)
;; ListaDeParedes -> Boolean
;; Verificar se há colisao de fantasma com pelo menos uma parede
;;(define (pacman-bateu-em-alguma-parede? pac parede)#f) stub;

(define (fantasmas-bateu-em-alguma-parede? fan parede)
  (cond [(empty? parede) #f]                 
        [else (if (fantasma-bateu-em-alguma-parede? fan (first parede))
                  #t
                  (fantasmas-bateu-em-alguma-parede? fan (rest parede)))]))

;;ListaDePontos -> Boolean
(define (pacman-comeu-algum-ponto? pac ponto)
  (cond [(empty? ponto) #f]                 
        [else (if (pacman-comeu-ponto? pac (first ponto))
                  #t
                  (pacman-comeu-algum-ponto? pac (rest ponto)))]))

;;Ponto -> Boolean
;; Verificar se há colisao de pacman com pelo menos um ponto
(define (pacman-comeu-ponto? pac ponto)
  (local
    [(define distancia 
       (distancia-euclidiana 
             (pacman-x pac) (pacman-y pac) (ponto-x ponto) (ponto-y ponto)))
     ]
  (<= distancia (+ METADE-PAC METADE-PONTO))))
(check-expect (pacman-comeu-ponto? (make-pacman 100 100 2 0 #f 0)(make-ponto 0 0))#f)
(check-expect (pacman-comeu-ponto? (make-pacman 0 0 2 0 #t 0)(make-ponto 0 0))#t)

;;ListaDePontos -> Ponto
;; Funçao que vai retornar o ponto para ser
;; removido da lista
(define (ponto-para-remover pac ponto)
  (cond [(empty? ponto) #f]                 
        [else (if (pacman-comeu-ponto? pac (first ponto))
                  (first ponto)
                  (ponto-para-remover pac (rest ponto)))]))

;; Pacman -> Pacman
;; Funçao que vai adicionar poder ao pacman
(define (pacman-com-poder pac)
  (make-pacman (pacman-x pac) (pacman-y pac) (pacman-dx pac) (pacman-dy pac) #t TEMPO-PODER))
(check-expect (pacman-com-poder (make-pacman 0 0 2 0 #f 0))(make-pacman 0 0 2 0 #t TEMPO-PODER))

;;ListaDeBonus -> Boolean
(define (pacman-comeu-bonus? pac bonus)
  (cond [(empty? bonus) #f]                 
        [else (if (pacman-comeu-o-bonus? pac (first bonus))
                  #t
                  (pacman-comeu-bonus? pac (rest bonus)))]))

;;Bonus -> Boolean
;; Verificar se há colisao de pacman com pelo menos um Bonus
(define (pacman-comeu-o-bonus? pac bonus)
  (local
    [(define distancia 
       (distancia-euclidiana 
             (pacman-x pac) (pacman-y pac) (bonus-x bonus) (bonus-y bonus)))
     ]
  (<= distancia (+ METADE-PAC METADE-BONUS))))
(check-expect (pacman-comeu-o-bonus? (make-pacman 100 100 2 0 #f 0)(make-bonus 0 0))#f)
(check-expect (pacman-comeu-o-bonus? (make-pacman 0 0 2 0 #t 0)(make-bonus 0 0))#t)

;;BonusLista -> Bonus
(define (bonus-para-remover pac bonus)
  (cond [(empty? bonus) #f]                 
        [else (if (pacman-comeu-o-bonus? pac (first bonus))
                  (first bonus)
                  (bonus-para-remover pac (rest bonus)))]))
;;Pacman -> Pacman
;; Recebe uma velocidade do pacman e retorna ele com menos
;; tempo ou sem poder
;; ;;(define (diminui-tempo pac)pac) stub;
(define (diminui-tempo pac)
  (local[(define proximo-pac
           (proximo-pacman pac))]
  (cond [(> (pacman-tempo pac) 0)
         (make-pacman (pacman-x proximo-pac) (pacman-y proximo-pac) (pacman-dx proximo-pac) (pacman-dy proximo-pac)(pacman-poder? proximo-pac) (- (pacman-tempo proximo-pac) 1))]
        [else 
        (make-pacman (pacman-x proximo-pac) (pacman-y proximo-pac) (pacman-dx proximo-pac) (pacman-dy proximo-pac) #f 0)])))

(check-expect (diminui-tempo (make-pacman 0 0 2 0 #t 20))(make-pacman 2 0 2 0 #t 19))
(check-expect (diminui-tempo (make-pacman 102 100 2 0 #t 0))(make-pacman 104 100 2 0 #f 0))
;;Pacman -> Boolean
;; Verifica se o pacman tem poder
;;(define (pacman-ta-com-poder? pac)#t) stub;

(define (pacman-ta-com-poder? pac)
  (cond[(pacman-poder? pac) #t]
       [else #f]))

(check-expect (pacman-ta-com-poder? (make-pacman 0 0 2 0 #t 20))#t)
(check-expect (pacman-ta-com-poder? (make-pacman 100 100 2 0 #f 0))#f)

        
;;EstadoMundo -> EstadoMundo
(define (proximo-jogo j) 
  (local[
       (define proximo-pac
         (proximo-pacman (jogo-pacman j)))
       (define proximo-fan
         (proximo-fantasma(jogo-fantasma j)))
       (define muda-fantasma
         (muda-direcao-fantasma (jogo-fantasma j)))
       (define pacman-poderoso
         (pacman-com-poder (jogo-pacman j)))
       (define pacman-com-menos-tempo
         (diminui-tempo (jogo-pacman j)))
       ]
    (cond[(pacman-pegou-fantasma? (jogo-pacman j) (jogo-fantasma j))
         (make-jogo
         proximo-pac
          FAN-INI
         (jogo-acabou? j)
         (jogo-pontos j)
         (jogo-paredes j)
         (jogo-pontuacao j)
         (jogo-bonus j)
         )]
                                 
      [(fantasma-pegou-pacman? (jogo-pacman j) (jogo-fantasma j))
          (make-jogo
           (jogo-pacman j)
           (jogo-fantasma j)
           #t
           (jogo-pontos j)
           (jogo-paredes j)
           (jogo-pontuacao j)
           (jogo-bonus j)
           )]
         [(fantasmas-bateu-em-alguma-parede? (jogo-fantasma j) (jogo-paredes j))
          (make-jogo
          (jogo-pacman j)
           muda-fantasma 
          (jogo-acabou? j) 
          (jogo-pontos j)
          (jogo-paredes j)
          (jogo-pontuacao j)
           (jogo-bonus j)
          )]
         [(pacman-comeu-algum-ponto? (jogo-pacman j) (jogo-pontos j))
         (make-jogo
          proximo-pac
          proximo-fan
          (jogo-acabou? j)
         (remove (ponto-para-remover (jogo-pacman j) (jogo-pontos j))(jogo-pontos j))
          (jogo-paredes j)
          (+ (jogo-pontuacao j) VALOR-DO-PONTO)
          (jogo-bonus j)
          )]
         [(pacman-comeu-bonus? (jogo-pacman j) (jogo-bonus j))
           (make-jogo
          pacman-poderoso
          (jogo-fantasma j)
          (jogo-acabou? j) 
          (jogo-pontos j)
          (jogo-paredes j)
          (+ (jogo-pontuacao j) VALOR-DO-BONUS)
          (remove (bonus-para-remover (jogo-pacman j) (jogo-bonus j))(jogo-bonus j))
          )]     
          [(pacman-bateu-em-alguma-parede? (jogo-pacman j) (jogo-paredes j))
          (make-jogo
          (jogo-pacman j)
          proximo-fan
          (jogo-acabou? j) 
          (jogo-pontos j) 
          (jogo-paredes j)
          (jogo-pontuacao j)
          (jogo-bonus j)
          )]
          [(pacman-poder? (jogo-pacman j))
           (make-jogo
          pacman-com-menos-tempo
          proximo-fan
          (jogo-acabou? j) 
          (jogo-pontos j) 
          (jogo-paredes j)
          (jogo-pontuacao j)
          (jogo-bonus j)
          )]
                                                                     
          [else (make-jogo 
          proximo-pac 
          proximo-fan 
          (jogo-acabou? j) 
          (jogo-pontos j) 
          (jogo-paredes j)
          (jogo-pontuacao j)
          (jogo-bonus j)
          )]
    )))


;; EstadoMundo -> Image
;; desenha o mundo do jogo
(define (desenha-jogo j)
  (cond [(jogo-acabou? j)
         IMG-GAME-OVER]
        [else (place-image (text
                       (string-append "Pontuação: "
                                      (number->string (jogo-pontuacao j)))
                       20 "red") 70 20  (desenha-fantasma (jogo-fantasma j)(jogo-pacman j) 
                                                          (desenha-pac (jogo-pacman j)
                                                                             (desenha-paredes (jogo-paredes j)
                                                                                             (desenha-ponto (jogo-pontos j)
                                                                                                            (desenha-bonus (jogo-bonus j) MAPA)
                                                                                           )))))]))
;;Fantasma e Pacman -> imagens
;;Desenha o fantasma
(define (desenha-fantasma fan pac img)
  (cond[(pacman-poder? pac)
        (place-image FANTASMAS-ASUSTADO (fantasma-x fan) (fantasma-y fan) img)]
        [else  (place-image FANTASMAS (fantasma-x fan) (fantasma-y fan) img)]))
        

;;ListaDeParedes -> Imagen
;;desenha as paredes das lista
(define (desenha-paredes parede img)
  (cond [(empty? parede) img]            
        [else (place-image (rectangle 20 20 "solid" "blue")
                           (parede-x (first parede))
                           (parede-y (first parede))
                   (desenha-paredes (rest parede) img))]))

;;ListaDeBonus -> Imagen
;;desenha os bonus da lista
(define (desenha-bonus bonus img)
  (cond [(empty? bonus) img]            
        [else (place-image (circle  10 "solid" "red")
                           (bonus-x (first bonus))
                           (bonus-y (first bonus))
                   (desenha-bonus (rest bonus) img))]))

;;listaDePontos -> Imagen
;;desenha os pontos das lista
(define (desenha-ponto ponto img)
  (cond [(empty? ponto) img]            
        [else (place-image (circle  5 "solid" "red")
                           (ponto-x (first ponto))
                           (ponto-y (first ponto))
                   (desenha-ponto (rest ponto) img))]))

;; PacManEstado -> Image
;; desenha o pacman
(define (desenha-pac pac img)
  (cond[(= (pacman-dx pac) VEL-PACMAN-INO) 
        (place-image PAC-MAN-NORMAL (pacman-x pac) (pacman-y pac) img)]
       [(= (pacman-dx pac) VEL-PACMAN-VOLTANDO)
        (place-image PAC-MAN-VOLTANDO (pacman-x pac) (pacman-y pac)  img)]
       [(= (pacman-dy pac) VEL-PACMAN-INO) 
        (place-image PAC-MAN-DECENDO (pacman-x pac) (pacman-y pac)  img)]
       [(= (pacman-dy pac) VEL-PACMAN-VOLTANDO)
        (place-image PAC-MAN-CIMA (pacman-x pac) (pacman-y pac)  img)]))
        
;; EstadoMundo KeyEvent -> EstadoMundo
;; quando tecla é preciona ela muda a direçao do pac man

(define (trata-tecla-pac pac ke)
  (cond [(key=? ke "s")(make-pacman (pacman-x pac) (pacman-y pac) 0 VEL-PACMAN-INO  (pacman-poder? pac) (pacman-tempo pac)) ]
        [(key=? ke "w")(make-pacman (pacman-x pac) (pacman-y pac) 0 VEL-PACMAN-VOLTANDO (pacman-poder? pac) (pacman-tempo pac))]
        [(key=? ke "a")(make-pacman (pacman-x pac) (pacman-y pac)  VEL-PACMAN-VOLTANDO 0 (pacman-poder? pac) (pacman-tempo pac))]
        [(key=? ke "d")(make-pacman (pacman-x pac) (pacman-y pac)  VEL-PACMAN-INO 0 (pacman-poder? pac) (pacman-tempo pac))]
        [else pac]))
(check-expect (trata-tecla-pac (make-pacman 0 0 -2 0 #f 0) "w")
              (make-pacman  0 0 0 -2 #f 0))
(check-expect (trata-tecla-pac (make-pacman 0 0 -2 0 #f 0) "d")
              (make-pacman  0 0 2 0 #f 0))
(check-expect (trata-tecla-pac (make-pacman 0 0 20 0 #f 0) "s")
              (make-pacman  0 0 0 2 #f 0))
(check-expect (trata-tecla-pac (make-pacman 0 0 -2 0 #f 0) "a")
              (make-pacman  0 0 -2 0 #f 0))
;; EstadoMundo KeyEvent -> EstadoMundo
;; Quando a tecla é preciona ela começa o jogo de novo
(define (continua-jogo acabou? ke)
  (cond[(and acabou? (key=? ke " "))
        #f]
       [else acabou?]))
(check-expect (continua-jogo #t " ")#f)
(check-expect (continua-jogo #t "a")#t)

        
(define (trata-tecla j ke)
  (make-jogo
   (trata-tecla-pac (jogo-pacman j) ke)
   (jogo-fantasma j)
   (jogo-acabou? j)
   (jogo-pontos j)
   (jogo-paredes j)
   (jogo-pontuacao j)
   (jogo-bonus j)))


;; EstadoMundo Integer Integer MouseEvent -> EstadoMundo
;; Quando fazer ... nas posições x y no mouse produz ...   <apagar caso não precise usar>
(define (trata-mouse j x y me)
(cond [(and (string=? me "button-down") (jogo-acabou? j))
      START-GAME]
      [else j]))
