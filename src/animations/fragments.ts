import type {gsap} from 'gsap';

/** Map reveal.js fragment state to named stops on a paused GSAP timeline. */
export function createFragmentTimeline(
  container: HTMLElement,
  timeline: gsap.core.Timeline,
  initialLabel = 'start',
) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let transition: gsap.core.Tween | undefined;
  let target: string | undefined;

  return {
    sync(animate = false) {
      // Read state, rather than count events: this also handles Back, slide jumps,
      // grouped fragments, and opening a URL at a particular fragment.
      const visible = Array.from(container.querySelectorAll<HTMLElement>(
        '.fragment.visible[data-animation-step]',
      )).sort((a, b) => Number(a.dataset.fragmentIndex) - Number(b.dataset.fragmentIndex));
      const label = visible.at(-1)?.dataset.animationStep ?? initialLabel;
      if (!(label in timeline.labels)) {
        throw new Error(`No GSAP timeline label matches animation step "${label}".`);
      }
      if (animate && label === target) return;
      target = label;

      // Rapid Next/Back presses replace the current tween, never queue motion.
      transition?.kill();
      timeline.pause();
      if (!animate || reducedMotion.matches) {
        timeline.seek(label, true);
      } else {
        transition = timeline.tweenTo(label);
      }
    },
    destroy() {
      transition?.kill();
      timeline.kill();
    },
  };
}
