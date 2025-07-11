import { Schema, model } from "mongoose";
// import crypto from 'crypto';

const numberGuerraSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
});

const NumberBonoGuerra = model(`NumerosGuerra`, numberGuerraSchema);

export { NumberBonoGuerra };
