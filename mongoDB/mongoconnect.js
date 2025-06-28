import mongoose, { Schema, model } from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_RIFAS, {});

    console.log(`Se ha conectado la base de datos`, process.env.DB_RIFAS);
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
