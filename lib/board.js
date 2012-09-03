;(function (exports) {

    function Board(html) {
        this.namespace = exports.namespace + '.board'
        this.html = html
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.addEventListenters()
        this.resize()
        this.clear()
    }

    Board.prototype.init = function () {
        (this.html.appendChild || document.body.appendChild)(this.canvas)
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.resize = function () {
        console.log(dimension(this.html, 'height'))
        this.canvas.width = dimension(this.html, 'width')
        this.canvas.height = dimension(this.html, 'height')
    }

    Board.prototype.addEventListenters = function () {
        bean.add(window, 'resize.' + this.namespace, this.onResize.bind(this))
    }

    Board.prototype.removeEventListenters = function () {
        bean.remove(window, '*.' + this.namespace)
    }

    Board.prototype.onResize = function () {
        this.resize()
        this.clear()
    }

    exports.Board = Board

})(window.Telepong)