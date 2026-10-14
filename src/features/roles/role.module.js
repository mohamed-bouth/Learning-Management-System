import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: [
      {
        permission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
            required: true
        },

        scope: {
            type: String,
            enum: ["all", "own", "published"],
            default: "all",
            required: true
        }
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Role", roleSchema);
