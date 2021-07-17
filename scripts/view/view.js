import { RouterEvent } from '../router.js';

export class View {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  updateView() {
    this.container.innerHTML = this.template;
  }

  render() {
    this.updateView();
  }
}

const mainTemplate = `
<div>
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
    this.updateView();
    this.container.querySelector('#button').addEventListener('click', (e) => {
      RouterEvent.dispatchEvent('/main', true);
    });
  }
}
