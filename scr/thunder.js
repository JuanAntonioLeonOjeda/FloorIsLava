function Thunder (width, height, posx, posy) {
    this.sprite = document.createElement('div')
    this.sprite.setAttribute("id", 'lava')
    this.sprite.style.bottom='0px'
    this.sprite.style.left=posx + 'px'
    this.sprite.style.width=width + 'px'
    this.sprite.style.height=height + 'px'
    this.height = height
    
    this.grow = function () {
      if (this.height >= 0 && this.height <= 600) {
        this.height += 0.1
        this.sprite.style.height = this.height + 'px'
      }
    }
  }