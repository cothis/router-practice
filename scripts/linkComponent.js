import { RouterEvent } from './router.js';

export class Link extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', function () {
      RouterEvent.dispatchEvent(this.getAttribute('to'), true);
    });
  }
}
