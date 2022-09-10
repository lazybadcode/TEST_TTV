const Slot = require('./slot')
class Parking{
    
    constructor({parking_id, name, total_slot}){
        this.parking_id = parking_id
        this.name = name || ('-')
        this.total_slot = total_slot || 0
    }
}

module.exports = Parking 