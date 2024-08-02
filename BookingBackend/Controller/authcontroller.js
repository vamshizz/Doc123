import Patient from "../Model/Patient.js";
import jwt from "jsonwebtoken"

const maxAge=3 * 24 * 60 * 60;
const createToken = (_id) => {
    return jwt.sign({ id: _id }, 'mvk secret', { expiresIn: maxAge });
  };

export async function  patient_post(req,res){
    console.log(req.body);
     const {patientId, PatientName, PatientAge,patientMobileNumber,patientEmailId,patientPassword}=req.body;
    try {
        const user=await Patient.signup({patientId, PatientName, PatientAge,patientMobileNumber,patientEmailId,patientPassword});
        const token = createToken(user._id);
    res.status(200).json("Signup succesfull");
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message.toString() });
    }
}

export async function login_post(req,res){
    const {patientEmailId,patientPassword}=req.body;
    console.log(req.body);
    try {
        const user=await Patient.login({patientEmailId,patientPassword});
        const token = createToken(user._id);
        console.log(user);
        res.status(200).json( {user,token});
        
    } catch (error) {
        res.status(400).json({error:error.message.toString()});
    }

}