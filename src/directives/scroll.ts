import { DirectiveBinding, ObjectDirective } from "vue";

type Binding = {
  start: number;
  current: number;
  end: number;
  btnWidth: number;
  trackWidth: number;
  cleanup: () => void;
}

const padding = 3;

const createElem = (tagName: string, attributes?: Record<string, any>) => {
  const element = document.createElement(tagName);
  for (const key in attributes)
  element.setAttributeNS(null, key, attributes[key]);
  return element
}

const calculateButtonProperties = (el: HTMLElement, binding: DirectiveBinding<Binding>) => {
  const visibleWidth = el.clientWidth;
  const actualWidth = el.scrollWidth;
  const proportion = visibleWidth / actualWidth;
  binding.value.btnWidth = (proportion * visibleWidth) - (padding * 2);
  binding.value.trackWidth = visibleWidth;
};

const bindEventListeners = (el: HTMLElement, btn: HTMLElement, binding: DirectiveBinding<Binding>) => {
  let isDragging = false;

  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const max = (binding.value.trackWidth - binding.value.btnWidth) - (padding * 2);
    binding.value.current = Math.min(Math.max(binding.value.end + event.clientX - binding.value.start, 0), max);

    const percentage = binding.value.current / max;
    btn.style.transform = `translateX(${binding.value.current + padding}px)`;
    el.scrollLeft = percentage * (el.scrollWidth - el.clientWidth);
  };

  const onMouseDown = (event: MouseEvent) => {
    isDragging = true;
    btn.classList.add('active');
    binding.value.start = event.clientX;
  };

  const onMouseUp = () => {
    if (!isDragging) return;

    isDragging = false;
    btn.classList.remove('active');
    binding.value.end = binding.value.current;
  };

  btn.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  return {
    removeListeners: () => {
      btn.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  };
};

const addScrollbar = (el: HTMLElement, binding: DirectiveBinding<Binding>) => {
  calculateButtonProperties(el, binding);

  const track = createElem('div', { class: 'scroll-track', style: `width: ${binding.value.trackWidth}px; user-select: none;` });
  const button = createElem('div', { class: 'scroll-button', style: `width: ${binding.value.btnWidth}px; transform: translateX(${padding}px); user-select: none;` });
  
  track.appendChild(button);
  el.appendChild(track);

  const { removeListeners } = bindEventListeners(el, button, binding);

  return { track, button, removeListeners };
};

export const scroll: ObjectDirective<HTMLElement, Binding> = {
  mounted(el, binding) {
    const scrollbar = addScrollbar(el, binding);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const visibleWidth = el.clientWidth;
        const actualWidth = entry.target.scrollWidth;
        const procentage = binding.value.trackWidth/actualWidth;
        const trackChange =  1 - (visibleWidth / binding.value.trackWidth);
    
        binding.value.trackWidth = visibleWidth;
        binding.value.btnWidth = (procentage * visibleWidth) - (padding * 2);
        binding.value.current = binding.value.current * (1 - trackChange);
        binding.value.end = binding.value.current;

        scrollbar.track.style.width = `${visibleWidth}px`;
        scrollbar.button.style.width = `${binding.value.btnWidth}px`;
        scrollbar.button.style.transform = `translateX(${binding.value.current + padding}px`;
      }
    });

    resizeObserver.observe(el);

    binding.value.cleanup = () => {
      resizeObserver.unobserve(el);
      scrollbar.removeListeners();
    };
  },
  beforeUnmount(el, binding) {
      binding.value.cleanup?.();
  }
};