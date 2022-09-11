const router = require('express').Router();
const apiController = require('../api/api.controller');
const service = require("../services/service");
const Ticket = require('../model/Ticket');

// {"parkingName" : "Park2", "totalSlot" : 10}
router.post('/create_parking',  async (req, res) => {
    try {

        let park = await apiController.create_parking(req);

        if (park === "ParkName is alrady exist"){
            res.json({ error: "ParkName is alrady exist" });
        }
        else if(park === "Car Parking is allow minimun 10 slots"){
            res.json({ error: "Car Parking is allow minimun 10 slots" });
        }
        else{
            let slot = await apiController.create_parking_slot(park.insertId, req.body.totalSlot)

            if(slot === "Car Parking is allow minimun 10 slots"){
                res.json({ error: "Car Parking is allow minimun 10 slots" });
                
            }else{
                let parkingInfo = await apiController.get_parking_info(req.body.parkingName)
                res.json({ result : parkingInfo});
            }
        }
        
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});


// { "car_no" : "QQ11223" ,
//   "car_type" : "medium",
//   "parkingName" : "t1"
// }
router.post('/park_the_car',  async (req, res) => {
    try {

        let ticket_info = await apiController.get_ticketid_by_carno(req.body.car_no)
        //console.log(JSON.stringify(ticket_info))
        if(ticket_info){
            if ( ticket_info.count >= 1) {
                     return res.json({ error: "Dupplicate Car regist number" });
                }
        }

        let ticketInfo = await apiController.get_parking_ticket(req);


        let ticket = new Ticket({ticket_id : "T001", parking_name: ticketInfo.parking_name,  slot_id : ticketInfo.slot_no , car_no : req.body.car_no , car_type : req.body.car_type, entry_date : new Date(), exit_date : null })
        
        // set slot to not avialable
        // insert into tickets
        await apiController.park_the_car(ticket)
    
        let parkingInfo = await apiController.get_parking_info(ticketInfo.parking_name)
        res.json({ result : parkingInfo});
        
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});


router.post('/leave_the_slot',  async (req, res) => {
    try {

        // validate car no
        let ticket_info = await apiController.get_ticketid_by_carno(req.body.car_no)
        console.log(JSON.stringify(ticket_info))
        if(ticket_info){
            if ( ticket_info.count > 1) {
                     return res.json({ error: "Dupplicate Car regist number" });
                }
        }
        console.log("eee " + JSON.stringify(ticket_info))
        //update ticket exit date and available slot
        await apiController.leave_the_slot(ticket_info.ticket_no)

        let parkInfo = await apiController.get_info_by_ticket_id(ticket_info.ticket_no)

        let parkingInfo = await apiController.get_parking_info(parkInfo.parking_name)
              
            
        res.json({ result : parkingInfo});
        
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});



router.get('/get_parking_status',  async (req, res) => {
    try {
        let status = await apiController.get_parking_status()
        res.json({ result : status});
      
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});



router.post('/get_plate_number_by_car_size',  async (req, res) => {
    try {
       
        let carNoList = await apiController.get_plate_number_by_car_size(req.body.car_type)
            
        res.json({ result : carNoList});
        
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});



router.post('/get_slot_allocated_number_by_car_size',  async (req, res) => {
    try {
       
        let slotAllocated = await apiController.get_slot_allocated_number_by_car_size(req.body.car_type)
            
        res.json({ result : slotAllocated});
        
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
});


module.exports = router;