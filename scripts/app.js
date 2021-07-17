import { Router } from './router.js';
import { MainView, SideView } from './view/view.js';
const app = document.querySelector('#app');

const router = new Router();
const mainView = new MainView(app);
const sideView = new SideView(app);

router.addRoute('/side', sideView);
router.setDefaultRoute(mainView);
router.route();
