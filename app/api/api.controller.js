const service = require("../services/service");

exports.create_parking = async (req) => {
    console.log("create_parking api")

    let countParkName = await service.getParkingByName(req.parkingName, req.totalSlot);

    // NOt allow to create dupplicate park name 
    if(countParkName.count > 0){
        return "ParkName is alrady exist"
    }
    else if(req.totalSlot < 10){
        return "Car Parking is allow minimun 10 slots"
    }else{
        return await service.insertParking(req.parkingName, req.totalSlot)
    }
    
};

exports.create_parking_slot = async (parkId, total_slot) => {
    let row = total_slot / 10;

    console.log("create_parking slot" + parkId + " total " + total_slot + ' row ' + row)

    if (row < 1){
        return "Car Parking is allow minimun 10 slots"
    }else{
        for(let x = 1; x <= row; x++) {
            for(let y = 1; y <= 10; y++) {
                //console.log(`x ${x} and y ${y}`)
                service.insertParkingSlot(parkId, 1, x, y)
            }
        } 
        return "OK";
    }
};


exports.get_parking_info = async (parkingName) => {
    if(parkingName){
        return await service.getParkingSlot(parkingName)
    }else
        return 0;
};


exports.get_parking_ticket = async (req) => {
    if(req.parkingName)
        return await service.getParkingTicket(req.parkingName)
    else
        return 0
   
};


exports.park_the_car = async (ticket) => {
    if(ticket){
        await service.parkTheCar(ticket)
        return await service.changeSlotStatus(ticket)
    }else{
        return "park_the_car NOT OK"
    }
};


exports.get_ticketid_by_carno = async (carNo) => {
    if(carNo){
        return await service.getTicketIdByCarNo(carNo)
    }else{
        return "park_the_car NOT OK"
    }
};

exports.leave_the_slot = async (ticketNo) => {
    if(ticketNo){
        return await service.leaveTheCar(ticketNo)
    }else{
        return "leave the slot NOT OK"
    }
};

exports.get_info_by_ticket_id = async (ticketNo) => {
    if(ticketNo){
        return await service.getInfoByTicketId(ticketNo)
    }else{
        return "park_the_car NOT OK"
    }
};

exports.get_parking_status = async () => {
        return  await service.getParkingStatus()
};

exports.get_plate_number_by_car_size = async (carType) => {
    if(carType){
        return await service.getCarRegistNoByCarSize(carType)
    }else{
        return "Get Car No NOT OK"
    }
};


exports.get_slot_allocated_number_by_car_size = async (carType) => {
    if(carType){
        return await service.getCarAllocatedByCarSize(carType)
    }else{
        return "Get Car Allocated NOT OK"
    }
};




exports.get_slot_number_by_car_size = (req, res) => {
    console.log("start api");
    res.sendStatus(200);
};

