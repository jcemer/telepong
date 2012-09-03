"use strict"

window.requestAnimationFrame = 
    window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(fn){
        setTimeout(fn, 1000/30)
    }

function dimension(html, prop) {
    var Prop = prop[0].toUpperCase() + prop.substr(1)
    if (html == window) {
        return window['inner' + Prop]
    } 
    if (html == document) {
        return document.documentElement['offset' + Prop]
    }
    return html.getBoundingClientRect()[prop]
}