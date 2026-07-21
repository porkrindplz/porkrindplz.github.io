/* ------------------------------------------------------------------
   video-facade.js

   Each <button class="facade" data-video-id="..."> renders as a poster
   image with a play button. The YouTube iframe is only created when the
   button is clicked, so the page loads no third-party player code up
   front — the previous version of this page embedded ten players on
   load, which cost a couple of megabytes before anyone pressed play.

   Progressive enhancement: with JavaScript off, the button still links
   through to YouTube via the <noscript> fallback in the markup.
   ------------------------------------------------------------------ */

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
    return iframe;
  }

  function activate(facade) {
    var id = facade.getAttribute('data-video-id');
    if (!id) return;

    var player = buildPlayer(id, facade.getAttribute('data-video-title'));

    // Swap the button for a plain wrapper holding the iframe, so the
    // element keeps its size and the button no longer traps clicks.
    var wrapper = document.createElement('div');
    wrapper.className = 'facade';
    wrapper.appendChild(player);
    facade.replaceWith(wrapper);

    // Move focus into the player for keyboard users.
    player.focus({ preventScroll: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var facades = document.querySelectorAll('.facade[data-video-id]');
    Array.prototype.forEach.call(facades, function (facade) {
      facade.addEventListener('click', function () {
        activate(facade);
      });
    });
  });
})();
