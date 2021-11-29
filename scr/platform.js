function Platform (width, height, posx, posy, id) {
  var self = this
  this.sprite = document.createElement('div')
  this.sprite.setAttribute("class",'platform')
  this.sprite.style.top=posy + 'px'
  this.sprite.style.left=posx + 'px'
  this.sprite.style.width=width + 'px'
  this.sprite.style.height=height + 'px'
  this.vert = posy
  this.hor = posx
  this.width = width
  this.height = height
  

  this.reduce = function() {
    self.width -= 0.5
    self.hor += 0.25
    self.sprite.style.width = self.width + 'px'
    self.sprite.style.left = self.hor + 'px'
  }
}