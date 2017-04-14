var load;

load = function() {
  var button, fadeIn, fadeOut, toogleSidebar;
  button = document.getElementById('sidebar-toggle');
  toogleSidebar = function() {
    var content, sidebar;
    sidebar = document.getElementById('sidebar');
    content = document.getElementById('content');
    if (sidebar.style.display === 'none') {
      fadeIn(sidebar);
      content.style.width = 'calc(99.999999% * 8/12)';
    } else {
      fadeOut(sidebar);
      content.style.width = '100%';
    }
  };
  fadeOut = function(e) {
    if (e.style.opacity === '') {
      e.style.opacity = 1;
    }
    e.style.opacity = parseFloat(e.style.opacity) - .1;
    if (parseFloat(e.style.opacity) < 0) {
      e.style.display = "none";
      return;
    } else {
      setTimeout(function() {
        fadeOut(e);
      }, 40);
    }
  };
  fadeIn = function(e) {
    e.style.display = "block";
    e.style.opacity = parseFloat(e.style.opacity) + .1;
    if (parseFloat(e.style.opacity) < 1) {
      setTimeout(function() {
        fadeIn(e);
      }, 40);
    }
  };
  return button.addEventListener('click', toogleSidebar);
};

document.addEventListener('DOMContentLoaded', load);

//# sourceMappingURL=main.js.map
