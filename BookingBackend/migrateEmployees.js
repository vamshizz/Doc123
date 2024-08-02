import mongoose from 'mongoose';
import Employee from './Model/Employee.js'
import Department from './Model/Department.js';

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://msd73291:Chinna123@cluster0.wrzo3km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function migrateEmployees() {
    try {
        // Fetch all employees
        const employees = await Employee.find().lean();
        
        // Fetch all departments
        const departments = await Department.find().lean();
        
        // Create a lookup map for deptno to department _id
        const deptLookup = departments.reduce((map, dept) => {
            map[dept.deptno] = dept._id;
            return map;
        }, {});
        
        // Update employees with new dept field
        for (const emp of employees) {
            const newDeptId = deptLookup[emp.deptno];
            if (newDeptId) {
                await Employee.updateOne({ _id: emp._id }, { $set: { dept: newDeptId }, $unset: { deptno: "" } });
            }
        }

        console.log('Employee migration completed.');
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        mongoose.connection.close();
    }
}

migrateEmployees();
