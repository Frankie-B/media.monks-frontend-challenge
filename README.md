# media.monks-frontend-challenge

In order to run the project locally first install all the dependancies by running.

` $ npm install`

To run the development preview.

` $ npm run start`

## main styles can be found in `main.scss`

## Animations:

Animations created with the use of GSAP. I chose to use [GSAP](https://greensock.com/), while I am sure the same could be achieved with pure css,
with @keyframes. I am more familiar with gsap, also GSAP has a very robust timeline, that would allow me to position animations on multiple elements,
in a cleaner way.

## Horizontal Scrolling:

To challenge myself a little bit I chose to try an implement the horizontal scrolling feature without the use of GSAP'S scrollTrigger plugin.
In my approach, I utilized the window's,  getComputedStyle method to find out the background position of the .main_wrapper. I then converted
the value (string) into an integer that I could use to create a condition for the scroll behavior.

** I noticed that the scroll forward between 1 and 2, and 2 and 3 was actually a bit smaller than the first step or the remaining steps forward. This was a
nice little curve ball.