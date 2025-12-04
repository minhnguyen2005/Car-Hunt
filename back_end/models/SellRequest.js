import mongoose from "mongoose";

const sellRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Car Details
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },
    bodyType: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    passengerCapacity: {
      type: Number,
      default: 2,
    },
    exteriorColor: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Engine Details
    fuelType: {
      type: String,
      trim: true,
    },
    mileage: {
      type: Number,
    },
    transmission: {
      type: String,
      trim: true,
    },
    drivetrain: {
      type: String,
      trim: true,
    },
    engineCapacity: {
      type: Number,
    },
    power: {
      type: Number,
    },
    // Dimension
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    cargoVolume: {
      type: Number,
    },
    // Features
    features: {
      type: [String],
      default: [],
    },
    otherFeatures: {
      type: String,
      trim: true,
    },
    // Price & Media
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    images: {
      type: [String],
      default: [],
    },
    videoLink: {
      type: String,
      trim: true,
    },
    // Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SellRequest = mongoose.model("SellRequest", sellRequestSchema);

export default SellRequest;
