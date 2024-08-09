import { ToastOptions } from "@/types/types";
import { createApp, h } from "vue";

export default (message: string, options?: ToastOptions) => {
  const el = document.getElementById('overlays') ?? document.createElement('div');
  if (!document.getElementById('overlays')) document.body.appendChild(el);
  el.setAttribute('id', 'overlays');
  el.setAttribute('style', 'position: fixed; bottom: 0; width: 100vw; display:flex; flex-direction: column; ');

  const id = options?.id ?? `toast-id${new Date().valueOf()}`
  const app = document.createElement('div');
  app.id = id;
  el.appendChild(app);
  const transitionDuration = options?.transitionDuration ?? 300;
  const duration = options?.duration ?? 2000;

  const style = `
  @keyframes toggleShow {
    from {
      transform: translateY(calc(100% + .5rem));
      opacity: 0;
      min-height: 0;
      margin-bottom: 0;
    }
    to {
      transform: translateY(-.5rem);
      opacity: 1;
      min-height: 3rem;
      margin-bottom: 1rem;
    }
  }
  @keyframes stayaway { 0%, 100% { transform: translateY(calc(200%)); opacity: 0; } }
  .toast {
    padding: .5rem 1rem;
    white-space: break-spaces;
    border-radius: .25rem;
    text-align: ${options?.align ?? 'center'};
    min-width:50vw;
    width: fit-content;
    margin: auto;
    overflow:hidden;
    margin-bottom: 1rem;
    color: var(--n-100);
    background-color: var(--white);
    display: grid;
    place-content: center;
    z-index: 2;
    animation: toggleShow ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) 1 forwards,
      toggleShow ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${duration}ms 1 reverse,
      stayaway 100s ${duration + transitionDuration}ms;
  }
  `;



  const remove = () => {
    setTimeout(() => {
      appInstance.unmount();
      setTimeout(() => el.removeChild(app));
    }, transitionDuration);
  };

  const appInstance = createApp({
    render() {
      return [
        h('style', style),
        h('div', { class: 'toast' }, [
          h('div', [message])
        ])
      ];
    }
  });

  appInstance.mount(app);

  setTimeout(remove, duration);
};


