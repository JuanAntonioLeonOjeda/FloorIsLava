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
  this.reduceTimer = null

  this.reduce = function() {
    this.reduceTimer = setInterval(function(){
      this.width -= 0.5
      this.hor += 0.25
      this.sprite.style.width = this.width + 'px'
      this.sprite.style.left = this.hor + 'px'
    }.bind(this), 50)
  }

  this.reset = function() {
    this.width = 500 
    this.hor = 150
    this.sprite.style.width = this.width + 'px'
    this.sprite.style.left = this.hor + 'px'
  }

  this.reduceStop = function() {
    clearInterval(this.reduceTimer)
  }
}