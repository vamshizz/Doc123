import { Router  } from "express";
import Employee from "../Model/Employee.js";
const router=Router();
import { departments_get, emp_get } from "../Controller/depcontroller.js";


 router.get('/depdetails',departments_get);

  router.get('/empdetails',emp_get);
  router.get('/empdetails/:departmentID',async(req,res)=>{
    const {departmentID } = req.params;
    try {
      const empdet=await Employee.find({dept:departmentID})
      console.log(empdet);
      res.status(200).json({empdet})
    } catch (error) {
      res.status(404).json({error:error});
    }
   
  })

  router.get('/empfetch/:empno',async(req,res)=>{
    const {empno}=req.params
    
    try {
      const doctor=await Employee.find({_id:empno})
      console.log(doctor);
      res.status(200).json({doctor});
    } catch (error) {
      console.log(error);
    }
  })

  router.post('/booking',async(req,res)=>{
console.log(req.body);
  })
 export default router;