import express from 'express';
import controller from '../controllers/Menu';

const router = express.Router();

router.post('/create', controller.createMenu);
router.get('/get:menuId', controller.readMenu);
router.get('/get', controller.readAllMenus);
router.patch('update/:menuId', controller.updateMenu);
router.delete('delete/:menuId', controller.deleteMenu);

export = router;
