import mongoose from "mongoose";

const investmentPlanModelSchema = new mongoose.Schema({
    planName: String,
    description: String,
    minInvestmentAmt: Number,
    expectedReturns: {type: Number, },
    investorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
});

const InvestmentPlan = mongoose.model("InvestmentPlan", investmentPlanModelSchema);

export default InvestmentPlan;