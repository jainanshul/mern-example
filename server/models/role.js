import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
  },
  actions: [{
    type:String
  }],
});

export default mongoose.model('Role', RoleSchema);
