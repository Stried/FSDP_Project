import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Switch from "react-switch";

function LocationsCreate() {
  const [formData, setFormData] = useState({
    LatAxis: "",
    LongAxis: "",
    locationName: "",
    streetName: "",
    postalCode: "",
    region: "",
    fastCharge: false,
    noOfChargers: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSwitchChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fastCharge: value,
    }));
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: yup.object().shape({
      LatAxis: yup.number().required("Please specify the Latitude."),
      LongAxis: yup.number().required("Please specify the Longitude."),
      locationName: yup
        .string()
        .trim()
        .required("Please provide a location name."),
      streetName: yup.string().trim().required("Please provide a street name."),
      postalCode: yup
        .number()
        .positive()
        .integer()
        .required("Please input a valid Postal Code."),
      region: yup
        .string()
        .trim()
        .oneOf(["North", "South", "East", "West"])
        .required("Please specify a valid region."),
      fastCharge: yup
        .boolean()
        .required("Please specify if the charger is capable of FastCharge."),
      noOfChargers: yup
        .number()
        .positive()
        .integer()
        .required("Please specify the number of chargers in the location."),
    }),
    onSubmit: async (data) => {
      try {
        await http.post("/locations/createLocation", data);
        navigate("/locations/LocationsMain");
      } catch (error) {
        console.log(error);
        toast.error(`${error.response.data.message}`);
      }
    },
  });

  return (
    <div className="bg-gray-900 py-10">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-green-400 text-3xl font-medium mb-4">
          Add a charger location
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="locationNameInput" className="text-white">
              Location Name
            </label>
            <input
              type="text"
              id="locationNameInput"
              name="locationName"
              placeholder="Hougang Mall"
              required
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
              value={formData.locationName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="streetNameInput" className="text-white">
              Street Name
            </label>
            <input
              type="text"
              id="streetNameInput"
              name="streetName"
              placeholder="90 Hougang Ave 10"
              required
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
              value={formData.streetName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="postalCodeInput" className="text-white">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCodeInput"
              name="postalCode"
              placeholder="538766"
              required
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latAxisInput" className="text-white">
                Latitude
              </label>
              <input
                type="text"
                id="latAxisInput"
                name="LatAxis"
                placeholder="1.373554718211368"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.LatAxis}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lngAxisInput" className="text-white">
                Longitude
              </label>
              <input
                type="text"
                id="lngAxisInput"
                name="LongAxis"
                placeholder="103.89370104229617"
                required
                className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
                value={formData.LongAxis}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="regionInput" className="text-white">
              Region
            </label>
            <select
              id="regionInput"
              name="region"
              required
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Select region</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
          <div className="flex items-center">
            <Switch
              id="fastChargeToggle"
              name="fastCharge"
              checked={formData.fastCharge}
              onChange={handleSwitchChange}
              onColor="#3182ce"
              offColor="#9ca3af"
              checkedIcon={false}
              uncheckedIcon={false}
              height={20}
              width={50}
            />
            <label htmlFor="fastChargeToggle" className="text-white pl-1">
              FastCharge Capable?
            </label>
          </div>
          <div>
            <label htmlFor="chargerNumberInput" className="text-white">
              Number of Chargers
            </label>
            <input
              type="number"
              id="chargerNumberInput"
              name="noOfChargers"
              placeholder="4"
              required
              className="bg-gray-800 text-gray-300 rounded-lg py-2 px-3 w-full"
              value={formData.noOfChargers}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}

export default LocationsCreate;
