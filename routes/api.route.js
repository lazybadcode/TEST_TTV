const router = require('express').Router();
const apiController = require('../api/api.controller');

router.get('/create_parking', apiController.create_parking);

router.get('/park_the_car', apiController.park_the_car);

router.get('/leave_the_slot', apiController.leave_the_slot);

router.get('/get_parking_status', apiController.get_parking_status);

router.get('/get_plate_number_by_car_size', apiController.get_plate_number_by_car_size);

router.get('/get_slot_number_by_car_size', apiController.get_slot_number_by_car_size);

module.exports = router;