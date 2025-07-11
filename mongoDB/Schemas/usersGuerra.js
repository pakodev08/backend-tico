import { Schema, model } from 'mongoose';

const UserGuerraSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    cedula: {
        type: Number,
        // required: true,
    },
    tlf: {
        type: Number,
        // required: true,
    },
    ref: {
        type: Array,
        // required: true,
    },
    numbers:{
        type: Array,
        // required: true
    },
    monto: {
        type: Number,
        // required: true
    }
    
})

const UserGuerra = model(`UserGuerra`, UserGuerraSchema);

export {
    UserGuerra
}