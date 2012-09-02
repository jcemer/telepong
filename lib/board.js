;(function (exports) {

    function Board() {
        this.namespace = exports.namespace + '.board'
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.addEventListenters()
        this.resize()
        this.clear()
    }

    Board.prototype.init = function () {
        document.body.appendChild(this.canvas)
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.resize = function () {
        this.canvas.width = document.width
        this.canvas.height = document.height
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