#lang whalesong


;; Arquivo para definição dos tipos de dados do programa.


(require whalesong/image)
(require "constantes.rkt");inclua outros pacotes ou arquivos necessários usando (require ...)

(provide (all-defined-out)) ;permite que outros arquivos importem deste


;; Definições de dados:

;; EstadoMundo é ... (dê um nome melhor para EstadoMundo)

(define-struct pacman(x y dx dy poder? tempo)  #:transparent)
;; Pac-Man é (make-pacman(x dx y dy)Numero)
;; interp. representa a posição do Pac-Man no eixo y e x e 
;; o deslocamento é representado por dy e dx que sao a velocidade
;; do pac-man em cade eixo e uma flag para saber se o pac-man pode
;; ou nao comer os outros fantasmas e um nomero[tempo] que guarda quanto
;; tempo falata para acabar com o poder 
;; Exemplos

(define PAC-MAN-INI (make-pacman 40 40 VEL-PACMAN-INO VEL-PACMAN-VOLTANDO #f 0))



(define-struct fantasma(x y dx dy) #:transparent)

;; Fantasma é (make-fantasma (x y dx dy) Numero)
;; interp. representa a posição do Fantasma no eixo y e x e 
;; o deslocamento dy e dx do Fantasma no eixo y e x respectivamente 
;; Exemplos
(define FAN-INI (make-fantasma 200 200 VEL-FAN-INO VEL-FAN-VOLTANDO))

(define-struct ponto(x y) #:transparent)
;; Ponto é (make-ponto (x y comido?) Numero)
;; representa a posição do ponto no eixo x e y
;;Exemplo
(define ponto0(make-ponto 100 200))
(define ponto1(make-ponto 35 50))
(define ponto2(make-ponto 35 100))
(define ponto3(make-ponto 35 150))
(define ponto4(make-ponto 35 200))
(define ponto5(make-ponto 35 250))
(define ponto6(make-ponto 35 300))
(define ponto8(make-ponto 200 150))
(define ponto9(make-ponto 200 100))
(define ponto10(make-ponto 200 35))
(define ponto11(make-ponto 100 35))
(define ponto12(make-ponto 150 35))
(define ponto13(make-ponto 200 35))
(define ponto14(make-ponto 250 35))
(define ponto15(make-ponto 300 35))
(define ponto16(make-ponto 350 35))
(define ponto19(make-ponto 100 360))
(define ponto20(make-ponto 150 360))
(define ponto21(make-ponto 200 360))
(define ponto22(make-ponto 250 360))
(define ponto23(make-ponto 300 360))
(define ponto24(make-ponto 360 360))
(define ponto25(make-ponto 200 250))
(define ponto26(make-ponto 200 300))
(define ponto27(make-ponto 150 200))
(define ponto28(make-ponto 250 200))
(define ponto29(make-ponto 300 200))
(define ponto30(make-ponto 360 200))
(define ponto31(make-ponto 360 150))
(define ponto32(make-ponto 360 250))
(define ponto33(make-ponto 360 300))
(define pontos(list ponto0 ponto1 ponto2 ponto3 ponto4 ponto5 ponto6 ponto8 ponto9 ponto10 ponto11 ponto12 ponto13
                    ponto14 ponto15 ponto16 ponto19 ponto20 ponto21 ponto22 ponto23 ponto24 ponto25 ponto26 ponto27
                    ponto28 ponto29 ponto30 ponto31 ponto32 ponto33))
;; representa a posição do ponto no eixo x e y e um booleano
;; que verifica se o ponto ja foi comido ou não

(define-struct parede(x y) #:transparent)
;; Parede é (make-parede(x y) Numero)

(define-struct bonus(x y) #:transparent)
;; Bonus é (make-ponto (x y comido?) Numero)
;; Representa a posição do Bonus no eixo x e y
(define bonus0(make-bonus 360 100))
(define bonus1(make-bonus 200 200))
(define bonus2(make-bonus 40 360))
(define bonuslista(list bonus0 bonus1 bonus2))

 
(define-struct jogo(pacman fantasma acabou? pontos paredes pontuacao bonus))
;; interp. um jogo composto pelo pacman(personagem), os fantas(inimigos)
;; uma flag se o jogo acabou ou nao(game over),uma lista de pontos e uma lista de 
;; paredes uma lista de bonus e a puntuacao do jogador

(define parede1 (make-parede 400 0))
(define parede2 (make-parede 400 40))
(define parede3 (make-parede 400 80))
(define parede4 (make-parede 400 120))
(define parede5 (make-parede 400 160))
(define parede6 (make-parede 400 200))
(define parede7 (make-parede 400 240))
(define parede8 (make-parede 400 280))
(define parede9 (make-parede 400 320))
(define parede10 (make-parede 400 360))
(define parede11 (make-parede 400 400))
(define parede12 (make-parede 0 400))
(define parede13 (make-parede 40 400))
(define parede14 (make-parede 80 400))
(define parede15 (make-parede 120 400))
(define parede16 (make-parede 160 400))
(define parede17 (make-parede 200 400))
(define parede18 (make-parede 240 400))
(define parede19 (make-parede 280 400))
(define parede20 (make-parede 320 400))
(define parede21 (make-parede 360 400))
(define parede22 (make-parede 400 400))
(define parede23 (make-parede 0 0))
(define parede24 (make-parede 40 0))
(define parede25 (make-parede 80 0))
(define parede26 (make-parede 120 0))
(define parede27 (make-parede 160 0))
(define parede28 (make-parede 200 0))
(define parede29 (make-parede 240 0))
(define parede30 (make-parede 280 0))
(define parede31 (make-parede 320 0))
(define parede32 (make-parede 360 0))
(define parede33 (make-parede 400 0))
(define parede34 (make-parede 0 0))
(define parede35 (make-parede 0 40))
(define parede36 (make-parede 0 80))
(define parede37 (make-parede 0 120))
(define parede38 (make-parede 0 160))
(define parede39 (make-parede 0 200))
(define parede40 (make-parede 0 240))
(define parede41 (make-parede 0 280))
(define parede42 (make-parede 0 320))
(define parede43 (make-parede 0 360))
(define parede44 (make-parede 0 400))
(define parede45 (make-parede 70 70)) ;; Meio !!!
(define parede46 (make-parede 70 100))
(define parede47 (make-parede 70 130))
(define parede48 (make-parede 70 160))
(define parede49 (make-parede 70 230))
(define parede50 (make-parede 70 260))
(define parede51 (make-parede 70 290))
(define parede52 (make-parede 70 320))
(define parede53 (make-parede 100 320))
(define parede54 (make-parede 130 320))
(define parede55 (make-parede 160 320))
(define parede56 (make-parede 230 320))
(define parede57 (make-parede 260 320))
(define parede58 (make-parede 290 320))
(define parede59 (make-parede 320 320))
(define parede60 (make-parede 320 290))
(define parede61 (make-parede 320 260))
(define parede62 (make-parede 320 230))
(define parede63 (make-parede 320 160))
(define parede64 (make-parede 320 130))
(define parede65 (make-parede 320 100))
(define parede66 (make-parede 320 70))
(define parede67 (make-parede 290 70))
(define parede68 (make-parede 260 70))
(define parede69 (make-parede 230 70))
(define parede70 (make-parede 160 70))
(define parede71 (make-parede 130 70))
(define parede72 (make-parede 100 70))
(define parede73 (make-parede 100 160))
(define parede74 (make-parede 130 160))
(define parede75 (make-parede 160 160))
(define parede76 (make-parede 160 130))
(define parede77 (make-parede 160 100))
(define parede78 (make-parede 230 160))
(define parede79 (make-parede 230 130))
(define parede80 (make-parede 230 100))
(define parede81 (make-parede 260 160))
(define parede82 (make-parede 290 160))
(define parede83 (make-parede 320 160))
(define parede84 (make-parede 230 230))
(define parede85 (make-parede 160 230)) 
(define parede86 (make-parede 130 230))
(define parede87 (make-parede 100 230))
(define parede88 (make-parede 160 260))
(define parede89 (make-parede 160 290))
(define parede90 (make-parede 230 260))
(define parede91 (make-parede 230 290))
(define parede92 (make-parede 260 230))
(define parede93 (make-parede 290 230))

(define paredes(list parede1 parede2 parede3 parede4 parede5 parede6 parede7 parede8 parede9 parede10 parede11 parede12 parede13
                     parede14 parede15 parede16 parede17 parede18 parede19 parede20 parede21 parede22 parede23 parede24 parede25
                     parede26 parede27 parede28 parede29 parede30 parede31 parede32 parede33 parede34 parede35 parede36 parede37
                     parede38 parede39 parede40 parede41 parede42 parede43 parede44 parede45 parede46 parede47 parede48 parede49
                     parede50 parede51 parede52 parede53 parede54 parede55 parede56 parede57 parede58 parede59 parede60 parede61
                     parede62 parede63 parede64 parede65 parede66 parede67 parede68 parede69 parede70 parede71 parede72 parede73
                     parede74 parede75 parede76 parede77 parede78 parede79 parede80 parede81 parede82 parede83 parede84 parede85
                     parede86 parede87 parede88 parede89 parede90 parede91 parede92 parede93 ))

(define START-GAME(make-jogo PAC-MAN-INI FAN-INI #f pontos paredes 0 bonuslista))

 
