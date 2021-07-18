import { Router } from './router.js';
import { MainView, SideView, ThreeView } from './view/view.js';
import { Link } from './linkComponent.js';
window.customElements.define('router-link', Link);

const app = document.querySelector('#app');

const router = new Router();
const mainView = new MainView(app);
const sideView = new SideView(app);
const threeView = new ThreeView(app);

router.addRoute('/side', sideView);
router.addRoute('/three', threeView);
router.setDefaultRoute(mainView);
router.route();
