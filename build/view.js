(()=>{function e(e,a){const n=window.innerWidth<782,i=e.querySelector(".formo2022-team-query"),l=a[0].getBoundingClientRect().width,d=Number(window.getComputedStyle(i).getPropertyValue("gap").replace("px",""))||0;let m=Math.ceil(a.length/2);1===m&&(m=2);let c=n?a.length/4:a.length/8;c<1&&(c=1),i.style.width=`calc(${m*l}px + ${(m-1)*d}px)`,function(e,a){if(e.querySelector(".formo2022-team-next")&&e.querySelector(".formo2022-team-next").remove(),e.querySelector(".formo2022-team-prev")&&e.querySelector(".formo2022-team-prev").remove(),a<=1)return;const n=document.createElement("button"),i=document.createElement("button");n.classList.add("formo2022-team-next"),i.classList.add("formo2022-team-prev"),n.innerHTML=">",i.innerHTML="<",e.appendChild(i),i.style.opacity=.4,e.appendChild(n),n.addEventListener("click",(e=>{if(r)return;r=!0;const a=t(e.target);if(Math.floor(a.position.x)<=window.innerWidth-2*a.outerSpace-a.query.getBoundingClientRect().width+a.width)return void(r=!1);const l=a.position.x-a.outerSpace-a.width-a.gapWidth;a.query.style.transform=`translateX(${l}px)`,Math.floor(l)<=window.innerWidth-2*a.outerSpace-a.query.getBoundingClientRect().width+a.width?(n.style.opacity=.4,i.style.opacity=1):(n.style.opacity=1,i.style.opacity=1),setTimeout((()=>{r=!1}),o)})),i.addEventListener("click",(e=>{if(r)return;r=!0;const a=t(e.target);if(0===Math.ceil(a.position.x-a.outerSpace))return void(r=!1);const l=a.position.x-a.outerSpace+a.width+a.gapWidth;a.query.style.transform=`translateX(${l}px)`,Math.floor(l)<=0&&Math.ceil(l)>=-10?(i.style.opacity=.4,n.style.opacity=1):(i.style.opacity=1,n.style.opacity=1),setTimeout((()=>{r=!1}),o)}))}(e,c)}function t(e){window.innerWidth;const t=e.closest(".formo2022-team-members"),r=t.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])')||null,o=t.querySelector(".formo2022-team-query");return{query:o,visibleMembers:r,gapWidth:Number(window.getComputedStyle(o).getPropertyValue("gap").replace("px",""))||0,width:r?r[0].getBoundingClientRect().width:0,outerSpace:Number(window.getComputedStyle(t).getPropertyValue("padding-left").replace("px",""))||0,position:r?r[0].getBoundingClientRect():0}}window.addEventListener("resize",(()=>{document.querySelectorAll(".formo2022-team-members").forEach((t=>{const r=t.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])');e(t,r)}))}));let r=!1;const o=300;function a(t){const r=t.currentTarget.closest(".formo2022-team-members"),o=r.querySelector(".formo2022-team-departments").querySelector('[data-filter-active="true"]'),a=o?o.getAttribute("data-filter"):"none",n=r.querySelector(".formo2022-team-query");!function(e){e.style.transform="translateX(0px)"}(n);const i=n.querySelectorAll(".formo2022-teammember"),l=t.currentTarget.getAttribute("data-filter");l!==a&&(o.setAttribute("data-filter-active",!1),t.currentTarget.setAttribute("data-filter-active",!0),i.forEach((e=>{const t=e.getAttribute("data-department");"none"===l||t===l?e.removeAttribute("data-department-hidden"):e.setAttribute("data-department-hidden",!0)})),e(r,n.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])')))}document.querySelectorAll(".formo2022-team-departments > a").forEach((e=>{e.addEventListener("click",a)})),document.querySelectorAll(".formo2022-team-members").forEach((t=>{const r=t.querySelector(".formo2022-team-departments").querySelector('[data-filter-active="true"]'),o=r?r.getAttribute("data-filter"):"none",a=t.querySelector(".formo2022-team-query");a.querySelectorAll(".formo2022-teammember").forEach((e=>{const t=e.getAttribute("data-department");console.log(t),t!==o&&e.setAttribute("data-department-hidden",!0)})),e(t,a.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])'))}))})();