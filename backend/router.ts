import express from 'express';
import EventController from '@src/controller/EventController'
import UserController from '@src/controller/UserController';
import MeetingRoomController from '@src/controller/MeetingRoomController';

const router = express.Router();

const eventController = new EventController();
const userController = new UserController();
const meetingRoomController = new MeetingRoomController();

router.get('/events/:id', (req, res) => eventController.index(req, res));
router.get('/event/:id', (req, res) => eventController.show(req, res));
router.post('/event', (req, res) => eventController.store(req, res));
router.put('/event/:id', (req, res) => eventController.update(req, res));
router.delete('/event/:id', (req, res) => eventController.delete(req, res));

router.get('/user:id', (req, res) => userController.index(req, res));
router.post('/user', (req, res) => userController.store(req, res));
router.put('/user/:id', (req, res) => userController.update(req, res));
router.delete('/user/:id', (req, res) => userController.delete(req, res));

router.get('/meeting-rooms:id', (req, res) => meetingRoomController.index(req, res));
router.post('/meeting-room', (req, res) => meetingRoomController.store(req, res));
router.put('/meeting-room/:id', (req, res) => meetingRoomController.update(req, res));
router.delete('/meeting-room/:id', (req, res) => meetingRoomController.delete(req, res));

export default router;