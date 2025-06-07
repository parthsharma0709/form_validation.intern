import { useState } from "react";


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
