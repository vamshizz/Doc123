import mongoose from "mongoose";

const  Schema=mongoose.Schema;

const employeeSchema=new Schema({
    empno:{
        type:Number,
        required:true
    },
    empname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    empdegree:{
        type:[String],
        required:true
    },
    emplanguage:{
        type:[String],
        required:true
    },
    emplocation:{
        type:String,
        required:true
    },
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    }


})

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;