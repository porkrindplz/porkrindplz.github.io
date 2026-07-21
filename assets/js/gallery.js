/* gallery.js — per-project galleries. A thumbnail with data-video-id is a
   video: selecting it shows the poster with a play button, and the YouTube
   iframe is built only once that button is pressed. */

(function () {
  'use strict';

  function buildPlayer(id, title) {
    var iframe = document.createElement('iframe');
    iframe.src =
      'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?autoplay=1&rel=0';
    iframe.title = title || 'Video player';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.className = 'gallery__player';
    return iframe;
  }

  function setup(gallery) {
    var stage = gallery.querySelector('.gallery__stage');
    var main = gallery.querySelector('.gallery__main');
    var play = gallery.querySelector('.gallery__play');
    var thumbs = Array.prototype.slice.call(
      gallery.querySelectorAll('.gallery__thumb')
    );
    if (!stage || !main || !thumbs.length) return;

    var current = null;

    function clearPlayer() {
      var existing = stage.querySelector('.gallery__player');
      if (existing) existing.remove();
      main.hidden = false;
    }

    function select(index) {
      var thumb = thumbs[index];
      if (!thumb) return;

      clearPlayer();

      main.src = thumb.getAttribute('data-full');
      main.alt = thumb.getAttribute('data-alt') || '';

      current = thumb.getAttribute('data-video-id');
      if (play) {
        play.hidden = !current;
        if (current) {
          play.setAttribute(
            'aria-label',
            'Play ' + (thumb.getAttribute('data-alt') || 'video')
          );
        }
      }

      thumbs.forEach(function (t, i) {
        t.classList.toggle('is-active', i === index);
        t.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    if (play) {
      play.addEventListener('click', function () {
        if (!current) return;
        var iframe = buildPlayer(current, play.getAttribute('aria-label'));
        main.hidden = true;
        play.hidden = true;
        stage.appendChild(iframe);
        iframe.focus({ preventScroll: true });
      });
    }

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () {
        select(index);
      });

      thumb.addEventListener('keydown', function (e) {
        var next =
          e.key === 'ArrowRight' ? index + 1 :
          e.key === 'ArrowLeft' ? index - 1 : null;
        if (next === null) return;
        e.preventDefault();
        next = (next + thumbs.length) % thumbs.length;
        thumbs[next].focus();
        select(next);
      });
    });

    select(0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('[data-gallery]');
    Array.prototype.forEach.call(galleries, setup);
  });
})();
