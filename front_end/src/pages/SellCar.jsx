import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { createSellRequest } from "../api/sellApi";
import { getCurrentUser } from "../api/authApi";
import "../styles/SellCar.css";

const carFeatures = [
  "Power Steering",
  "AC",
  "Alarm",
  "Bluetooth",
  "Heated Seats",
  "Wifi",
  "Cruise Control",
  "Front Parking Sensor",
  "Rear Parking Sensor",
  "Roof Rack",
  "Power Windows",
  "Sunroof",
  "USB Port",
  "Sound System",
  "Memory Seat",
];

export default function SellCar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Car Details
    title: "",
    condition: "new",
    bodyType: "",
    brand: "",
    model: "",
    year: "",
    passengerCapacity: 2,
    exteriorColor: "",
    description: "",
    // Engine Details
    fuelType: "",
    mileage: "",
    transmission: "",
    drivetrain: "",
    engineCapacity: "",
    power: "",
    // Dimension
    length: "",
    width: "",
    height: "",
    cargoVolume: "",
    // Features
    features: [],
    otherFeatures: "",
    // Price & Media
    price: "",
    images: [],
    videoLink: "",
  });

  const [featureSearch, setFeatureSearch] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
    // In production, you would upload these to a cloud storage service
    // For now, we'll just store the file names
    const fileNames = files.map((f) => f.name);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...fileNames],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        userId: user?._id || null,
        year: formData.year ? parseInt(formData.year) : null,
        passengerCapacity: parseInt(formData.passengerCapacity),
        mileage: formData.mileage ? parseFloat(formData.mileage) : null,
        engineCapacity: formData.engineCapacity
          ? parseFloat(formData.engineCapacity)
          : null,
        power: formData.power ? parseFloat(formData.power) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        width: formData.width ? parseFloat(formData.width) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        cargoVolume: formData.cargoVolume
          ? parseFloat(formData.cargoVolume)
          : null,
        price: parseFloat(formData.price),
      };

      await createSellRequest(submitData);
      alert(
        "Sell request submitted successfully! Admin will review your request."
      );
      navigate("/");
    } catch (error) {
      alert(
        error.message || "Failed to submit sell request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredFeatures = carFeatures.filter((feature) =>
    feature.toLowerCase().includes(featureSearch.toLowerCase())
  );

  return (
    <div className="sellcar-page">
      <PageHeader title="Sell Your Car" />
      <div className="sellcar-container">
        <form onSubmit={handleSubmit} className="sellcar-form">
          {/* Car Details Section */}
          <section className="form-section">
            <h2 className="section-title">Car Details</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Condition</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="condition"
                      value="new"
                      checked={formData.condition === "new"}
                      onChange={handleInputChange}
                    />
                    New
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="condition"
                      value="used"
                      checked={formData.condition === "used"}
                      onChange={handleInputChange}
                    />
                    Used
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Body Type</label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Wagon">Wagon</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>

              <div className="form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Audi">Audi</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Kia">Kia</option>
                  <option value="Mazda">Mazda</option>
                </select>
              </div>

              <div className="form-group">
                <label>Model</label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="Camry">Camry</option>
                  <option value="Corolla">Corolla</option>
                  <option value="Civic">Civic</option>
                  <option value="Accord">Accord</option>
                  <option value="F-150">F-150</option>
                  <option value="Mustang">Mustang</option>
                  <option value="3 Series">3 Series</option>
                  <option value="5 Series">5 Series</option>
                </select>
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                  {Array.from({ length: 25 }, (_, i) => 2024 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Passenger Capacity</label>
                <div className="number-input">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        passengerCapacity: Math.max(
                          2,
                          prev.passengerCapacity - 1
                        ),
                      }))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="passengerCapacity"
                    value={formData.passengerCapacity}
                    onChange={handleInputChange}
                    min="2"
                    max="8"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        passengerCapacity: Math.min(
                          8,
                          prev.passengerCapacity + 1
                        ),
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Exterior Color</label>
                <select
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Silver">Silver</option>
                  <option value="Gray">Gray</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Brown">Brown</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write description about your car"
                  rows="5"
                />
              </div>
            </div>
          </section>

          {/* Engine Details Section */}
          <section className="form-section">
            <h2 className="section-title">Engine Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mileage</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">km</span>
                </div>
              </div>

              <div className="form-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
                </select>
              </div>

              <div className="form-group">
                <label>Drivetrain</label>
                <select
                  name="drivetrain"
                  value={formData.drivetrain}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="AWD">AWD</option>
                  <option value="4WD">4WD</option>
                </select>
              </div>

              <div className="form-group">
                <label>Engine Capacity</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="engineCapacity"
                    value={formData.engineCapacity}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">cc</span>
                </div>
              </div>

              <div className="form-group">
                <label>Power</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="power"
                    value={formData.power}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">hp</span>
                </div>
              </div>
            </div>
          </section>

          {/* Dimension Section */}
          <section className="form-section">
            <h2 className="section-title">Dimension</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Length</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">mm</span>
                </div>
              </div>

              <div className="form-group">
                <label>Width</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">mm</span>
                </div>
              </div>

              <div className="form-group">
                <label>Height</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">mm</span>
                </div>
              </div>

              <div className="form-group">
                <label>Cargo Volume</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    name="cargoVolume"
                    value={formData.cargoVolume}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <span className="unit">L</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="form-section">
            <h2 className="section-title">Features</h2>
            <div className="features-search">
              <input
                type="text"
                placeholder="Search here"
                value={featureSearch}
                onChange={(e) => setFeatureSearch(e.target.value)}
                className="feature-search-input"
              />
            </div>
            <div className="features-grid">
              {filteredFeatures.map((feature) => (
                <label key={feature} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
            <div className="form-group full-width">
              <label>Other Features</label>
              <input
                type="text"
                name="otherFeatures"
                value={formData.otherFeatures}
                onChange={handleInputChange}
                placeholder="Write another feature here"
              />
            </div>
          </section>

          {/* Price Section */}
          <section className="form-section">
            <h2 className="section-title">Price</h2>
            <div className="form-group">
              <label>Full Price</label>
              <div className="price-input">
                <span className="price-prefix">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </section>

          {/* Images & Video Section */}
          <section className="form-section">
            <h2 className="section-title">Images & Video</h2>
            <div className="form-group">
              <label>Upload your Image / Video</label>
              <div className="upload-box">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="file-upload" className="upload-label">
                  <span className="upload-icon">+</span>
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="uploaded-file">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="form-group full-width">
              <label>Link for Video</label>
              <input
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
