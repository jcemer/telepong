;(function (exports) {

    function Board(game, html) {
        this.game = game
        this.html = html
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.addEventListenters()
        this.resize()
        this.clear()
    }

    Board.prototype.init = function () {
        if (this.html == window || this.html == document) {
            document.body.appendChild(this.canvas)            
        } else {
            this.html.appendChild(this.canvas)
        }
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.resize = function () {
        this.canvas.width = dimension(this.html, 'width')
        this.canvas.height = dimension(this.html, 'height')

        bean.fire(this.game, 'resize.' + exports.namespace, { 
            width: this.canvas.width
          , height: this.canvas.height 
        })
    }

    Board.prototype.addEventListenters = function () {
        bean.add(window, 'resize.' + exports.namespace, this.onResize.bind(this))
    }

    Board.prototype.removeEventListenters = function () {
        bean.remove(window, '*.' + exports.namespace)
    }

    Board.prototype.onResize = function () {
        this.resize()
        this.clear()
    }

    exports.Board = Board

})(window.Telepong) 