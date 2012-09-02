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

    it('clear can turn all to black', function () {
        var pixels, i, len

        board.clear()

        pixels = board.ctx.getImageData(0, 0, board.canvas.width, board.canvas.height).data
        for (i = 0, len = pixels.length; i < len; i += 4) {
            expect(pixels[i + 0]).toBe(0)
            expect(pixels[i + 1]).toBe(0)
            expect(pixels[i + 2]).toBe(0)
            expect(pixels[i + 3]).toBe(255)
        }
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