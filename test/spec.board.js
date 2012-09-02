describe('Board', function () {
    var board

    beforeEach(function () {
        board = new Telepong.Board
        spyOn(document.body, 'appendChild')
    })

    /* TESTS */

    it('create canvas', function () {
        expect(board.canvas).toBeTruthy()
        expect(board.canvas.tagName).toBe('CANVAS')
    })

    it('get canvas context', function () {
        expect(board.ctx).toBeTruthy()
        expect(board.ctx.canvas).toBeTruthy()
    })

    it('init should append canvas to body', function () {
        board.init()
        expect(document.body.appendChild).toHaveBeenCalledWith(board.canvas)
    })

    it('init should call resize', function () {
        spyOn(board, 'resize')
        board.init()
        expect(board.resize).wasCalled()
    })

    it('init should call clear', function () {
        spyOn(board, 'clear')
        board.init()
        expect(board.clear).wasCalled()
    })

})