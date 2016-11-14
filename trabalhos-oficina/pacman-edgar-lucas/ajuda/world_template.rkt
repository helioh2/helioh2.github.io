;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-lambda-reader.ss" "lang")((modname world_template) (read-case-sensitive #t) (teachpacks ((lib "image.rkt" "teachpack" "2htdp"))) (htdp-settings #(#t constructor repeating-decimal #f #t none #f ((lib "image.rkt" "teachpack" "2htdp")))))
(require 2htdp/image)
(require 2htdp/universe)

;; Meu programa mundo  (torne isto mais específico)

;; =================
;; Constantes:


;; =================
;; Definições de dados:

;; EstadoMundo é ... (dê um nome melhor para EstadoMundo)



;; =================
;; Funções:

;; EstadoMundo -> EstadoMundo
;; inicie o mundo com ...
;; 
(define (main estado)
  (big-bang estado               ; EstadoMundo
            (on-tick   tock)     ; EstadoMundo -> EstadoMundo
            (to-draw   render)   ; EstadoMundo -> Image
            (stop-when ...)      ; EstadoMundo -> Boolean
            (on-mouse  ...)      ; EstadoMundo Integer Integer MouseEvent -> EstadoMundo
            (on-key    ...)))    ; EstadoMundo KeyEvent -> EstadoMundo

;; EstadoMundo -> EstadoMundo
;; produz o próximo ...
;; !!!
(define (tock estado) ...)


;; EstadoMundo -> Image
;; renderiza ... 
;; !!!
(define (render estado) ...)


;; EstadoMundo KeyEvent -> EstadoMundo
;; quando teclar ... é pressionada produz ...  <apagar caso não precise usar>
(define (handle-key estado ke)
  (cond [(key=? ke " ") (... estado)]
        [else
         (... estado)]))

;; EstadoMundo Integer Integer MouseEvent -> EstadoMundo
;; Quando fazer ... nas posições x y no mouse produz ...   <apagar caso não precise usar>
define (handle-mouse estado x y me)
(cond [(mouse=? me "button-down") (... estado x y)]
      [else
       (... estado x y)]))