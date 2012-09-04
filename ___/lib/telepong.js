window.Telepong = {}

;(function (exports) {

    function init(html) {
        // game loop
        this.game = new Telepong.Game

        // ball
        this.ball = new Telepong.Ball(this.game)

        // board
        this.board = new Telepong.Board(this.game, window )
        this.board.init()

        this.game.run()
    }

    exports.init = init
    exports.namespace = 'Telepong'
})(window.Telepong)