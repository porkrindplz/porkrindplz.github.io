---
title: "Looking Back at the Whiteboard That Built Cellar Creek"
date: 2026-08-31
image: /images/blog/whiteboard_map_design_v2.jpg
excerpt: "Before I wiped my whiteboard, I took a photo of it. The first of many redesigns of Cellar Creek's mini open world."
---
Back in April I scrawled a rough early map of Cellar Creek onto a whiteboard. It bears almost no resemblance to the game now, but I don't think I'd be this far without it.

For those who can read the scribbles of madness made by a lefty, you might have noticed that the camera and dialogue systems "suck". Now, other than needing a little extra polish, these things have been working great for a few months.

<figure>
  <img src="/images/blog/whiteboard_map_design_v2_zoom.jpg" alt="Old feedback notes">
  <figcaption>Things I was worried about back then</figcaption>
</figure>

You’ll also notice a lot of blue lines and arrows, indicating the river network flowing through the game. This is back when swimming was barely functional and water would push you through the ground until you’re falling through a void.

Just reflecting on the worries of that time has been pretty motivating.

---

## Why I’m looking back now

Sunday, I saw a Bluesky post of a fellow dev’s river design.

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:cbjca4qyp4jqoupvatqe5aqu/app.bsky.feed.post/3mucvrmesis22" data-bluesky-cid="bafyreifnkjrjqblyx6d6odouqagjdbico7uiywazwc2jvqvyyfqdl4n66a" data-bluesky-embed-color-mode="system"><p lang="en">Doing som serious map / pond / river design!

#indiedev #gamedev<br><br><a href="https://bsky.app/profile/did:plc:cbjca4qyp4jqoupvatqe5aqu/post/3mucvrmesis22?ref_src=embed">[image or embed]</a></p>&mdash; Prplface - Wishlist ”Moose Migration” on Steam! (<a href="https://bsky.app/profile/did:plc:cbjca4qyp4jqoupvatqe5aqu?ref_src=embed">@prplface.bsky.social</a>) <a href="https://bsky.app/profile/did:plc:cbjca4qyp4jqoupvatqe5aqu/post/3mucvrmesis22?ref_src=embed">August 30, 2026 at 1:22 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

This was one of those things that kind of hit in a funny way, since rivers aren’t often the main subject of design discussions, but are likely key to both of our games.

It made me think back to my own designs throughout the past year and I recalled the old whiteboard sitting in the corner of my office.

Seeing how different it is from the current state of Cellar Creek’s rivers gave me a sort of relief after worrying so long that I hadn’t made enough progress.

## Was there anything actually wrong with it?

I actually wouldn’t say the map had anything specifically wrong with it. Instead, it was a jumping off point. It helped me move forward and try a new layout in the game engine. It was the version my partner patiently playtested weekly, and sometimes daily.

<figure>
  <video src="/images/blog/design_v2_footage.mp4" autoplay loop muted playsinline preload="metadata" aria-label="The whiteboard layout in playable form"></video>
  <figcaption>Running around in the whiteboard world</figcaption>
</figure>

It helped to solidify things and cut others. During the testing of this layout, I:

- Moved from a height map terrain that uses a continuous mesh, to a dual-grid 3D tilemap system
- Decided how creatures and NPCs would interact
- Nailed down traversal and camera systems

## Where Cellar Creek is now

While the layout is nothing like the previous, my worries about progression in the game are shrinking and the lessons learned will persist: The camera and movement systems, the spacing of the objects and creatures, and the ideas for puzzles and hidden collectibles. Not to mention the spirit of the mini open world connected by a network of rivers. Oh yeah, and swimming doesn’t slingshot you into the void!

<figure>
  <img src="/images/blog/map_in_editor.png" alt="A small section of the current Cellar Creek map, laid out in the Unity editor">
  <figcaption>The layout’s continued evolution into a more fleshed out world that I can easily expand upon</figcaption>
</figure>

I’m not worried about map layouts so much anymore. The game’s mechanics, objects, and creatures now influence the more detailed layout design.

My focus now is closing the larger progression loop for "Chapter 1": the story beat sequences, art for a few key characters, the UI for rewards and inventory… all of which push the player to explore new biomes and the last pieces of a puzzle before sharing a new demo to a broader group to playtest.

---

What do you do with your scrapped designs? Do they return in unexpected ways or do they get crumpled up and tossed in the bin?