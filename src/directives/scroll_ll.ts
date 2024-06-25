import { DirectiveBinding, ObjectDirective } from "vue";

type Binding = {
  start: number;
  current: number;
  end: number;
  btnWidth: number;
  trackWidth: number;
  removeMouseDown?: () => void;
  removeMouseMove?: () => void;
  removeMouseUp?: () => void;
  resizeUnObserve?: () => void;
}

const padding = 4;

const createElem = (tagName: string, attributes?: Record<string, any>) => {
  const element = document.createElement(tagName);
  for (const key in attributes)
  element.setAttributeNS(null, key, attributes[key]);
  return element
}

const mouseMove = (el:HTMLElement, btn: HTMLElement, b: DirectiveBinding<Binding>): void => {
  const onMouseMove = (event: MouseEvent) => {
    const max = (b.value.trackWidth - b.value.btnWidth) - (padding * 2);
    
    b.value.current = Math.min(Math.max(b.value.end + event.clientX - b.value.start, 0), max);

    const percentage = b.value.current / max;
    btn.style.transform = `translateX(${b.value.current + padding}px)`;
    el.scrollLeft = (percentage * (el.scrollWidth - el.clientWidth)) - (padding * 2 * (1 - percentage));
  }
  window.addEventListener('mousemove', onMouseMove);
  b.value['removeMouseMove'] = () => window.removeEventListener('mousemove', onMouseMove);
}

const mouseUp = (btn: HTMLElement, b: DirectiveBinding<Binding>) => {
  const onMouseUp = () => {
    btn.classList.remove('active');
    b.value.end = b.value.current;
    b.value.removeMouseMove?.();
    b.value.removeMouseUp?.();
  }
  window.addEventListener('mouseup', onMouseUp);
  b.value['removeMouseUp'] = () => window.removeEventListener('mouseup', onMouseUp);
}

const bindEventListeners = (el:HTMLElement, btn: HTMLElement, b: DirectiveBinding<Binding>) => {
  const onMouseDown = (event: MouseEvent) => {
    b.value.start = event.x;
    btn.classList.add('active');
    mouseMove(el, btn, b);
    mouseUp(btn, b);
  }
  btn.addEventListener('mousedown', onMouseDown);
  b.value['removeMouseDown'] = () => btn.removeEventListener('mousedown', onMouseDown);
};

const resize = (el: HTMLElement, b: DirectiveBinding<Binding>) => {
  const track = el.getElementsByClassName('scroll-track').item(0) as HTMLElement;
  const btn = el.getElementsByClassName('scroll-button').item(0) as HTMLElement;
  track.style.display = el.clientWidth < el.scrollWidth ? 'flex' : 'none';

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
    const visibleWidth = el.clientWidth;
    const actualWidth = entry.target.scrollWidth;
    const procentage = b.value.trackWidth/actualWidth;
    const trackChange =  1 - (visibleWidth / b.value.trackWidth);

    b.value.trackWidth = visibleWidth;
    b.value.btnWidth = (procentage * visibleWidth) - (padding * 2);
    b.value.current = b.value.current * (1 - trackChange);
    b.value.end = b.value.current;

    track.style.width =  `${b.value.trackWidth}px`;
    btn.style.width = `${b.value.btnWidth }px`;
    btn.style.transform = `translateX(${b.value.current + padding}px`;
    }
  });
  resizeObserver.observe(el);
  b.value['resizeUnObserve'] = () => resizeObserver.unobserve(el);
}

const addScrollBar = (el: HTMLElement, binding: DirectiveBinding<Binding>) => {
  const visibleWidth = el.clientWidth;
  const actualWidth = el.scrollWidth;
  const procentage = visibleWidth/actualWidth;
  binding.value.btnWidth = (procentage * visibleWidth) - (padding * 2);
  binding.value.trackWidth = visibleWidth;
  const track = createElem('div', { class: 'scroll-track', style: `width: ${binding.value.trackWidth}px; user-select: none;` });
  const button = createElem('div', { class: 'scroll-button', style: `width: ${(binding.value.btnWidth)}px; transform: translateX(${padding}px); user-select: none;` });
  track.appendChild(button);
  el.appendChild(track);
  bindEventListeners(el, button, binding);
  
}

const removeScrollBar = (b: DirectiveBinding<Binding>) => {
  b.value.removeMouseDown?.();
  b.value.removeMouseMove?.();
  b.value.removeMouseUp?.();
  b.value.resizeUnObserve?.();
}

export const scroll:ObjectDirective<HTMLElement> = {
  // created(el, binding, vnode, prevVnode) { console.log('create', { el, binding, vnode, prevVnode }) },
  // beforeMount(el, binding, vnode, prevVnode) { console.log('\nbefore mount', { el, binding, vnode, prevVnode }); },
  mounted(el, binding: DirectiveBinding<Binding>) {
    console.log('\nmounted', { el, binding });
    addScrollBar(el, binding);
    resize(el, binding);
  },
  // beforeUpdate(el, binding, vnode, prevVnode) { console.log('\nbefore update', { el, binding, vnode, prevVnode }) },
  // updated(el, binding, vnode, prevVnode) { console.log('\nupdate', { el, binding, vnode, prevVnode }) },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding<Binding>, vnode, prevVnode) {
    console.log('\nbefore unmount', { el, binding, vnode, prevVnode })
    removeScrollBar(binding);
  },
  unmounted(el, binding, vnode, prevVnode) { console.log('\nunmounted', { el, binding, vnode, prevVnode });}
}