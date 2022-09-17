export interface AddOneParkingSlotRequest {
    type: number,
    total_slot?: number,
    price: number
}

export interface UpdateOneParkingSlotRequest {
    total_slot: number,
    price: number,
    parking_id: number,
    parking_slot_id: number
}