import mongoose from "mongoose";

const OrganizationSchema = mongoose.Schema({
    _id: {
        required: true,
        type: String,
    },

    organizationKey: {
        required: true,
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
    
});
export const Organizations = mongoose.model("Organizations", OrganizationSchema);