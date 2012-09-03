"use strict"

window.requestAnimationFrame = 
    window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || window.oRequestAnimationFrame
 || function (fn) {
        setTimeout(fn, 1000/30)
    }

function dimension(html, property) {
    var Property = property[0].toUpperCase() + property.substr(1)
    
    if (html == window) {
        return window['inner' + Property]
    } 
    if (html == document) {
        return document.documentElement['offset' + Property]
    }
    return html.getBoundingClientRect()[property]
}