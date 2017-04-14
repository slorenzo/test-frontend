load = ->
  button = document.getElementById 'sidebar-toggle'
  toogleSidebar = ->
    sidebar = document.getElementById 'sidebar'
    content = document.getElementById 'content'
    if sidebar.style.display == 'none' 
      fadeIn(sidebar)
      content.style.width = 'calc(99.999999% * 8/12)';
      return
    else
      fadeOut(sidebar)
      content.style.width = '100%'
      return

  fadeOut = (e) -> 
    if e.style.opacity == ''
      e.style.opacity = 1
    e.style.opacity =  parseFloat(e.style.opacity) - .1
    if parseFloat(e.style.opacity) < 0
      e.style.display="none" 
      return
    else
      setTimeout -> 
        fadeOut e
        return
      , 40
     return

  fadeIn = (e) -> 
    e.style.display = "block" 
    e.style.opacity = parseFloat(e.style.opacity) + .1
    if parseFloat(e.style.opacity) < 1
      setTimeout -> 
        fadeIn e
        return
      , 40
      return

  button.addEventListener 'click', toogleSidebar 
document.addEventListener 'DOMContentLoaded', load