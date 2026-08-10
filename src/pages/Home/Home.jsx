import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categories, drops } from "../../data/products.js";
import { api } from "../../api/client.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import ReviewStars from "../../components/ReviewStars/ReviewStars.jsx";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer.jsx";
import "./Home.css";

const categoryImages = {
  Corsets: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80",
  Outerwear: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=700&q=80",
  Dresses: "https://i.pinimg.com/736x/d1/6d/de/d16dde35b8dedcd58fd10df51d534999.jpg",
  Accessories: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80",
  Skirts: "https://i.pinimg.com/1200x/8f/32/e6/8f32e6dc98791719bb407d9b9a257e6b.jpg",
  Tops: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=700&q=80",
  Bottoms: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=80",
};

const testimonials = [
  {
    name: "Amara J.",
    quote:
      "The De-Constructed Duchess feels like it was pulled out of a palace and a pop-up shop at the same time. Nothing else in my closet compares.",
  },
  {
    name: "Devon K.",
    quote:
      "Got the Scandal Sheet email at 7am, checked out by 7:03. The Hype Tailcoat sold out an hour later. Worth setting an alarm for.",
  },
  {
    name: "Priya R.",
    quote:
      "Regencycore finally has a brand that doesn't feel like a costume. This is genuinely wearable, genuinely rare.",
  },
];

// Fade-in on scroll
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;
    api
      .get("/api/products")
      .then((data) => {
        if (!ignore) setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!ignore) setProducts([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const bestSellers = [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 4);
  const dropTarget = new Date();
  dropTarget.setDate(dropTarget.getDate() + 2);
  dropTarget.setHours(dropTarget.getHours() + 11);
  dropTarget.setMinutes(dropTarget.getMinutes() + 22);

  return (
    <div className="hh-home">
      {/* Hero */}
      <section className="hh-home-hero">
        <video
          className="hh-home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1600&q=80"
        >
          <source src="https://videos.pexels.com/video-files/6719117/6719117-uhd_2732_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hh-home-hero-overlay" />
        <div className="hh-home-hero-content">
          <span className="eyebrow">The Royal Collection</span>
          <h1>Rule The Modern Court</h1>
          <p className="hh-home-hero-subtitle">Streetwear inspired by royalty. Cut for the culture.</p>
          <div className="hh-home-hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
            <Link to="/shop?category=Corsets" className="btn btn-outline btn-outline-light">
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* Drop banner */}
      <section className="hh-drop-banner">
        <div className="container hh-drop-banner-inner">
          <div>
            <span className="eyebrow">Drop {drops[0].number}</span>
            <h2>{drops[0].name}</h2>
            <p>Only a handful of pieces remain in each size</p>
          </div>
          <CountdownTimer targetDate={dropTarget} />
          <Link to="/shop" className="btn btn-primary">Claim Yours</Link>
        </div>
      </section>

      {/* Featured collection */}
      <FadeSection>
        <section className="container hh-section">
          <span className="eyebrow">Shop By Category</span>
          <h2 className="section-heading">Featured Collection</h2>
          <div className="hh-category-grid">
            {categories.map((cat) => (
              <Link key={cat} to={`/shop?category=${cat}`} className="hh-category-card">
                <img src={categoryImages[cat]} alt={cat} />
                <span>{cat}</span>
              </Link>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* Best sellers */}
      <FadeSection>
        <section className="container hh-section">
          <span className="eyebrow">Most Coveted</span>
          <h2 className="section-heading">Best Sellers</h2>
          <div className="hh-product-grid">
            {bestSellers.length === 0 ? (
              <p>No products available yet.</p>
            ) : (
              bestSellers.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </section>
      </FadeSection>

      {/* Brand story */}
      <FadeSection>
        <section className="container hh-brand-story">
          <img
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80"
            alt="Historical Hype garment detail"
          />
          <div>
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="section-heading">The 1810s Social Season, Run Like A Sneaker Drop</h2>
            <p>
              Historical Hype treats the London Season the way SNKRS treats a release date:
              exclusive, time-boxed, and worth losing sleep over. Structured corsetry meets
              industrial zippers. Silk jacquard meets raw denim. Nothing is mass-produced —
              every drop is named after the ball it's dressed for, and every piece disappears
              when the Season ends.
            </p>
            <Link to="/about" className="btn btn-outline">Read Our Story</Link>
          </div>
        </section>
      </FadeSection>

      {/* The Ton membership */}
      <FadeSection>
        <section className="hh-ton-section">
          <div className="container hh-ton-inner">
            <div>
              <span className="eyebrow">Membership</span>
              <h2 className="section-heading">Join The Ton</h2>
              <p>
                The Ton is Historical Hype's invite-only membership. Earn points on every
                purchase to unlock early access to <strong>The Scandal Sheet</strong> — our
                private launch list that sends new drops before they go public, the way
                gossip always reached the right rooms first.
              </p>
              <Link to="/shop" className="btn btn-primary">Enter The Ton</Link>
            </div>
            <ul className="hh-ton-perks">
              <li><strong>01</strong> Early access to every drop, hours before public release</li>
              <li><strong>02</strong> The Scandal Sheet — a private email list for launch alerts</li>
              <li><strong>03</strong> Orders shipped in matte black boxes, wrapped in printed parchment</li>
              <li><strong>04</strong> Points on every purchase, redeemable for archive pieces</li>
            </ul>
          </div>
        </section>
      </FadeSection>

      {/* Testimonials */}
      <FadeSection>
        <section className="container hh-section">
          <span className="eyebrow">The Court Speaks</span>
          <h2 className="section-heading">Testimonials</h2>
          <div className="hh-testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="hh-testimonial-card">
                <ReviewStars rating={5} />
                <p>"{t.quote}"</p>
                <span>— {t.name}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* Newsletter */}
      <FadeSection>
        <section className="hh-newsletter">
          <div className="container hh-newsletter-inner">
            <h2 className="section-heading">Join The Court</h2>
            <p>Be first to know when a new drop goes live.</p>
            <form className="hh-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <button type="submit" className="btn btn-primary">Become Royalty</button>
            </form>
          </div>
        </section>
      </FadeSection>
    </div>
  );
}
