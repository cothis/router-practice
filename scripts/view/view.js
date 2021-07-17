import { RouterEvent } from '../router.js';

const directions = ['up', 'down', 'left', 'right'];

export class View {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  updateView() {
    this.element = document.createElement('div');
    this.element.innerHTML = this.template;
    this.container.innerHTML = '';
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
<div class="container bg-primary">
  <div>main 페이지</div>
  <div>
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
<div>
  <div>side 페이지</div>
  <div>
    <button id="button" type="button">메인가기 이건 history 쌓임</button>
    <a href="@back">뒤로가기</a>
  </div>
</div>
`;

export class SideView extends View {
  constructor(container) {
    super(container, sideTemplate);
  }

  render() {
    this.slideView('up', 'right');
    this.element.querySelector('#button').addEventListener('click', (e) => {
      RouterEvent.dispatchEvent('/', true);
    });
  }
}
