describe('Board', function () {
    var board

    beforeEach(function () {
        board = new Telepong.Board
    })

    afterEach(function () {
        board.removeEventListenters()
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

    it('this.clear can turn all to black', function () {
        var pixels, i, len, isDark = true

        board.clear()

        pixels = board.ctx.getImageData(0, 0, board.canvas.width, board.canvas.height).data
        for (i = 0, len = pixels.length; i < len; i += 4) {
            pixels[i + 0] != 0 && (isDark = false)
            pixels[i + 1] != 0 && (isDark = false)
            pixels[i + 2] != 0 && (isDark = false)
            pixels[i + 3] != 255 && (isDark = false)  
        }
        expect(isDark).toBeTruthy()
    })

    it('this.resize should get document width', function () {
        board.resize()
        expect(board.canvas.width).toBe(document.width)
    })

    it('this.resize should get document height', function () {
        board.resize()
        expect(board.canvas.height).toBe(document.height)
    })

    it('this.init should append canvas to body', function () {
        spyOn(document.body, 'appendChild')
        board.init()
        expect(document.body.appendChild).toHaveBeenCalledWith(board.canvas)
    })

    it('resize window should call this.resize', function () {
        spyOn(board, 'resize')
        bean.fire(window, 'resize')
        expect(board.resize).toHaveBeenCalled()
    })

    it('resize window should call this.clear', function () {
        spyOn(board, 'clear')
        bean.fire(window, 'resize')
        expect(board.clear).toHaveBeenCalled()
    })

})