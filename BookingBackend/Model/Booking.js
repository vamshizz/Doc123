import mongoose from "mongoose";

const Schema=mongoose.Schema;
const BookingSchema=new Schema({
    patientId:{
        type:Schema.Types.ObjectId,
        ref:'Patient'
    },

    DoctorId:{
        type: Schema.Types.ObjectId,
        ref:'Employee'
    },
   Date:{
    type:Date
   },
   Time:{
    type:String,
    require:true
   }
}, { timestamps: true })

const Booking=mongoose.model('Booking',BookingSchema);
export default Booking;