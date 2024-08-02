import mongoose from "mongoose";
const Schema=mongoose.Schema;


const departmentSchema=new Schema({
   deptno:{
    type:Number,
    required:true,
   },
   deptname:{
    type:String,
    required:true
   },
   imageUrl: {
    type: String,
    required: true
}

})




const Department = mongoose.model('Department', departmentSchema);

export default Department;