import Reveal, {type RevealPlugin} from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import {createReductionAnimation} from './animations/reduction';

import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import 'katex/dist/katex.min.css';
import './styles.css';

// Use npm's KaTeX directly: reveal.js's stock math plugin loads a CDN by default.
const localMath: RevealPlugin = {
  id: 'local-katex',
  async init(deck) {
    const {default: renderMathInElement} = await import('katex/contrib/auto-render');
    const slides = deck.getSlidesElement();
    if (!slides) throw new Error('The presentation is missing its slides element.');
    renderMathInElement(slides, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '\\[', right: '\\]', display: true},
        {left: '\\(', right: '\\)', display: false},
      ],
      throwOnError: true,
    });
  },
};

const deck = new Reveal({
  width: 1280,
  height: 720,
  margin: 0.08,
  hash: true,
  fragmentInURL: true,
  slideNumber: 'c/t',
  transition: 'fade',
  plugins: [localMath, Notes],
});

const animationElement = document.querySelector<HTMLElement>('#reduction-animation')!;
const animation = createReductionAnimation(animationElement);

function syncAnimation(animate = false) {
  const visible = Boolean(deck.getCurrentSlide()?.contains(animationElement)
    && deck.isReady()
    && !deck.isOverview()
    && !deck.isPaused()
    && !document.hidden);
  // Animate fragment changes only. On entry/exit, overview, or tab visibility
  // changes, settle immediately at the state chosen by reveal.js.
  animation.sync(animate && visible);
}

const handleStateChange = () => syncAnimation();
const handleFragmentChange = () => syncAnimation(true);
for (const event of ['ready', 'slidechanged', 'overviewshown', 'overviewhidden', 'paused', 'resumed']) {
  deck.on(event, handleStateChange);
}
deck.on('fragmentshown', handleFragmentChange);
deck.on('fragmenthidden', handleFragmentChange);
document.addEventListener('visibilitychange', handleStateChange);

void deck.initialize().then(async () => {
  await document.fonts.ready;
  deck.layout();
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    animation.destroy();
    document.removeEventListener('visibilitychange', handleStateChange);
    deck.destroy();
  });
}
