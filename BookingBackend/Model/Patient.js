import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientId: {
    type: Number,
    unique: true
  },
  PatientName: {
    type: String,
    required: true
  },
  PatientAge: {
    type: String,
    required: true
  },
  patientMobileNumber: {
    type: Number,
    required: true
  },
  patientEmailId: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  patientPassword: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, 'Password not strong enough']
  }
}, { timestamps: true });

 
function generateRandomID() {
  return Math.floor(100000 + Math.random() * 900000);
}

 
patientSchema.pre('save', async function(next) {
  if (this.isNew) {  
    console.log("Generating patientId...");
    let isUnique = false;
    while (!isUnique) {
      const randomID = generateRandomID();
      const existingPatient = await this.constructor.findOne({ patientId: randomID });
      if (!existingPatient) {
        this.patientId = randomID;  
        isUnique = true;
      }
    }
  }
  next();
});

 
patientSchema.statics.signup = async function({ PatientName, PatientAge, patientMobileNumber, patientEmailId, patientPassword }) {
  console.log("Signup method executing");
  const exists = await this.findOne({ patientEmailId });
  if (exists) {
    throw Error("Email already exists");
  }
  if (!patientEmailId || !patientPassword) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(patientEmailId)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(patientPassword)) {
    throw Error('Password not strong enough');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(patientPassword, salt);

  const newUser = new this({  PatientName, PatientAge, patientMobileNumber, patientEmailId, patientPassword: hash });
  await newUser.save();  
  return newUser;
};

patientSchema.statics.login= async function({patientEmailId,patientPassword}){
    const  check=await Patient.findOne({patientEmailId});
    console.log(check);

    if(!check){
        throw Error("user doesn't exists");
    }

   
      if (!patientEmailId || !patientPassword) {
        throw Error("All fields must be filled");
      }
      if (!validator.isEmail(patientEmailId)) {
        throw Error('Email not valid');
      }
      const match= await bcrypt.compare(patientPassword,check.patientPassword);
      console.log(match)
      if(!match){
        throw Error("incorrect password");
      }
    
      return check;
}

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
