import { Router  } from "express";
import Employee from "../Model/Employee.js";
import Booking from "../Model/Booking.js";
const router=Router();
import { departments_get, emp_get } from "../Controller/depcontroller.js";


 router.get('/depdetails',departments_get);

  router.get('/empdetails',emp_get);
  router.get('/empdetails/:departmentID',async(req,res)=>{
    const {departmentID } = req.params;
    console.log(departmentID)
    try {
      const empdet=await Employee.find({dept:departmentID})
       
      res.status(200).json({empdet})
    } catch (error) {
      res.status(404).json({error:error});
    }
   
  })

  router.get('/empfetch/:empno',async(req,res)=>{
    const {empno}=req.params
  
    try {
      const doctor=await Employee.find({_id:empno})
    
      res.status(200).json({doctor});
    } catch (error) {
      console.log(error);
    }
  })
 
 
   
  
  router.post('/booking', async (req, res) => {
    console.log(req.body);
    try {
      const { DoctorId, patientId, currentDate, CurrentTime } = req.body;
  
       
      const book = new Booking({  patientId, DoctorId,Date:currentDate, Time: CurrentTime });
      
      await book.save();
  
      res.status(200).json("Inserted");
    } catch (error) {
      console.error('Error handling booking:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
router.get('/bookedSlots/:DoctorId',async(req,res)=>{
  try {
    const {DoctorId}=req.params;
  console.log("errorrr")
  console.log(DoctorId);
  const slots=await Booking.find({ DoctorId})
  console.log(slots);
  res.status(200).json({slots})
  } catch (error) {
    res.status(500).json({error});
  }
  
})


 export default router;