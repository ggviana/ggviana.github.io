"use strict";!function(t,n){function e(){var n=o[0].fragment;return o.forEach(function(e){t.scrollY>=e.startPos&&(n=e.fragment)}),n}var r=function(t){return Array.from(n.querySelectorAll(t))},o=r("section").map(function(n){return{startPos:Math.round(n.getBoundingClientRect().top+t.scrollY),fragment:n.id}});!function(){function n(t){history.pushState(null,null,"#"+e())}t.addEventListener("scroll",n),n()}(),function(){function e(){t.scrollY>=i&&(r.classList.toggle("showing"),t.removeEventListener("scroll",e))}var r=n.querySelector(".project-list"),o=400,i=r.getBoundingClientRect().top-o;t.addEventListener("scroll",e),e()}(),function(){function e(t,n,e,r){return(t/=r/2)<1?e/2*t*t*t+n:e/2*((t-=2)*t*t+2)+n}var o=n.body,i=900;r(".move-to").map(function(r){return r.addEventListener("click",function(r){function c(n){l=l||n;var r=n-l,s=e(r,u,g,i);o.scrollTop=s,i>r&&t.requestAnimationFrame(c)}var l,u=o.scrollTop,s=/[^#]+$/.exec(r.target.href)[0],a=n.getElementById(s).getBoundingClientRect().top,f=o.scrollHeight-t.innerHeight,g=f>u+a?a:f-u;t.requestAnimationFrame(c),r.preventDefault()})})}()}(window,document);