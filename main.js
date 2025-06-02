import React, { useState } from "https://cdn.skypack.dev/react";
import { createRoot } from "https://cdn.skypack.dev/react-dom/client";

function App() {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    jobDescription: "",
    plumberHours: "",
    plumberRate: "",
    helperHours: "",
    helperRate: "",
    materials: "",
    materialMarkup: 30,
    equipmentCharges: "",
    equipmentDescription: "",
    salesTax: 7.25,
    county: "",
  });

  const [estimate, setEstimate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEstimate = () => {
    const plumberTotal =
      (parseFloat(formData.plumberHours) || 0) *
      (parseFloat(formData.plumberRate) || 0);
    const helperTotal =
      (parseFloat(formData.helperHours) || 0) *
      (parseFloat(formData.helperRate) || 0);
    const materialMarkup = parseFloat(formData.materialMarkup) || 0;
    const materialWithMarkup =
      (parseFloat(formData.materials) || 0) * (1 + materialMarkup / 100);
    const equipmentCharges = parseFloat(formData.equipmentCharges) || 0;
    const subtotal = plumberTotal + helperTotal + materialWithMarkup + equipmentCharges;
    const tax = subtotal * ((parseFloat(formData.salesTax) || 0) / 100);
    const total = subtotal + tax;

    setEstimate({
      plumberTotal,
      helperTotal,
      materialWithMarkup,
      equipmentCharges,
      subtotal,
      tax,
      total,
      materialMarkup,
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Plumbing Estimate</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="estimate-content">
          <div className="space-y-4">
            <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleInputChange} />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />
            <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
            <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleInputChange}></textarea>
          </div>
          <div className="space-y-4">
            <input name="plumberHours" placeholder="Plumber Hours" value={formData.plumberHours} onChange={handleInputChange} />
            <input name="plumberRate" placeholder="Plumber Rate" value={formData.plumberRate} onChange={handleInputChange} />
            <input name="helperHours" placeholder="Helper Hours" value={formData.helperHours} onChange={handleInputChange} />
            <input name="helperRate" placeholder="Helper Rate" value={formData.helperRate} onChange={handleInputChange} />
            <input name="materials" placeholder="Materials Cost" value={formData.materials} onChange={handleInputChange} />
            <input name="materialMarkup" placeholder="Material Markup (%)" value={formData.materialMarkup} onChange={handleInputChange} />
            <input name="equipmentCharges" placeholder="Equipment Charges" value={formData.equipmentCharges} onChange={handleInputChange} />
            <textarea name="equipmentDescription" placeholder="Equipment Description" value={formData.equipmentDescription} onChange={handleInputChange}></textarea>
            <input name="salesTax" placeholder="Sales Tax (%)" value={formData.salesTax} onChange={handleInputChange} />
            <input name="county" placeholder="County" value={formData.county} onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button onClick={calculateEstimate}>Calculate Estimate</button>
          {estimate && <button onClick={() => window.print()}>Print Estimate</button>}
        </div>
        {estimate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Estimate Summary</h2>
            <p>Plumber Labor: ${estimate.plumberTotal.toFixed(2)}</p>
            <p>Helper Labor: ${estimate.helperTotal.toFixed(2)}</p>
            <p>Materials (with {estimate.materialMarkup}% markup): ${estimate.materialWithMarkup.toFixed(2)}</p>
            <p>Equipment Charges: ${estimate.equipmentCharges.toFixed(2)}</p>
            <p>Subtotal: ${estimate.subtotal.toFixed(2)}</p>
            <p>Sales Tax: ${estimate.tax.toFixed(2)}</p>
            <p className="text-xl font-bold text-lime-500">Total: ${estimate.total.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
