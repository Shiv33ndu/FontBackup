import mongoose from 'mongoose';

const fontSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fontFile: { type: Buffer, required: true},
    fileType: { type: String, required: true},
    category: { type: [String], required: true },
    designer: { type: String, required: true },
    license: { type: [String], required: true },
    description: { type: String, required: true },
    specialTag:{type: String},
    ratings: {type: [Number]},
    version: { type: String},
    popularity: { type: Number, default: 0 },
    uploadDate: { type: Date, default: Date.now },
    preview: {type: String},
});

// const fontSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     designer: { type: String, required: true },
//     license: { type: String, required: true },
//     uploadDate: { type: Date, default: Date.now },
//     fontFile: { type: Buffer, required: true},
// });

const Font = mongoose.model('Font', fontSchema);

export default Font;
