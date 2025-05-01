import mongoose from "mongoose";

import AutoIncrement from "mongoose-sequence";
const AutoIncrementFactory = AutoIncrement(mongoose);

const bookSchema = new mongoose.Schema({
    id:{ // i have used id1 because mongoose automatic generate id for each object
        type:Number,
        // required: [true, "ID required"],
    },
    title:{
        type: String,
        required: [true, 'title is required'],
        trim: true,
    },
    author:{
        type: String,
        required: [true, ' Author is required'],
        trim: true,
    },
    publishedDate:{
        type: Date,
        required: [true, 'Published date is required.'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        // required: [true, 'Rating lies between 1 & 5'],
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});


bookSchema.plugin(AutoIncrementFactory, {inc_field: 'id'});
export const Book = mongoose.model('Book', bookSchema);