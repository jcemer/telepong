window.Telepong = {}

;(function (exports) {

    function init(html) {
        // game loop
        this.game = new Telepong.Game

        // board
        this.board = new Telepong.Board(html)
        this.board.init()

        this.game.run()
    }

    exports.init = init
    exports.namespace = 'Telepong'
})(window.Telepong)