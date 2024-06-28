function init() {
  const teammemberModules = document.querySelectorAll('.formo2022-team-members')
  teammemberModules.forEach(module => {
    const departments = module.querySelector('.formo2022-team-departments')
    const activeDepartmentFilter = departments.querySelector('[data-filter-active="true"]');
    const activeDepartment = activeDepartmentFilter ? activeDepartmentFilter.getAttribute('data-filter') : 'none';
    const query = module.querySelector('.formo2022-team-query')
    const children = query.querySelectorAll('.formo2022-teammember')
    // hide all children that dont have the data-department value that matches with activeDepartment
    children.forEach(child => {
      const childDepartment = child.getAttribute('data-department');
      if (childDepartment !== activeDepartment) child.setAttribute('data-department-hidden', true);
    })
    const activeChildren = query.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])');
    adjustQueryWidth(module, activeChildren);
  })
}

function adjustQueryWidth(module, activeChildren) {
  const isMobile = window.innerWidth < 782;
  const query = module.querySelector('.formo2022-team-query');
  const oneWidth = activeChildren[0].getBoundingClientRect().width;
  // const gapValue = window.getComputedStyle(query).getPropertyValue("gap");
  const gapValue = '0';
  const gapWidth = gapValue ? Number(gapValue.substring(0, gapValue.indexOf('px'))) : 0;
  let childrenPerRow = Math.ceil(activeChildren.length / 2);
  if (childrenPerRow === 1) childrenPerRow = 2;
  let screens = isMobile ? (activeChildren.length / 4) : (activeChildren.length / 8);
  if (screens < 1) screens = 1;
  // query.style.width = `${Math.ceil(childrenPerRow * oneWidth + childrenPerRow * gapWidth)}px`;
  addNavArrows(module, screens);
}

// let prevWidth = window.innerWidth;
// let prevHeight = window.innerHeight;

// window.addEventListener('resize', () => {
//   const widthChanged = window.innerWidth !== prevWidth;
//   const heightChanged = window.innerHeight !== prevHeight;
//   if (widthChanged) {
//     const teammemberModules = document.querySelectorAll('.formo2022-team-members')
//     teammemberModules.forEach(module => {
//       const activeChildren = module.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])');
//       adjustQueryWidth(module, activeChildren);
//     })
//   }
//   prevWidth = window.innerWidth;
//   prevHeight = window.innerHeight;
// })

function getMemberData(eventTarget, screens) {
  const container = document.querySelector('.formo2022-team-query-outer');
  const containerWidth = container?.getBoundingClientRect().width || 0;
  const members = eventTarget.closest('.formo2022-team-members');
  const visibleMembers = members.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])') || null;
  const query = members.querySelector('.formo2022-team-query');

  const data = {
    query: query,
    visibleMembers: visibleMembers,
    width: visibleMembers ? Math.round(visibleMembers[0].getBoundingClientRect().width) : 0,
    position: visibleMembers ? visibleMembers[0].getBoundingClientRect() : 0,
    containerPosition: container ? container.getBoundingClientRect() : 0,
    containerWidth: Math.round(containerWidth),
  }
  // console.log(data)
  return data;
}

let isMoving = false;
const animationDuration = 300;

function addNavArrows(module, screens) {
  if( module.querySelector('.formo2022-team-next') ) {
    module.querySelector('.formo2022-team-next').remove();
  };
  if( module.querySelector('.formo2022-team-prev') ) {
    module.querySelector('.formo2022-team-prev').remove();
  };
  if (screens <= 1) return;
  const next = document.createElement('button');
  const prev = document.createElement('button');
  next.classList.add('formo2022-team-next');
  prev.classList.add('formo2022-team-prev');
  next.innerHTML = '>';
  prev.innerHTML = '<';
  module.appendChild(prev);
  prev.style.opacity = 0.4;
  module.appendChild(next);

  next.addEventListener('click', (e) => {
    if (isMoving) return;
    isMoving = true;

    const members = getMemberData(e.target);
    const currentPosition =  Math.round(members.position.x) - Math.round(members.containerPosition.x);
    const overlap = members.containerWidth - Math.round(members.query.getBoundingClientRect().width);

    const isAtEnd = currentPosition <= overlap + 10;
    if ( isAtEnd ){ 
      isMoving = false;
      return 
    }

    const isMobile = window.innerWidth < 782;
    const factor = isMobile ? 2 : 4;

    const newPosition = currentPosition - members.width * factor;
    members.query.style.transform = `translateX(${newPosition}px)`;

    if ( newPosition <= overlap + 10 ) {
      next.style.opacity = 0.4;
      prev.style.opacity = 1;
    }
    else {
      next.style.opacity = 1;
      prev.style.opacity = 1;
    }
    console.log('next ' + currentPosition + ' and ' + newPosition);
    setTimeout(() => { isMoving = false }, animationDuration);
  })

  prev.addEventListener('click', (e) => {
    if (isMoving) return;
    isMoving = true;
    const members = getMemberData(e.target);

    // const currentPosition = Math.round(members.containerPosition.x) - Math.abs(Math.round(members.position.x));
    const currentPosition =  Math.round(members.position.x) - Math.round(members.containerPosition.x);

    const isAtStart = Math.abs(Math.round(members.containerPosition.x) - Math.round(members.position.x)) <= 50  
    if ( isAtStart ){
      isMoving = false;
      return;
    } 

    const isMobile = window.innerWidth < 782;
    const factor = isMobile ? 2 : 4;

    const newPosition = currentPosition + Math.round(members.width) * factor; 
    members.query.style.transform = `translateX(${newPosition}px)`;
    if ( Math.floor(newPosition) <= 0 && Math.ceil(newPosition) >= -10 ){
      prev.style.opacity = 0.4;
      next.style.opacity = 1;
    }
    else {
      prev.style.opacity = 1;
      next.style.opacity = 1;
    }
    console.log('prev ' + currentPosition + ' and ' + newPosition);
    setTimeout(() => { isMoving = false }, animationDuration);
  })
}

function toggleDepartment(event) {
  const module = event.currentTarget.closest('.formo2022-team-members');
  const departments = module.querySelector('.formo2022-team-departments');
  const activeDepartmentFilter = departments.querySelector('[data-filter-active="true"]');
  const activeDepartment = activeDepartmentFilter ? activeDepartmentFilter.getAttribute('data-filter') : 'none';
  const query = module.querySelector('.formo2022-team-query')
  resetPosition(query);
  const children = query.querySelectorAll('.formo2022-teammember')
  const department = event.currentTarget.getAttribute('data-filter');
  if (department === activeDepartment) return;
  activeDepartmentFilter.setAttribute('data-filter-active', false);
  event.currentTarget.setAttribute('data-filter-active', true);
  children.forEach(child => {
    const childDepartment = child.getAttribute('data-department');
    if (department === 'none') {
      child.removeAttribute('data-department-hidden');
    } else {
      if (childDepartment === department) {
        child.removeAttribute('data-department-hidden');
      } else {
        child.setAttribute('data-department-hidden', true);
      }
    }
  })
  const activeChildren = query.querySelectorAll('.formo2022-teammember:not([data-department-hidden="true"])');
  adjustQueryWidth(module, activeChildren);
}

document.querySelectorAll('.formo2022-team-departments > a').forEach(department => {
  department.addEventListener('click', toggleDepartment)
})

function resetPosition(query) {
  query.style.transform = 'translateX(0px)';
}

init();