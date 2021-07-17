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
      RouterEvent.dispatchEvent(target.getAttribute('href'));
    });
  }

  static dispatchEvent(pathname, isReplace = false) {
    document.body.dispatchEvent(
      new CustomEvent('route', {
        detail: { pathname, isReplace },
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
      this.route(location.pathname);
    });
  }

  #isMethodUrl(pathname) {
    return pathname.startsWith('@');
  }

  #processMethod(pathname) {
    switch (pathname.substr(1)) {
      case 'back':
        const lastpath = this.history.pop();
        const view = this.routes.get(lastpath);
        history.replaceState({}, 'view', this.history[this.history.length - 1] ?? '/');
        view.remove();
        break;
    }
  }

  addRoute(path, view) {
    this.routes.set(path, view);
  }

  setDefaultRoute(view) {
    this.defaultRoute = view;
  }

  route(pathname, isReplace) {
    const view = this.routes.get(pathname);
    if (view) {
      if (!isReplace) {
        history.replaceState({}, 'view', pathname);
      } else {
        history.pushState({}, 'view', pathname);
      }
      view.render();
      this.history.push(pathname);
    } else {
      this.defaultRoute.render();
    }
  }
}
