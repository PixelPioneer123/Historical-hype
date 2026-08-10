import "./About.css";

export default function About() {
  return (
    <div className="hh-about">
      <section className="hh-about-hero">
        <img
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&q=80"
          alt=""
        />
        <div className="hh-about-hero-overlay" />
        <div className="hh-about-hero-content">
          <span className="eyebrow">Our Story</span>
          <h1>The 1810s London Season, Run Like A Sneaker Drop</h1>
        </div>
      </section>

      <section className="container hh-about-body">
        <p className="hh-about-lead">
          Historical Hype starts from one idea: treat the Regency "Social Season"
          the way Nike treats an SNKRS release. Not a costume. Not a museum piece.
          An exclusive, high-energy club that happens to be dressed in empire
          waists and boned corsetry — and drops new pieces the way streetwear
          brands drop new pairs.
        </p>

        <div className="hh-about-grid">
          <div>
            <h2>The Silhouette</h2>
            <p>
              True empire waists, structured boned corsets, dramatic square
              necklines, heavily puffed sleeves, tailcoat structuring. Every
              cut is built from real Regency pattern-making, not a costume
              approximation of it.
            </p>
          </div>
          <div>
            <h2>The Hype</h2>
            <p>
              Visible heavy-duty industrial zippers, utility buckles, chunky
              screen-printed graphic text across luxury silk, oversized
              hoodies with lace-up corset backs. History's structure, worn
              with streetwear's rules.
            </p>
          </div>
        </div>

        <div className="hh-about-fabric">
          <h2>The Fabric Remix</h2>
          <p>
            Instead of only traditional brocade and pastel silk, we build in
            raw denim, technical nylon, reflective thread, and neon-stitched
            jacquard — so a gown can be read from across a ballroom, or across
            a street.
          </p>
        </div>

        <blockquote>
          "I am part of an exclusive royal fashion movement."
        </blockquote>

        <div className="hh-about-drops">
          <span className="eyebrow">The Drop System</span>
          <h2 className="section-heading">Named After The Ball, Not The Season</h2>
          <p>
            We don't release "Spring/Summer." We release <strong>Drops</strong> —
            each one named after a social event, each one live for a limited
            window, each one gone once it sells through. Drop 01 is{" "}
            <em>The Vauxhall Ball</em>. Drop 02, <em>The Queen's Garden</em>,
            is next.
          </p>
        </div>

        <div className="hh-about-ton">
          <span className="eyebrow">Membership</span>
          <h2 className="section-heading">The Ton</h2>
          <p>
            Your account here isn't a "loyalty program" — it's <strong>The Ton</strong>,
            named for the small circle of London's most fashionable people who
            always heard the news first. Members earn points toward early access to{" "}
            <strong>The Scandal Sheet</strong>, our private launch list that sends
            new drops before they go public. Gossip always traveled fast in the
            right rooms; now it travels through your inbox.
          </p>
        </div>

        <div className="hh-about-packaging">
          <span className="eyebrow">Unboxing</span>
          <h2 className="section-heading">The Packaging</h2>
          <p>
            Every order ships in a minimalist matte black box — no branding
            screaming from the outside, the way any hype release should
            arrive. Inside, each piece is wrapped in custom-printed parchment
            paper made to look like a handwritten gossip newsletter from the
            Season it was named for.
          </p>
        </div>

        <div className="hh-about-values">
          <div>
            <h3>Bold</h3>
            <p>Every piece takes a stance — nothing in our catalog is quiet.</p>
          </div>
          <div>
            <h3>Elegant</h3>
            <p>Tailoring and craft rooted in genuine period construction.</p>
          </div>
          <div>
            <h3>Exclusive</h3>
            <p>Limited drops, not endless restocks.</p>
          </div>
          <div>
            <h3>Dramatic</h3>
            <p>Fashion as theatre — designed to be seen and remembered.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
