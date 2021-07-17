export class RouterEvent {
  constructor() {
    this.#catchAnchorEvent();
  }

  #catchAnchorEvent() {
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      e.stopImmediatePropagation();
      e.preventDefault();
      RouterEvent.dispatchEvent(target.getAttribute('href'), true);
    });
  }

  static dispatchEvent(pathname, isPush = false) {
    document.body.dispatchEvent(
      new CustomEvent('route', {
        detail: { pathname, isPush },
      })
    );
  }
}

export class Router {
  constructor() {
    this.history = [];
    this.routes = new Map();

    new RouterEvent();
    this.#registerRouteEvent();
    this.#registerPopstateEvent();
  }

  #registerRouteEvent() {
    document.body.addEventListener('route', (e) => {
      const pathname = e.detail.pathname;
      if (this.#isMethodUrl(pathname)) {
        this.#processMethod(pathname);
        return;
      }

      this.route(e.detail.pathname, e.detail.isPush);
    });
  }

  #registerPopstateEvent() {
    window.addEventListener('popstate', (e) => {
      const lastpath = this.history.pop();
      const view = this.routes.get(lastpath);
      history.replaceState({}, 'view', this.history[this.history.length - 1] ?? '/');
      view.remove();
    });
  }

  #isMethodUrl(pathname) {
    return pathname.startsWith('@');
  }

  #processMethod(pathname) {
    switch (pathname.substr(1)) {
      case 'back':
        history.back();
        break;
    }
  }

  addRoute(path, view) {
    this.routes.set(path, view);
  }

  setDefaultRoute(view) {
    this.defaultRoute = view;
  }

  route(pathname, isPush) {
    const view = this.routes.get(pathname);
    if (view) {
      if (isPush) {
        history.pushState({}, 'view', pathname);
      } else {
        history.replaceState({}, 'view', pathname);
      }
      view.render();
      this.history.push(pathname);
    } else {
      history.replaceState({}, 'home', '/');
      this.defaultRoute.render();
    }
  }
}
