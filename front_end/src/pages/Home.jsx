import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, CarFront, Car, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import Loader from "../components/Loader";
import { getCars } from "../api/mockApi";
import { addToCompare, canAddMore, isInCompare } from "../utils/compareUtils";
import "../styles/Home.css";
import HeroHeader from "../components/HeroHeader";

const tabs = [
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("new");
  const [catalog, setCatalog] = useState({ new: [], used: [] });
  const [loading, setLoading] = useState(true);
  const [leftCarId, setLeftCarId] = useState(null);
  const [rightCarId, setRightCarId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        setLoading(true);
        const [newCars, usedCars] = await Promise.all([
          getCars({ limit: 3, condition: "new" }),
          getCars({ limit: 3, condition: "used" }),
        ]);
        if (!mounted) return;
        setCatalog({
          new: newCars?.data || [],
          used: usedCars?.data || [],
        });
      } catch (error) {
        console.error("Failed to load home cars", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const allCompareOptions = useMemo(() => {
    const merged = [...(catalog.new || []), ...(catalog.used || [])];
    const uniqueMap = new Map();
    merged.forEach((car) => {
      if (car && !uniqueMap.has(car.id)) {
        uniqueMap.set(car.id, car);
      }
    });
    return Array.from(uniqueMap.values());
  }, [catalog]);

  useEffect(() => {
    if (allCompareOptions.length >= 2) {
      setLeftCarId((prev) => prev ?? allCompareOptions[0].id);
      setRightCarId((prev) =>
        prev && prev !== allCompareOptions[0].id
          ? prev
          : allCompareOptions[1].id
      );
    }
  }, [allCompareOptions]);

  const leftCar =
    allCompareOptions.find((car) => car.id === leftCarId) ||
    allCompareOptions[0];
  const rightCar =
    allCompareOptions.find((car) => car.id === rightCarId) ||
    allCompareOptions[1] ||
    allCompareOptions[0];

  const handleCompareNavigate = () => {
    const targetIds = [leftCar?.id, rightCar?.id].filter(Boolean);

    targetIds.forEach((id) => {
      if (!isInCompare(id) && canAddMore()) {
        addToCompare(id);
      }
    });

    navigate("/compare");
  };

  const activeList = useMemo(() => {
    const currentList = catalog[activeTab] || [];
    if (currentList.length > 0) return currentList;
    const fallback =
      activeTab === "new" ? catalog.used || [] : catalog.new || [];
    return fallback.slice(0, 3);
  }, [activeTab, catalog]);

  return (
    <div className="home-page">
      <HeroHeader />
      <div className="home-shell">
        <Loader visible={loading} />

        <section className="panel recommended-panel">
          <div className="panel-header">
            <div>
              <p className="panel-eyebrow">Recommended Cars</p>
              <div className="panel-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`tab-pill ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    disabled={activeTab === tab.id}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/newcars" className="link-arrow">
              See more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card-grid">
            {loading ? (
              <div className="state-message">Loading cars...</div>
            ) : activeList.length ? (
              activeList.map((car) => (
                <CarCard key={car.id} car={car} viewMode="grid" />
              ))
            ) : (
              <div className="state-message">
                No vehicles available at the moment.
              </div>
            )}
          </div>
        </section>

        <section className="panel compare-panel">
          <div className="panel-header">
            <p className="panel-eyebrow">Compare Cars</p>
            <Link to="/compare" className="link-arrow ghost">
              See more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="compare-wrapper">
            <article className="compare-card">
              <img src={leftCar?.img} alt={leftCar?.name} />
              <div className="compare-info">
                <h3>{leftCar?.name}</h3>
                {leftCar && (
                  <>
                    <p className="price">${leftCar.price?.toLocaleString()}</p>
                    <p className="location">{leftCar.location}</p>
                    <ul>
                      <li>{leftCar.year}</li>
                      <li>{leftCar.driveType}</li>
                      <li>{leftCar.fuel}</li>
                      <li>{leftCar.seats} Seats</li>
                    </ul>
                  </>
                )}
              </div>
              {leftCar && (
                <p className="rating">
                  ★★★★★ ({leftCar.reviews || 12} Reviews)
                </p>
              )}
              {allCompareOptions.length > 0 && (
                <div className="compare-select">
                  <select
                    value={leftCar?.id || ""}
                    onChange={(e) => setLeftCarId(Number(e.target.value))}
                  >
                    {allCompareOptions.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </article>

            <div className="vs-badge">VS</div>

            <article className="compare-card">
              <img src={rightCar?.img} alt={rightCar?.name} />
              <div className="compare-info">
                <h3>{rightCar?.name}</h3>
                {rightCar && (
                  <>
                    <p className="price">${rightCar.price?.toLocaleString()}</p>
                    <p className="location">{rightCar.location}</p>
                    <ul>
                      <li>{rightCar.year}</li>
                      <li>{rightCar.driveType}</li>
                      <li>{rightCar.fuel}</li>
                      <li>{rightCar.seats} Seats</li>
                    </ul>
                  </>
                )}
              </div>
              {rightCar && (
                <p className="rating">
                  ★★★★★ ({rightCar.reviews || 12} Reviews)
                </p>
              )}
              {allCompareOptions.length > 0 && (
                <div className="compare-select">
                  <select
                    value={rightCar?.id || ""}
                    onChange={(e) => setRightCarId(Number(e.target.value))}
                  >
                    {allCompareOptions.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </article>
          </div>

          <button
            type="button"
            className="compare-cta"
            onClick={handleCompareNavigate}
          >
            Compare Car
          </button>
        </section>

        {/* News / Reviews section */}
        <section className="home-news-section">
          <div className="home-news-header">
            <button className="home-news-tab active">News</button>
            <button className="home-news-tab">Reviews</button>
          </div>

          <div className="home-news-grid">
            <article className="home-news-main-card">
              <div className="home-news-image" />
              <div className="home-news-content">
                <p className="home-news-date">June, 01 2021</p>
                <h3>Etiam Eget</h3>
                <p className="home-news-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eget praesent gravida sed rutrum suspendisse eu.
                </p>
                <p className="home-news-author">By Carla Baptista</p>
              </div>
            </article>

            <div className="home-news-side">
              <article className="home-news-card small">
                <div className="home-news-thumb" />
                <div className="home-news-side-content">
                  <h4>A New Car</h4>
                  <p className="home-news-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="home-news-author">
                    By Carla Baptista · May, 28 2021
                  </p>
                </div>
              </article>

              <article className="home-news-card small">
                <div className="home-news-thumb" />
                <div className="home-news-side-content">
                  <h4>A New Car</h4>
                  <p className="home-news-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="home-news-author">
                    By Carla Baptista · May, 28 2021
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* About Us section */}
        <section className="home-about-section">
          <div className="home-about-left">
            <h2>About Us</h2>
            <p className="home-about-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              aliquet tortor sit amet sit. Velit imperdiet integer elementum a
              scelerisque pulvinar venenatis sodales. Quis nulla euismod feugiat
              at interdum in. Venenatis arcu semper lectus quis sit in rhoncus
              auctor.
            </p>

            <div className="home-about-stats">
              <div className="home-about-stat">
                <span className="number">150</span>
                <span className="label">Vehicle In Stock</span>
              </div>
              <div className="home-about-stat">
                <span className="number">40</span>
                <span className="label">Sold Car</span>
              </div>
              <div className="home-about-stat">
                <span className="number">38</span>
                <span className="label">Happy Customer</span>
              </div>
              <div className="home-about-stat">
                <span className="number">5</span>
                <span className="label">Awards</span>
              </div>
            </div>
          </div>

          <div className="home-about-right">
            <div className="home-about-image" />
          </div>
        </section>

        {/* Our Service section */}
        <section className="home-service-section">
          <h2>Our Service</h2>

          <div className="home-service-grid">
            <div className="home-service-card">
              <div className="home-service-icon">
                <CarFront size={28} strokeWidth={1.8} />
              </div>
              <h3>Buy a new car</h3>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <Car size={28} strokeWidth={1.8} />
              </div>
              <h3>Buy an used car</h3>
            </div>
            <Link to="/sell" className="home-service-card">
              <div className="home-service-icon">
                <Tag size={28} strokeWidth={1.8} />
              </div>
              <h3>Sell my car</h3>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
