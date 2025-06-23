import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { useState } from "react";
import warehouses from "../../data/warehouses.json";

// 🔁 Unique regions from warehouse
const regions = [...new Set(warehouses.map((w) => w.region))];
// 🔄 Get service centers by region
const getCentersByRegion = (region) =>
  warehouses.filter((w) => w.region === region);

const SendParcel = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cost, setCost] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // 💰 Cost Logic
  const calculateCost = (data) => {
    const base = data.type === "document" ? 50 : 100;
    const weightCharge =
      data.type === "non-document" ? parseFloat(data.weight || 0) * 20 : 0;
    return base + weightCharge;
  };

  // 🚀 On Form Submit
  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);
    setShowConfirm(true);
    toast.success(`Delivery cost: ৳${deliveryCost}`);
  };

  // ✅ Final Confirm
  const handleConfirm = (data) => {
    const fullData = {
      ...data,
      cost,
      creation_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("📦 Parcel Saved:", fullData);

    toast.success("Parcel Info Saved!");
    reset();
    setShowConfirm(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg space-y-6">
      <Toaster />
      <h2 className="text-3xl font-bold text-center">Send a Parcel</h2>
      <p className="text-center text-gray-500">
        Fill out the details to schedule your delivery
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🔘 Parcel Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">📦 Parcel Info</h3>

          <div className="form-control">
            <label className="label">Type</label>
            <div className="flex gap-4">
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: "Type is required" })}
                  className="radio"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: "Type is required" })}
                  className="radio"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Parcel Title"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full mt-4"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {type === "non-document" && (
            <>
              <input
                type="number"
                placeholder="Weight (kg)"
                {...register("weight", {
                  validate: (val) =>
                    type === "document" ||
                    val > 0 ||
                    "Weight is required for non-document",
                })}
                className="input input-bordered w-full mt-4"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </>
          )}
        </div>

        {/* 📨 Sender Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">📨 Sender Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue="Nazmul"
              {...register("senderName", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Name"
            />
            <input
              type="tel"
              {...register("senderContact", {
                required: "Contact is required",
              })}
              className="input input-bordered w-full"
              placeholder="Contact Number"
            />

            <select
              {...register("senderRegion", { required: "Region is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>

            <select
              {...register("senderCenter", {
                required: "Service Center is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(senderRegion).flatMap((center) =>
                Array.isArray(center.district) ? (
                  center.district.map((d, i) => (
                    <option key={`${center.id}-${i}`}>{d}</option>
                  ))
                ) : (
                  <option key={center.id}>{center.district}</option>
                ),
              )}
            </select>

            <input
              type="text"
              {...register("senderAddress", {
                required: "Address is required",
              })}
              className="input input-bordered w-full"
              placeholder="Pickup Address"
            />
            <input
              type="text"
              {...register("senderInstruction", {
                required: "Instruction is required",
              })}
              className="input input-bordered w-full"
              placeholder="Pickup Instruction"
            />
          </div>
        </div>

        {/* 📬 Receiver Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">📬 Receiver Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              {...register("receiverName", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Name"
            />
            <input
              type="tel"
              {...register("receiverContact", {
                required: "Contact is required",
              })}
              className="input input-bordered w-full"
              placeholder="Contact Number"
            />

            <select
              {...register("receiverRegion", {
                required: "Region is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>

            <select
              {...register("receiverCenter", {
                required: "Service Center is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(receiverRegion).flatMap((center) =>
                Array.isArray(center.district) ? (
                  center.district.map((d, i) => (
                    <option key={`${center.id}-${i}`}>{d}</option>
                  ))
                ) : (
                  <option key={center.id}>{center.district}</option>
                ),
              )}
            </select>

            <input
              type="text"
              {...register("receiverAddress", {
                required: "Address is required",
              })}
              className="input input-bordered w-full"
              placeholder="Delivery Address"
            />
            <input
              type="text"
              {...register("receiverInstruction", {
                required: "Instruction is required",
              })}
              className="input input-bordered w-full"
              placeholder="Delivery Instruction"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>

      {showConfirm && (
        <div className="mt-6 p-4 border border-primary rounded-lg text-center space-y-2">
          <h4 className="text-lg font-semibold">Confirm Delivery</h4>
          <p>
            Total Cost: <span className="text-primary font-bold">৳{cost}</span>
          </p>
          <button
            onClick={handleSubmit(handleConfirm)}
            className="btn btn-success"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
export default SendParcel;
