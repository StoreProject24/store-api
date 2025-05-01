import mongoose from 'mongoose';

function convertToObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export { convertToObjectId };
