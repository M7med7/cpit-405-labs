(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('active');
    });
  }

  var canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var chars = 'ابتثجحخدذرزسشصضطظعغفقكلمنهويءأإآ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef<>/{}[]();:.AI';
  chars = chars.split('');

  var fontSize = 14;
  var columns = Math.floor(canvas.width / fontSize);
  var drops = [];

  for (var i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 10, 5, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (var i = 0; i < drops.length; i++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;

      if (Math.random() > 0.98) {
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.fillStyle = 'rgba(0, 255, 65, ' + (0.3 + Math.random() * 0.7) + ')';
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
  });
})();
