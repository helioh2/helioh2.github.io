#lang whalesong
(require whalesong/image)

(provide (all-defined-out)) ;permite que outros arquivos importem deste

;;CONSTANTES
(define CENARIO (scale 0.36 (bitmap/url "campo4.png"))) ;IMAGEM CAMPO
(define ALTURA (image-height CENARIO))
(define COMP (image-width CENARIO))

;(define ALTURA 700)
;(define COMP 650)
;(define CENARIO (empty-scene COMP ALTURA))


(define LIMITE-CENARIO-DIR COMP)
(define LIMITE-CENARIO-ESQ 0)
;=====================================================
(define LIMITE-CAMPO-DIR COMP)
(define LIMITE-CAMPO-ESQ 0)
(define LIMITE-CAMPO-CIMA 0)
(define LIMITE-CAMPO-BAIXO ALTURA)
;=====================================================

(define MEIO-DO-X (/ COMP 2))
(define MEIO-DO-Y (/ ALTURA 2))
(define IMG-JOGADOR-PARADO (scale 0.6 (bitmap/url "parado.png")))
(define IMG-JOGADOR-DIREITA(scale 1.2 (bitmap/url "run-direita.png")))
(define IMG-JOGADOR-ESQUERDA(scale 1.2 (bitmap/url "run-esquerda.png")))
(define IMG-JOGADOR(square 20 "solid" "red"))
(define IMG2-JOGADOR-PARADO (scale 0.6 (bitmap/url "parado2.png")))
(define IMG2-JOGADOR-DIREITA(scale 1.2 (bitmap/url "run-direita2.png")))
(define IMG2-JOGADOR-ESQUERDA(scale 1.2 (bitmap/url "run-esquerda2.png")))


(define IMG-SETA (scale 1 (bitmap/url "seta11.png")))
(define IMG-JOGADOR-PARADO-SETA (above IMG-SETA IMG-JOGADOR-PARADO))
(define IMG-JOGADOR-DIREITA-SETA (above IMG-SETA IMG-JOGADOR-DIREITA))
(define IMG-JOGADOR-ESQUERDA-SETA (above IMG-SETA IMG-JOGADOR-ESQUERDA))

(define METADE-JOGADOR (/ (image-width IMG-JOGADOR) 2))
(define IMG-BOLA(circle 8 "solid" "blue"))
(define METADE-BOLA(/ (image-width IMG-BOLA) 2))

;;imagem jogadores
;;imagem da bola
;;imagem do gramado