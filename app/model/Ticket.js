class Ticket {

    constructor({ticket_id, parking_name,  slot_id, car_no, car_type, entry_date, exit_date }){
        this.ticket_id = ticket_id || '000'
        this.parking_name = parking_name
        this.slot_id = slot_id 
        this.car_no = car_no 
        this.car_type = car_type 
        this.entry_date = entry_date 
        this.exit_date = exit_date 
    }
}

module.exports = Ticket