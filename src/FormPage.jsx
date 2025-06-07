import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormPage(){
   const [form, setForm] = useState({
       firstname: "",
       lastname: "",
       username: "",
       password: "",
       email: "",
       phone: "",
       countryCode: "+91",
       pin: "",
       aadhar: "",
       country: "",
       city: "",
     });

     const countries = ["India", "USA", "UK", "Australia"];
  const Cities = {
    India: ["Delhi", "Mumbai", "Agra", "Jaipur", "Jodhpur", "Bangalore"],
    USA: ["California", "New York", "New Orleans", "Florida", "Michigan"],
    UK: ["London"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };
  const countryCode = {
    India: "+91",
    USA: "+1",
    UK: "+44",
    Australia: "+61",
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { countryCode: countryCode[value] || "" }),
    }));
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (p) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/.test(p);
  const validateName = (name) => /^[A-Za-z]{2,}$/.test(name);
  const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);
  const validatePin = (pin) => /^\d{6}$/.test(pin);

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number and a special character.";
    }
    if (!validateName(form.firstname)) {
      newErrors.firstname =
        "First name must contain only letters and be at least 2 characters.";
    }
    if (!validateName(form.lastname)) {
      newErrors.lastname =
        "Last name must contain only letters and be at least 2 characters.";
    }
    if (!validateAadhar(form.aadhar)) {
      newErrors.aadhar = "Aadhar number must be exactly 12 digits.";
    }
    if (!validatePin(form.pin)) {
      newErrors.pin = "PIN number must be exactly 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (!validateForm()) return;
    navigate("/submit", {
      state: {
        ...form,
        phone: `${form.countryCode}${form.phone}`,
      },
    });
  };






     return (
    <div className="min-h-screen w-full bg-slate-600 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-slate-700">
          Registration Form
        </h2>

        {/* First & Last Name */}
        <div className="flex flex-wrap gap-4">
          <InputField
            label="First Name"
            name="firstname"
            value={form.firstname}
            error={errors.firstname}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="lastname"
            value={form.lastname}
            error={errors.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Username & Email */}
        <div className="flex flex-wrap gap-4">
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
            type="email"
          />
        </div>

        {/* Password & Phone */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1 w-full md:w-[48%] relative">
            <label className="text-sm text-slate-700">Password:</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={isShowPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
            <button
              type="button"
              onClick={() => setIsShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
            >
              {isShowPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-[48%]">
            <label className="text-sm text-slate-700">Phone No:</label>
            <div className="flex gap-2">
              <input
                readOnly
                className="w-20 p-2 border border-slate-300 rounded bg-slate-100"
                value={form.countryCode}
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="flex-1 p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="tel"
                inputMode="numeric"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* PIN & Aadhar */}
        <div className="flex flex-wrap gap-4">
          <InputField
            label="PIN No"
            name="pin"
            
            value={form.pin}
            error={errors.pin}
            onChange={handleChange}
            type="number"
          />
          <InputField
            label="Aadhar No"
            name="aadhar"
            value={form.aadhar}
            error={errors.aadhar}
            onChange={handleChange}
            type="number"
          />
        </div>

        {/* Country & City */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1 w-full md:w-[48%]">
            <label className="text-sm text-slate-700">Country:</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Country --</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-[48%]">
            <label className="text-sm text-slate-700">City:</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select City --</option>
              {form.country &&
                Cities[form.country]?.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button
          className="p-3 w-full bg-black text-white rounded hover:bg-gray-800"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );

   
}

function InputField({ label, maxLength ,name, value, onChange, error, type = "text" }) {
  return (
    <div className="flex flex-col gap-1 w-full md:w-[48%]">
      <label className="text-sm text-slate-700">{label}:</label>
      <input
        name={name}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
