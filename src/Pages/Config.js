import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import ConfigDataService from "../Services/ConfigService";
import AuthService from "../Services/Auth/auth.service";

const configSchema = z.object({
  email_1: z.string().email("Invalid email").optional(),
  email_2: z.string().email("Invalid email").optional(),
  email_3: z.string().email("Invalid email").optional(),
  phone_1: z.string().min(1, "Phone is required"),
  phone_2: z.string().optional(),
  phone_3: z.string().optional(),
  address: z.string().optional(),
  twitter: z.string().url("Invalid Twitter URL"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  instagram: z.string().url("Invalid Instagram URL").optional(),
  facebook: z.string().url("Invalid Facebook URL").optional(),
  youtube: z.string().url("Invalid YouTube URL").optional(),
});

function Config() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [configId, setConfigId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(configSchema),
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      retrieveConfig();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const retrieveConfig = async () => {
    try {
      const response = await ConfigDataService.getAll();
      const configData = response.data.data[0];
      if (configData) {
        setConfigId(configData.id || configData._id);
        reset(configData);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateConfig = async (data) => {
    if (!configId) return;

    try {
      const response = await ConfigDataService.update(configId, data);
      setMessage("Config Status was updated successfully!!");
      console.log("Updated config:", response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update config.");
    }
  };

  if (loading) return <h4 className="text-center">Loading Config Page....</h4>;

  return (
    <div className="container max-w-5xl mx-auto p-4">
      {configId ? (
        <form onSubmit={handleSubmit(updateConfig)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* EMAILS */}
            {["email_1", "email_2", "email_3"].map((field) => (
              <div key={field} className="">
                <label className="label" htmlFor={field}>
                  <span className="label-text">{field.toUpperCase().replace("_", " ")}</span>
                </label>
                <input
                  type="email"
                  id={field}
                  {...register(field)}
                  className={`input input-bordered form-control ${errors[field] ?  "border-red-600 ring-1 ring-red-600" : "border-gray-300"}`}
                  placeholder="Enter email"
                />
                {errors[field] && (
                  <p className="text-error mt-1 text-sm">{errors[field]?.message}</p>
                )}
              </div>
            ))}

            {/* PHONES */}
            {["phone_1", "phone_2", "phone_3"].map((field) => (
              <div key={field}>
                <label className="label" htmlFor={field}>
                  <span className="label-text">{field.toUpperCase().replace("_", " ")}</span>
                </label>
                <input
                  type="tel"
                  id={field}
                  {...register(field)}
                  className={`input input-bordered form-control ${errors[field] ?  "border-red-600 ring-1 ring-red-600" : "border-gray-300"}`}
                  placeholder="Enter phone"
                />
                {errors[field] && (
                  <p className="text-error mt-1 text-sm">{errors[field]?.message}</p>
                )}
              </div>
            ))}

            {/* SOCIAL LINKS */}
            {["twitter", "linkedin", "instagram", "facebook", "youtube"].map((field) => (
              <div key={field} className="">
                <label className="label" htmlFor={field}>
                  <span className="label-text">{field.toUpperCase()}</span>
                </label>
                <input
                  type="text"
                  id={field}
                  {...register(field)}
                  // className="input input-bordered form-control"
                  className={`input input-bordered form-control ${errors[field] ?  "border-red-600 ring-1 ring-red-600" : "border-gray-300"}`}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            
            {/* ADDRESS */}
            <div className="md:col-span-3">
              <label className="label" htmlFor="address">
                <span className="label-text">ADDRESS</span>
              </label>
              <input
                type="text"
                id="address"
                {...register("address")}
                className="input input-bordered form-control"
                placeholder="Enter address"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
            >
              {isSubmitting ? "Updating..." : "Update Config"}
            </button>
            <p className="text-success">{message}</p>
          </div>
        </form>
      ) : (
        <div>
          <br />
          <h2 className="text-center text-danger">
            No Config Details, please Add Config Details ...
          </h2>
          <Link to={"/addconfig"} className="btn btn-warning btn-sm float-end">
            Add Config
          </Link>
        </div>
      )}
    </div>
  );
}

export default Config;
