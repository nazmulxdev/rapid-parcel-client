import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { useState } from "react";
import warehouses from "../../data/warehouses.json";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

// 🆔 Generate unique tracking ID
const generateTrackingId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const time = Date.now().toString().slice(-6);
  return `RP-${time}-${random}`; // Format: RP-123456-A1B2C3
};

// 🔁 Unique regions from warehouse
const regions = [...new Set(warehouses.map((w) => w.region))];
// 🔄 Get service centers by region
const getCentersByRegion = (region) =>
  warehouses.filter((w) => w.region === region);

const SendParcel = () => {
  const { currentUser } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [cost, setCost] = useState(0);
  const [breakdown, setBreakdown] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // 💰 Cost Logic
  //   const calculateCost = (data) => {
  //     const isSameDistrict = data.senderCenter === data.receiverCenter;
  //     const weight = parseFloat(data.weight || 0);

  //     if (data.type === "document") {
  //       return isSameDistrict ? 60 : 80;
  //     }

  //     // Type: non-document
  //     if (weight <= 3) {
  //       return isSameDistrict ? 110 : 150;
  //     } else {
  //       const extraWeight = weight - 3;
  //       const extraCharge = extraWeight * 40;

  //       if (isSameDistrict) {
  //         return 110 + extraCharge;
  //       } else {
  //         return 150 + extraCharge + 40; // 40 extra for outside city
  //       }
  //     }
  //   };

  // new logic for price calculation

  const calculateCostWithBreakdown = (data) => {
    const isSameDistrict = data.senderCenter === data.receiverCenter;
    const weight = parseFloat(data.weight || 0);
    let breakdown = {};
    let total = 0;

    if (data.type === "document") {
      breakdown = {
        base: isSameDistrict ? 60 : 80,
        location: isSameDistrict ? "Within City" : "Outside District",
        type: "Document",
      };
      total = breakdown.base;
    } else {
      // non-document
      const base = isSameDistrict ? 110 : 150;
      breakdown = {
        base,
        type: "Non-Document",
        location: isSameDistrict ? "Within City" : "Outside District",
        weight,
        extra: 0,
      };

      if (weight > 3) {
        const extraWeight = weight - 3;
        const extraCharge = extraWeight * 40;
        breakdown.extra = extraCharge;

        if (!isSameDistrict) {
          breakdown.outsideExtra = 40;
          total = base + extraCharge + 40;
        } else {
          total = base + extraCharge;
        }
      } else {
        total = base;
      }
    }

    return { breakdown, total };
  };

  // 🚀 On Form Submit
  //   const onSubmit = (data) => {
  //     const deliveryCost = calculateCost(data);
  //     setCost(deliveryCost);
  //     setShowConfirm(true);
  //     toast.success(`Delivery cost: ৳${deliveryCost}`);
  //   };

  // update on submit form

  const onSubmit = (data) => {
    const { breakdown, total } = calculateCostWithBreakdown(data);
    setCost(total);
    setBreakdown(breakdown); // add new state
    setShowConfirm(true);
    toast.success(`Delivery cost: ৳${total}`);
  };

  // ✅ Final Confirm
  const handleConfirm = (data) => {
    const fullData = {
      ...data,
      tracking_id: generateTrackingId(),
      senderEmail: currentUser?.email,
      cost,
      payment_status: "unpaid",
      delivery_status: "pending",
      creation_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("📦 Parcel Saved:", fullData);
    axiosSecure.post("/parcels", fullData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        // Todo: redirect to the payment page
        toast.success(`Parcel Confirmed! Tracking ID: ${fullData.tracking_id}`);
        reset();
        setShowConfirm(false);
      }
    });
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
              defaultValue={currentUser?.displayName}
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

      {showConfirm && breakdown && (
        <div className="mt-6 p-4 border border-primary rounded-lg text-center space-y-4">
          <h4 className="text-lg font-semibold">🧾 Pricing Breakdown</h4>
          <ul className="list-disc list-inside text-left text-sm">
            <li>Type: {breakdown.type}</li>
            <li>Delivery: {breakdown.location}</li>
            <li>Base Price: ৳{breakdown.base}</li>
            {breakdown.weight > 3 && (
              <>
                <li>
                  Extra Weight Charge (৳40/kg over 3kg): ৳{breakdown.extra}
                </li>
                {breakdown.outsideExtra && (
                  <li>Outside District Extra Fee: ৳{breakdown.outsideExtra}</li>
                )}
              </>
            )}
          </ul>

          <div className="text-lg font-bold text-green-600">
            ✅ Total Cost: ৳{cost}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              onClick={handleSubmit(handleConfirm)}
              className="btn btn-success w-full sm:w-auto"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-warning w-full sm:w-auto"
            >
              Modify
            </button>
            <button
              onClick={() => {
                reset();
                setShowConfirm(false);
                setBreakdown(null);
                toast("Parcel submission canceled");
              }}
              className="btn btn-error w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SendParcel;
