import {scalePoint, select} from 'd3';
import {gsap} from 'gsap';
import {createFragmentTimeline} from './fragments';

// D3 owns the SVG; reveal.js fragments choose stops on the GSAP timeline.
export function createReductionAnimation(container: HTMLElement) {
  const svg = select(container.querySelector<SVGSVGElement>('svg')!)
    .attr('viewBox', '0 0 1280 660');
  svg.append('title').attr('id', 'reduction-title').text('Evaluation, one step at a time');
  svg.append('desc').attr('id', 'reduction-description')
    .text('The expression (λx. x + 1) 2 reduces to 2 + 1 and then to 3.');

  const steps = [
    {id: 'apply', expression: '(λx. x + 1) 2', width: 310},
    {id: 'substitute', expression: '2 + 1', width: 230},
    {id: 'result', expression: '3', width: 190},
  ];
  const x = scalePoint<string>().domain(steps.map(step => step.id)).range([260, 1020]);
  const mint = '#80e5c2';

  svg.append('text').attr('class', 'diagram-heading')
    .attr('x', 640).attr('y', 105).text('EVALUATION, ONE STEP AT A TIME');

  svg.append('defs').append('marker')
    .attr('id', 'reduction-arrow').attr('viewBox', '0 -5 10 10')
    .attr('refX', 9).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
    .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#354356');
  svg.append('line').attr('x1', x('apply')!).attr('x2', x('result')!)
    .attr('y1', 420).attr('y2', 420).attr('stroke', '#354356')
    .attr('stroke-width', 4).attr('marker-end', 'url(#reduction-arrow)');

  const nodes = svg.selectAll<SVGGElement, typeof steps[number]>('g.step')
    .data(steps).join('g').attr('class', 'step')
    .attr('transform', step => `translate(${x(step.id)}, 295)`);
  nodes.append('rect')
    .attr('x', step => -step.width / 2).attr('y', -65)
    .attr('width', step => step.width).attr('height', 130).attr('rx', 20)
    .attr('fill', '#1c2a3a').attr('stroke', '#1c2a3a').attr('stroke-width', 2);
  nodes.append('text').attr('class', 'diagram-expression').attr('dy', '0.35em')
    .text(step => step.expression);

  const marker = svg.append('circle').attr('class', 'evaluation-marker')
    .attr('cx', x('apply')!).attr('cy', 420).attr('r', 13).attr('fill', mint).node()!;
  const caption = svg.append('text').attr('class', 'diagram-caption')
    .attr('x', 640).attr('y', 555).text('Apply the function').node()!;
  const result = nodes.filter(step => step.id === 'result').select('rect').node()!;

  const timeline = gsap.timeline({paused: true})
    .addLabel('start')
    .to(marker, {attr: {cx: x('substitute')!}, duration: 0.9, ease: 'power2.inOut'})
    .set(caption, {textContent: 'Substitute 2 for x'})
    .addLabel('substitute')
    .to(marker, {attr: {cx: x('result')!}, duration: 0.9, ease: 'power2.inOut'})
    .to(result, {attr: {fill: '#28574e', stroke: mint}, duration: 0.4})
    .set(caption, {textContent: 'A value: 3'})
    .addLabel('result');
  const fragments = createFragmentTimeline(container, timeline);

  return {
    sync: fragments.sync,
    destroy() {
      fragments.destroy();
      svg.selectAll('*').remove();
    },
  };
}
