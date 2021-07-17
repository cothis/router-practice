import { RouterEvent } from '../router.js';

const directions = ['up', 'down', 'left', 'right', 'fade'];

export class View {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  updateView() {
    this.element = document.createElement('div');
    this.element.innerHTML = this.template;
    this.element.classList.add('container');
    this.container.insertAdjacentElement('beforeend', this.element);
  }

  slideView(renderDirection, removeDirection) {
    if (Object.values(directions).includes(renderDirection)) {
      const slideClass = `slide-${renderDirection}`;

      this.element = document.createElement('div');
      this.element.innerHTML = this.template;
      this.element.classList.add('container', slideClass);
      this.container.insertAdjacentElement('beforeend', this.element);

      requestAnimationFrame(() => {
        this.element.classList.remove(slideClass);
      });
    } else throw new Error(`${renderDirection}은 정의되지 않은 direction 입니다.`);

    this.removeDirection = removeDirection;
  }

  render() {
    this.updateView();
  }

  remove() {
    if (Object.values(directions).includes(this.removeDirection)) {
      this.element.classList.add(`slide-${this.removeDirection}`);
      this.element.addEventListener('transitionend', () => {
        this.element.remove();
      });
    } else this.element.remove();
  }
}

const mainTemplate = `
<div class="bg-primary container">
  <div>main 페이지</div>
  <div>
    <input type="checkbox">
    <a href="/side">사이드로</a>
  </div>
</div>
`;

export class MainView extends View {
  constructor(container) {
    super(container, mainTemplate);
  }
}

const sideTemplate = `
<div id="side" class="container">
  <div>side 페이지</div>
  <div>
    <input type="checkbox">
    <a href="/three">세번째 페이지</a>
    <a href="@back">뒤로가기</a>
  </div>
</div>
`;

export class SideView extends View {
  constructor(container) {
    super(container, sideTemplate);
  }

  render() {
    this.updateView();
    // this.slideView('down', 'right');
  }
}

const threeTemplate = `
<div id="side" class="container bg-orange">
  <div>세번째 페이지</div>
  <a href="@back">뒤로가기</a>
</div>
`;

export class ThreeView extends View {
  constructor(container) {
    super(container, threeTemplate);
  }

  render() {
    this.slideView('down', 'down');
  }
}
