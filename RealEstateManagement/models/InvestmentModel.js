import mongoose from "mongoose";

const investmentModelSchema = new mongoose.Schema({
    userId: String,
    investmentPlanId: String,
    amountInvested: Double,
    investmentStatus: {type: Boolean, },
    investorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
});

const Investment = mongoose.model("Investment", investmentModelSchema);

export default Investment;