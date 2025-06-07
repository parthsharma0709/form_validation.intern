import { useLocation } from "react-router-dom"

export function Subbmission(){
    const location=useLocation();
    const {firstname,lastname,username,email,password,phone,pan,aadhar,country,city}=location.state || {};
    return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-600">
      <div className="flex flex-col gap-3 rounded-xl p-6 w-[400px] bg-black text-white shadow-lg border border-slate-700">
        <h1 className="text-2xl font-semibold text-center mb-4">Your Details</h1>

        <Detail label="First Name" value={firstname} />
        <Detail label="Last Name" value={lastname} />
        <Detail label="Username" value={username} />
        <Detail label="Email" value={email} />
        <Detail label="Password" value={password} />
        <Detail label="Phone" value={phone} />
        <Detail label="PAN" value={pan} />
        <Detail label="Aadhar" value={aadhar} />
        <Detail label="Country" value={country} />
        <Detail label="City" value={city} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between w-full border-b border-slate-700 pb-1">
      <span className="text-gray-400">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}