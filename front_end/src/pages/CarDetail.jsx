import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Share2,
  ShieldCheck,
  Phone,
  Mail,
  Star,
  ArrowUp,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getCarById } from "../api/mockApi";
import "../styles/CarDetail.css";

const dealerInfo = {
  name: "Alfredo Gouse",
  role: "Dealer",
  phone: "240-865-3730",
  email: "alfred.g@mail.com",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
};

const defaultDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam
non nulla a, vestibulum aliquet facilisi interdum nibh blandit. Leo amet
ultricies cum cras est sed curabitur ultrices faucibus. Ultricies
pellentesque ultricies semper leo maecenas. Amet, et sagittis consectetur
ut auctor iaculis. Id non velit auctor praesent a amet risus facilisis.
Lobortis nisl placerat orci, eu nisl ornare. Eu vitae pellentesque rhoncus
eros vivamus est purus enim dui. leo a pharetra massa tristique. Ullamcorper
pellentesque laoreet dui pulvinar facilisi. Iaculis mauris senectus sodales
porta malesuada tincidunt et. Quam dui nulla venenatis suscipit nulla luctus
volutpat, augue purus. Sed condimentum porttitor malesuada pharetra pulvinar
leo augue nunc.`;

const featureLibrary = [
  "Autopilot",
  "Summon",
  "Autopark",
  "Auto Lane Change",
  "15 inch Touchscreen Display",
  "360° Camera",
  "12 Ultrasonic Sensor",
  "Heated Seats",
  "Premium Audio",
  "Navigation System",
];

const fallbackGallery = [
  "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  "https://images.pexels.com/photos/3812925/pexels-photo-3812925.jpeg",
  "https://images.pexels.com/photos/2811497/pexels-photo-2811497.jpeg",
  "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
];

export default function CarDetail({ carId }) {
  const params = useParams();
  const { id: routeId } = params;
  const navigate = useNavigate();
  const resolvedId = carId ?? routeId;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchCar(targetId) {
      if (!targetId) {
        setLoading(false);
        setCar(null);
        return;
      }
      setLoading(true);
      const detail = await getCarById(targetId);
      if (!mounted) return;
      setCar(detail);
      setLoading(false);
    }
    fetchCar(resolvedId);
    return () => {
      mounted = false;
    };
  }, [resolvedId]);

  useEffect(() => {
    setActiveImage(0);
  }, [car]);

  const galleryImages = useMemo(() => {
    if (!car) return [];
    const base = Array.isArray(car.gallery) ? car.gallery : [];
    const candidate = [car.img, ...base, ...fallbackGallery].filter(Boolean);
    const unique = [];
    candidate.forEach((src) => {
      if (src && !unique.includes(src)) unique.push(src);
    });
    return unique.slice(0, 6);
  }, [car]);

  const specSections = useMemo(() => {
    if (!car)
      return {
        carDetails: [],
        engine: [],
        battery: [],
        dimension: [],
      };

    return {
      carDetails: [
        { label: "Brand", value: car.brand || "Tesla" },
        { label: "Model", value: car.model || car.name?.split(" ")[1] },
        {
          label: "Condition",
          value: car.condition === "used" ? "Used" : "New",
        },
        { label: "Year", value: car.year || "2019" },
        { label: "Body Type", value: car.bodyType || "Sedan" },
        { label: "Seats", value: car.seats || 5 },
        { label: "Exterior Color", value: car.color || "Red" },
      ],
      engine: [
        { label: "Fuel Type", value: car.fuel || "Electric" },
        { label: "Mileage", value: car.mileage || "340 km" },
        { label: "Transmission", value: car.transmission || "Automatic" },
        { label: "Drivetrain", value: car.driveType || "Rear-wheel Drive" },
        { label: "Power", value: car.power || "283 hp (211 kW)" },
      ],
      battery: [
        { label: "Battery Capacity", value: car.battery || "55.0 kWh" },
        { label: "Charge Speed", value: car.chargeSpeed || "64 km/h" },
        { label: "Charge Port", value: car.chargePort || "Type 2" },
        { label: "Charge Time (0-100%)", value: car.chargeTime || "330 min" },
      ],
      dimension: [
        { label: "Length", value: car.length || "4694 mm" },
        { label: "Width", value: car.width || "1849 mm" },
        { label: "Height", value: car.height || "1443 mm" },
        { label: "Cargo Volume", value: car.cargo || "542 L" },
      ],
    };
  }, [car]);

  const featureList = useMemo(() => {
    const existing = Array.isArray(car?.features) ? car.features : [];
    const merged = [...new Set([...existing, ...featureLibrary])];
    return merged;
  }, [car]);

  const visibleFeatures = showAllFeatures
    ? featureList
    : featureList.slice(0, 6);

  const descriptionText = car?.description || defaultDescription;
  const truncatedDescription =
    isDescExpanded || descriptionText.length <= 420
      ? descriptionText
      : `${descriptionText.slice(0, 420)}...`;

  const heroImage =
    galleryImages.length > 0 ? galleryImages[activeImage] : car?.img;

  const handlePrev = () => {
    setActiveImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setActiveImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleFormChange = (field, value) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 600);
  };

  if (!loading && !car) {
    return (
      <div className="car-detail-page">
        <div className="detail-header">
          <p className="breadcrumb">Homepage - New Car List - Car Detail</p>
          <h1>Car not found</h1>
          <p className="subtitle">
            We could not find the vehicle you were looking for.
          </p>
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/newcars")}
          >
            Back to inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <Loader visible={loading} fullscreen />
      {!loading && car && (
        <>
          <header className="detail-header">
            <p className="breadcrumb">
              <Link to="/">Homepage</Link> -{" "}
              <Link to="/newcars">New Car List</Link> - Car Detail
            </p>
            <h1>{car.name || "Vehicle Detail"}</h1>
            <div className="header-meta">
              <span>
                {car.brand} · {car.model} · {car.year}
              </span>
              <span>
                <MapPin size={16} />
                {car.location || "Los Angeles, USA"}
              </span>
            </div>
          </header>

          <section className="hero-media">
            <div className="hero-image">
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="nav-btn prev"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="nav-btn next"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              {heroImage && (
                <img src={heroImage} alt={car.name} className="main-photo" />
              )}
            </div>
            <div className="gallery-strip">
              {galleryImages.map((thumb, index) => (
                <button
                  type="button"
                  key={thumb + index}
                  className={`thumb ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={thumb} alt={`Gallery ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>

          <section className="detail-layout">
            <div className="detail-main">
              <article className="detail-card">
                <div className="card-header">
                  <h2>Description</h2>
                </div>
                <p className="description">{truncatedDescription}</p>
                {descriptionText.length > 420 && (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setIsDescExpanded((prev) => !prev)}
                  >
                    {isDescExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </article>

              <article className="detail-card">
                <div className="card-header">
                  <h2>Feature</h2>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setShowAllFeatures((prev) => !prev)}
                  >
                    {showAllFeatures ? "Show less" : "Show more"}
                  </button>
                </div>
                <div className="feature-grid">
                  {visibleFeatures.map((feature) => (
                    <label key={feature} className="feature-chip">
                      <input type="checkbox" checked readOnly />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </article>

              <article className="detail-card">
                <h2>Dealer Info</h2>
                <div className="dealer-card">
                  <img
                    src={dealerInfo.avatar}
                    alt={dealerInfo.name}
                    className="dealer-avatar"
                  />
                  <div>
                    <p className="dealer-name">{dealerInfo.name}</p>
                    <p className="dealer-role">{dealerInfo.role}</p>
                  </div>
                  <div className="dealer-actions">
                    <a href={`tel:${dealerInfo.phone}`} className="icon-btn">
                      <Phone size={18} />
                    </a>
                    <a href={`mailto:${dealerInfo.email}`} className="icon-btn">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
                <div className="dealer-contact">
                  <span>{dealerInfo.phone}</span>
                  <span>{dealerInfo.email}</span>
                </div>
              </article>

              <article className="detail-card">
                <h2>Contact</h2>
                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <label>
                      Name
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={contactForm.name}
                        onChange={(e) =>
                          handleFormChange("name", e.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="email"
                        placeholder="email@mail.com"
                        value={contactForm.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Phone (Optional)
                      <input
                        type="tel"
                        placeholder="(000) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) =>
                          handleFormChange("phone", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Subject
                      <input
                        type="text"
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={(e) =>
                          handleFormChange("subject", e.target.value)
                        }
                        required
                      />
                    </label>
                  </div>
                  <label>
                    Comment
                    <textarea
                      rows={4}
                      placeholder="Leave a message here"
                      value={contactForm.message}
                      onChange={(e) =>
                        handleFormChange("message", e.target.value)
                      }
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Contact Dealer"}
                  </button>
                </form>
              </article>
            </div>

            <aside className="detail-sidebar">
              <div className="price-card">
                <div>
                  <p className="price-label">Starting at</p>
                  <p className="price">
                    $
                    {car.price
                      ? car.price.toLocaleString()
                      : car.msrp?.toLocaleString() || "0"}
                  </p>
                </div>
                <button type="button" className="icon-btn">
                  <Share2 size={16} />
                </button>
              </div>
              <div className="detail-card compact">
                <h3>Car Details</h3>
                <ul className="spec-list">
                  {specSections.carDetails.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-card compact">
                <h3>Engine</h3>
                <ul className="spec-list">
                  {specSections.engine.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-card compact">
                <h3>Battery and Charging</h3>
                <ul className="spec-list">
                  {specSections.battery.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-card compact">
                <h3>Dimension</h3>
                <ul className="spec-list">
                  {specSections.dimension.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-card compact history-card">
                <div className="history-header">
                  <div>
                    <h3>Vehicle History</h3>
                    <a href="#history" className="link-btn">
                      View report
                    </a>
                  </div>
                  <ShieldCheck size={22} />
                </div>
                <div className="rating">
                  {[...Array(5)].map((_, index) => {
                    const rating = car.rating || 4.5;
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating % 1 >= 0.5;
                    let starClass = "";
                    if (index < fullStars) starClass = "filled";
                    else if (index === fullStars && hasHalfStar)
                      starClass = "half";
                    return <Star key={index} size={18} className={starClass} />;
                  })}
                  <span>({car.reviews || 12} Reviews)</span>
                </div>
                <button type="button" className="secondary-btn">
                  Compare Car
                </button>
              </div>
            </aside>
          </section>
          <button
            type="button"
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={18} />
          </button>
        </>
      )}
    </div>
  );
}
