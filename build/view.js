(()=>{function e(e,t){const r=window.innerWidth<782,a=e.querySelector(".formo2022-team-query"),d=t[0].getBoundingClientRect().width,l=window.getComputedStyle(a).getPropertyValue("gap"),m=l?Number(l.substring(0,l.indexOf("px"))):13;let c=Math.ceil(t.length/2);1===c&&(c=2);let u=r?t.length/4:t.length/8;u<1&&(u=1),a.style.width=`${Math.ceil(c*d+c*m)}px`,function(e,t){if(e.querySelector(".formo2022-team-next")&&e.querySelector(".formo2022-team-next").remove(),e.querySelector(".formo2022-team-prev")&&e.querySelector(".formo2022-team-prev").remove(),t<=1)return;const r=document.createElement("button"),a=document.createElement("button");r.classList.add("formo2022-team-next"),a.classList.add("formo2022-team-prev"),r.innerHTML=">",a.innerHTML="<",e.appendChild(a),a.style.opacity=.4,e.appendChild(r),r.addEventListener("click",(e=>{if(n)return;n=!0;const t=o(e.target);if(console.log(t),Math.floor(t.position.x)<=window.innerWidth-2*t.outerSpace-t.query.getBoundingClientRect().width+t.width)return void(n=!1);const d=t.position.x-t.outerSpace-t.width-t.gapWidth;t.query.style.transform=`translateX(${d}px)`,Math.floor(d)<=window.innerWidth-2*t.outerSpace-t.query.getBoundingClientRect().width+t.width?(r.style.opacity=.4,a.style.opacity=1):(r.style.opacity=1,a.style.opacity=1),setTimeout((()=>{n=!1}),i)})),a.addEventListener("click",(e=>{if(n)return;n=!0;const t=o(e.target);if(0===Math.ceil(t.position.x-t.outerSpace))return void(n=!1);const d=t.position.x-t.outerSpace+t.width+t.gapWidth;t.query.style.transform=`translateX(${d}px)`,Math.floor(d)<=0&&Math.ceil(d)>=-10?(a.style.opacity=.4,r.style.opacity=1):(a.style.opacity=1,r.style.opacity=1),setTimeout((()=>{n=!1}),i)}))}(e,u)}let t=window.innerWidth,r=window.innerHeight;function o(e){window.innerWidth;const t=e.closest(".formo2022-team-members"),r=t.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])')||null,o=t.querySelector(".formo2022-team-query"),n=window.getComputedStyle(o).getPropertyValue("gap");return{query:o,visibleMembers:r,gapWidth:n?Number(n.substring(0,n.indexOf("px"))):13,width:r?r[0].getBoundingClientRect().width:0,outerSpace:Number(window.getComputedStyle(t).getPropertyValue("padding-left").replace("px",""))||0,position:r?r[0].getBoundingClientRect():0}}window.addEventListener("resize",(()=>{const o=window.innerWidth!==t;window.innerHeight,o&&document.querySelectorAll(".formo2022-team-members").forEach((t=>{const r=t.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])');e(t,r)})),t=window.innerWidth,r=window.innerHeight}));let n=!1;const i=300;function a(t){const r=t.currentTarget.closest(".formo2022-team-members"),o=r.querySelector(".formo2022-team-departments").querySelector('[data-filter-active="true"]'),n=o?o.getAttribute("data-filter"):"none",i=r.querySelector(".formo2022-team-query");!function(e){e.style.transform="translateX(0px)"}(i);const a=i.querySelectorAll(".formo2022-teammember"),d=t.currentTarget.getAttribute("data-filter");d!==n&&(o.setAttribute("data-filter-active",!1),t.currentTarget.setAttribute("data-filter-active",!0),a.forEach((e=>{const t=e.getAttribute("data-department");"none"===d||t===d?e.removeAttribute("data-department-hidden"):e.setAttribute("data-department-hidden",!0)})),e(r,i.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])')))}document.querySelectorAll(".formo2022-team-departments > a").forEach((e=>{e.addEventListener("click",a)})),document.querySelectorAll(".formo2022-team-members").forEach((t=>{const r=t.querySelector(".formo2022-team-departments").querySelector('[data-filter-active="true"]'),o=r?r.getAttribute("data-filter"):"none",n=t.querySelector(".formo2022-team-query");n.querySelectorAll(".formo2022-teammember").forEach((e=>{const t=e.getAttribute("data-department");console.log(t),t!==o&&e.setAttribute("data-department-hidden",!0)})),e(t,n.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])'))}))})();