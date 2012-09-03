describe('Board', function () {
    var board

    beforeEach(function () {
        board = new Telepong.Board(window)
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

    it('this.resize should get window dimensions', function () {
        var width = dimension(window, 'width')
          , height = dimension(window, 'height')

        expect(board.canvas.width).toBe(width)
        expect(board.canvas.height).toBe(height)
    })

    it('this.resize should get document dimensions', function () {
        var width = dimension(document, 'width')
          , height = dimension(document, 'height')

        board = new Telepong.Board(document)

        expect(board.canvas.width).toBe(width)
        expect(board.canvas.height).toBe(height)
    })

    it('this.resize should get element dimensions', function () {
        var html = document.createElement('div'),
            width, height
        
        html.setAttribute('style', 'width:10px; height:20px')
        document.body.appendChild(html)

        width = dimension(html, 'width')
        height = dimension(html, 'height')

        board = new Telepong.Board(html)

        document.body.removeChild(html)

        expect(board.canvas.width).toBe(width)
        expect(board.canvas.height).toBe(height)
    })

    it('this.init should append canvas to body', function () {
        spyOn(document.body, 'appendChild')
        board.init()
        expect(document.body.appendChild).toHaveBeenCalledWith(board.canvas)
    })

    it('this.init should append canvas to element', function () {
        var html = document.createElement('div')
        spyOn(html, 'appendChild')

        board = new Telepong.Board(html)
        board.init()
        expect(html.appendChild).toHaveBeenCalledWith(board.canvas)
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