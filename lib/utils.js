"use strict"

window.requestAnimationFrame = 
    window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || window.oRequestAnimationFrame
 || function (fn) {
        setTimeout(fn, 1000/60)
    }