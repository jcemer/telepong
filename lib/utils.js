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


if (!Function.prototype.bind) {

    Function.prototype.bind = function (that) {
        var target = this
          , slice = Array.prototype.slice
          , args, bound

        if (typeof target != "function") {
            throw new TypeError()
        }  
        
        args = slice.call(arguments, 1)
        bound = function () {
            var merge = args.concat(slice.call(arguments))
              , F , self, result

            if (this instanceof bound) {
                F = function () {}
                F.prototype = target.prototype
                self = new F
                result = target.apply(self, merge)
                if (Object(result) === result) {
                    return result
                }
                return self;
            } else {
                return target.apply(that, merge)
            }
        }
        return bound
    }

}