#lang racket
(require 2htdp/image)
(require 2htdp/universe)
(require rackunit)
(require "constantes.rkt")
(provide (all-defined-out))

(define IMG1(scale 1(bitmap "direita01.png")))
(define IMG2(scale 1(bitmap "direita02.png")))
(define IMG3(scale 1(bitmap "direita03.png")))
(define IMG4(scale 1(bitmap "direita04.png")))
(define IMG5(scale 1(bitmap "direita05.png")))
(define IMG6(scale 1(bitmap "direita06.png")))
(define IMG7(scale 1(bitmap "direita07.png")))
(define IMG8(scale 1(bitmap "direita08.png")))
(define IMG9(scale 1(bitmap "direita09.png")))
(define IMG10(scale 1 (bitmap "direita10.png")))
(define IMG11(scale 1 (bitmap "direita11.png")))
(define IMG12(scale 1 (bitmap "direita12.png")))
(define ldi (list IMG1 IMG2 IMG3 IMG4 IMG5 IMG6 IMG6 IMG7 IMG8 IMG9 IMG10 IMG11 IMG12))

;(run-movie 0.1 ldi)
(define (proxima-imagem IMAGEM)
  (cond [(eq? IMAGEM IMG1) IMG2]
        [(eq? IMAGEM IMG2) IMG3]
        [(eq? IMAGEM IMG3) IMG4]
        [(eq? IMAGEM IMG4) IMG5]
        [(eq? IMAGEM IMG5) IMG6]
        [(eq? IMAGEM IMG6) IMG7]
        [(eq? IMAGEM IMG7) IMG8]
        [(eq? IMAGEM IMG8) IMG9]
        [(eq? IMAGEM IMG9) IMG10]
        [(eq? IMAGEM IMG10) IMG11]
        [(eq? IMAGEM IMG11) IMG12]
        [(eq? IMAGEM IMG12) IMG1]
        ))
(define (desenha-cena-imagem IMAGEM)
  (place-image (corre IMAGEM) 50 50 CENARIO))
(define (corre IMAGEM)
  (proxima-imagem IMAGEM))

(define (create-UFO-scene height)
  (underlay/xy (rectangle 100 100 "solid" "white") 50 height UFO))
 (define UFO
  (underlay/align "center" "center" (circle 10 "solid" "green")
                  (rectangle 40 4 "solid" "green")))
 
;funciona (desenha-cena-imagem IMG1) -> IMG2
;(animate desenha-cena-imagem)

;(run-simulation 100 100 (/ 1 28) (create-UFO-scene 80))
;(create-UFO-scene 80)