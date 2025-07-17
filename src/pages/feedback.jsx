import React, { useState } from "react";
import { CheckCircle, PlusCircle, Trash2, MapPin, Bus, X } from "lucide-react";
import { useNavigate } from "react-router";

const Feedback = () => {
  const navigate = useNavigate();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Route Information
    town: "Nairobi",
    road: "",
    destination: "",
    departure: "",
    distance: "",

    // Matatu Data
    matatus: [
      {
        saccoName: "",
        matatuName: "",
        matatuNumber: "",
        stageLocationDestination: "",
        stageLocationDeparture: "",
        payment: [],
        dropoffs: "",
        peakFare: "",
        offPeakFare: "",
        type: "",
        rating: "",
        contacts: "",
      },
    ],

    comments: "",
  });
  const [errors, setErrors] = useState({});

  // Hardcoded Nairobi roads
  const roads = [
    "Thika Road",
    "Waiyaki Way",
    "Jogoo Road",
    "Kiambu Road",
    "Lang'ata Road",
    "Mombasa Road",
  ];

  // Available matatu types and payment methods
  const matatuTypes = ["Standard", "Express"];
  const paymentOptions = ["Cash", "M-pesa", "Card"];

  const handleInputChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("matatu")) {
      const [, , prop] = name.split("-");
      const updatedMatatus = [...formData.matatus];

      if (prop === "payment") {
        const currentPayment = updatedMatatus[index].payment;
        const updatedPayment = checked
          ? [...currentPayment, value]
          : currentPayment.filter((p) => p !== value);
        updatedMatatus[index] = {
          ...updatedMatatus[index],
          payment: updatedPayment,
        };
      } else {
        updatedMatatus[index] = { ...updatedMatatus[index], [prop]: value };
      }

      setFormData((prev) => ({ ...prev, matatus: updatedMatatus }));
      setErrors((prev) => ({ ...prev, [`matatu-${index}`]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addMatatu = () => {
    setFormData((prev) => ({
      ...prev,
      matatus: [
        ...prev.matatus,
        {
          saccoName: "",
          matatuName: "",
          matatuNumber: "",
          stageLocationDestination: "",
          stageLocationDeparture: "",
          payment: [],
          dropoffs: "",
          peakFare: "",
          offPeakFare: "",
          type: "",
          rating: "",
          contacts: "",
        },
      ],
    }));
  };

  const removeMatatu = (index) => {
    if (formData.matatus.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      matatus: prev.matatus.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Route validation
    if (!formData.road) newErrors.road = "Please select a road";
    if (!formData.destination.trim())
      newErrors.destination = "Please enter a destination";
    if (!formData.departure.trim())
      newErrors.departure = "Please enter a departure point";

    // Matatu validation
    formData.matatus.forEach((matatu, index) => {
      if (
        !matatu.saccoName.trim() ||
        !matatu.matatuName.trim() ||
        !matatu.stageLocationDestination.trim() ||
        !matatu.peakFare ||
        !matatu.offPeakFare ||
        !matatu.type ||
        !matatu.dropoffs.trim() ||
        matatu.payment.length === 0
      ) {
        newErrors[`matatu-${index}`] =
          "Please fill all required matatu details";
      }
    });

    return newErrors;
  };

  const submitFeedback = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFormData({
        town: "Nairobi",
        road: "",
        destination: "",
        departure: "",
        distance: "",
        matatus: [
          {
            saccoName: "",
            matatuName: "",
            matatuNumber: "",
            stageLocationDestination: "",
            stageLocationDeparture: "",
            payment: [],
            dropoffs: "",
            peakFare: "",
            offPeakFare: "",
            type: "",
            rating: "",
            contacts: "",
          },
        ],
        comments: "",
      });
    }, 3000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header - More compact on mobile */}
      <header className="bg-gradient-to-r from-green-50 to-blue-50 py-4 sm:py-6 px-3 sm:px-6 lg:px-8 border-b border-gray-200 relative">
        <div className="max-w-4xl mx-auto">
          <div className="pr-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Submit Route & Matatu Info
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Help improve matatu route and service information for Nairobi
              commuters
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
            title="Close and return to main page"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Close
            </span>
          </button>
        </div>
      </header>

      {/* Main Content - Better spacing on mobile */}
      <main className="flex-grow py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6">
          {feedbackSubmitted ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Thank you!
              </h3>
              <p className="text-gray-600 text-base sm:text-lg">
                Your route and matatu information has been submitted and will be
                reviewed by our team.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Route Information - Stacked layout on mobile */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg sm:rounded-xl">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                  Route Information
                </h4>

                <div className="space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 sm:space-y-0">
                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Town
                    </label>
                    <input
                      type="text"
                      value="Nairobi"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-sm sm:text-base"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Road
                    </label>
                    <select
                      name="road"
                      value={formData.road}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors text-sm sm:text-base ${
                        errors.road ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>
                        Select a road
                      </option>
                      {roads.map((road) => (
                        <option key={road} value={road}>
                          {road}
                        </option>
                      ))}
                    </select>
                    {errors.road && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span> {errors.road}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Zimmerman"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors text-sm sm:text-base ${
                        errors.destination
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.destination && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span> {errors.destination}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Departure Point
                    </label>
                    <input
                      type="text"
                      name="departure"
                      value={formData.departure}
                      onChange={handleInputChange}
                      placeholder="e.g., Nairobi CBD"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors text-sm sm:text-base ${
                        errors.departure ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.departure && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span> {errors.departure}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                      Distance
                    </label>
                    <input
                      type="text"
                      name="distance"
                      value={formData.distance}
                      onChange={handleInputChange}
                      placeholder="e.g., 12 km"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors border-gray-300 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Matatu Information - Better mobile layout */}
              <div className="bg-blue-50 p-4 sm:p-5 rounded-lg sm:rounded-xl">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Bus className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                  Matatu Information
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Add matatus that operate on this route
                </p>

                <div className="space-y-4 sm:space-y-6">
                  {formData.matatus.map((matatu, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 sm:p-5 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <span className="text-base sm:text-lg font-semibold text-gray-800">
                          Matatu {index + 1}
                        </span>
                        {formData.matatus.length > 1 && (
                          <button
                            onClick={() => removeMatatu(index)}
                            className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Sacco Name
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-saccoName`}
                            value={matatu.saccoName}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., Super Metro"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Matatu Name
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-matatuName`}
                            value={matatu.matatuName}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., Thika Express"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Matatu Number
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-matatuNumber`}
                            value={matatu.matatuNumber}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., KCB 123A"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Stage Location at Destination
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-stageLocationDestination`}
                            value={matatu.stageLocationDestination}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., TRM"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Stage Location at Departure
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-stageLocationDeparture`}
                            value={matatu.stageLocationDeparture}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., Railways"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Peak Hours Average Fare (KES)
                          </label>
                          <input
                            type="number"
                            name={`matatu-${index}-peakFare`}
                            value={matatu.peakFare}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., 120"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Off-Peak Average Fare (KES)
                          </label>
                          <input
                            type="number"
                            name={`matatu-${index}-offPeakFare`}
                            value={matatu.offPeakFare}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., 100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Contacts
                          </label>
                          <input
                            type="text"
                            name={`matatu-${index}-contacts`}
                            value={matatu.contacts}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., 0700 123 456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Matatu Type
                          </label>
                          <select
                            name={`matatu-${index}-type`}
                            value={matatu.type}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          >
                            <option value="" disabled>
                              Select type
                            </option>
                            {matatuTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                            Service Rating (0-5)
                          </label>
                          <input
                            type="number"
                            name={`matatu-${index}-rating`}
                            value={matatu.rating}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="e.g., 4.2"
                            step="0.1"
                            min="0"
                            max="5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-1 sm:mb-2">
                          Drop Off Points
                        </label>
                        <input
                          type="text"
                          name={`matatu-${index}-dropoffs`}
                          value={matatu.dropoffs}
                          onChange={(e) => handleInputChange(e, index)}
                          placeholder="e.g., Muthaiga, Allsops, Roasters (comma-separated)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <label className="block text-xs sm:text-sm text-left font-medium text-gray-700 mb-2 sm:mb-3">
                          Payment Methods Accepted
                        </label>
                        <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-3">
                          {paymentOptions.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name={`matatu-${index}-payment`}
                                value={option}
                                checked={matatu.payment.includes(option)}
                                onChange={(e) => handleInputChange(e, index)}
                                className="mr-2 sm:mr-3 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                              />
                              <span className="text-gray-700 font-medium text-sm sm:text-base">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {errors[`matatu-${index}`] && (
                        <p className="text-red-500 text-xs sm:text-sm mt-2 sm:mt-3 flex items-center">
                          <span className="mr-1">⚠</span>{" "}
                          {errors[`matatu-${index}`]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={addMatatu}
                    className="w-full flex items-center justify-center px-4 py-2 sm:py-3 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm sm:text-base font-medium cursor-pointer"
                  >
                    <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Add Another Matatu
                  </button>
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any other updates, observations, or helpful information..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm sm:text-base"
                />
              </div>

              {/* Action Buttons - Stacked on mobile */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="w-full border border-gray-300 py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={submitFeedback}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 font-medium shadow-lg cursor-pointer text-sm sm:text-base"
                >
                  Submit Information
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Matatu Route Finder. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Feedback;
