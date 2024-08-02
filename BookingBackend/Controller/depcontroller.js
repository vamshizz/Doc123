import Department from "../Model/Department.js";
import Employee from "../Model/Employee.js";

  export   async function departments_get(req,res){

    try {
        const depdetails=await Department.find();
    
        res.status(200).json({ depdetails});
      
    } catch (error) {
        console.log(error);
    }
}

  export  async function emp_get(req,res){
    try {
        const empdetails=await Employee.find();
        res.status(200).json({empdetails})
        console.log(empdetails);
    } catch (error) {
        console.log(error);
    }
}

 