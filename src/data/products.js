export const categories = ["Corsets", "Outerwear", "Dresses", "Accessories", "Skirts", "Tops", "Bottoms"];
export const sizes = ["XS", "S", "M", "L", "XL"];
export const colors = ["Black", "Ivory", "Powder Blue", "Gold", "Distressed Denim"];

export const drops = [
  {
    id: "drop-01",
    name: "The Vauxhall Ball",
    number: "01",
    description:
      "Named for the pleasure gardens where the Ton went to be seen. Corsetry over streetwear, raw denim tailcoats, and the first Scandal Sheet release.",
  },
  {
    id: "drop-02",
    name: "The Queen's Garden",
    number: "02",
    description: "Pastel jacquard remixed with technical nylon. Coming next season.",
  },
];

export const products = [
  {
    id: "deconstructed-duchess",
    name: "The De-Constructed Duchess",
    categories: ["Corsets"],
    drop: "drop-01",
    price: 165,
    rating: 4.9,
    reviewCount: 142,
    isNew: true,
    images: [
      "https://i.pinimg.com/736x/0e/8e/52/0e8e525852dab503ed73410954b5512f.jpg",
      "https://i.pinimg.com/736x/8f/fd/d6/8ffdd69cb7a21ccb5c7477dc6b390850.jpg",
    ],
    colors: ["Powder Blue", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A fully boned pastel satin corset, structured the way a lady's maid would have laced it in 1813, worn over an oversized heavyweight streetwear hoodie. Pair with baggy cargo pants for the full silhouette. This is the piece that started the drop.",
    materials: "Corset: 100% cotton satin, steel boning, brass busk. Hoodie: 400gsm cotton fleece.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "promenade-tracksuit",
    name: "The Promenade Tracksuit",
    categories: ["Tops", "Bottoms"],
    drop: "drop-01",
    price: 220,
    rating: 4.8,
    reviewCount: 87,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    colors: ["Black", "Gold"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Velvet tracksuit with a high-collar cravat neckline on the jacket and historic gold button enclosures running down the outseam. Built for the promenade and the pop-up alike.",
    materials: "96% cotton velvet, 4% elastane. Antique gold-tone hardware.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "hype-tailcoat",
    name: "The Hype Tailcoat",
    categories: ["Outerwear"],
    drop: "drop-01",
    price: 285,
    rating: 4.9,
    reviewCount: 63,
    isNew: true,
    images: [
      "https://i.pinimg.com/736x/d5/20/65/d52065a66d7268eef73a43706c5654c1.jpg",
      "https://i.pinimg.com/736x/0b/37/5c/0b375c98cf322ad405b19c4beac25ab4.jpg",
      "https://i.pinimg.com/736x/26/96/23/269623884533918585b9371aafd1eafe.jpg",
    ],
    colors: ["Distressed Denim", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A gentleman's tailcoat cut from distressed raw denim, with a massive stylized graphic across the back reading 'DIAMOND OF THE SEASON'. Structured shoulders, true tailcoat tails, screen-printed by hand.",
    materials: "100% raw denim, distressed and stone-washed. Water-based screen print.",
    shipping: "Ships within 3–5 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "utility-corset-vest",
    name: "Utility Corset Vest",
    categories: ["Corsets", "Tops"],
    drop: "drop-01",
    price: 132,
    rating: 4.7,
    reviewCount: 54,
    isNew: false,
    images: [
      "https://i.pinimg.com/1200x/3f/e2/a3/3fe2a339cd06ffd34ceaf096722693e3.jpg",
      "https://i.pinimg.com/736x/a2/98/e6/a298e6be864cdc122a0485bae9718371.jpg",
      "https://i.pinimg.com/736x/cb/8e/6b/cb8e6b653d67e4d222ebe02292de0d7d.jpg",
      "https://i.pinimg.com/1200x/89/9b/af/899baf43832fba88b9576adaea73e19f.jpg",
    ],
    colors: ["Black", "Gold"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Underbust corset construction with visible industrial zippers and utility buckles where the busk would traditionally sit — history's structure, streetwear's hardware.",
    materials: "Technical nylon shell, steel boning, YKK zippers.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "empire-cargo-set",
    name: "Empire Cargo Set",
    categories: ["Tops", "Skirts", "Outerwear"],
    drop: "drop-01",
    price: 198,
    rating: 4.6,
    reviewCount: 41,
    isNew: false,
    images: [
      "https://i.pinimg.com/1200x/8f/32/e6/8f32e6dc98791719bb407d9b9a257e6b.jpg",
      "https://i.pinimg.com/1200x/15/66/a5/1566a597ea03ea02cccb70c803e0266d.jpg",
      "https://i.pinimg.com/1200x/96/c1/66/96c1662a7edd9d8a7df027da477b925b.jpg",
    ],
    colors: ["Ivory", "Black"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "True empire waist bodice, dramatic square neckline, paired with a matching cargo skirt cut from raw denim. Puffed sleeves, cargo pockets — the two silhouettes are meant to argue with each other.",
    materials: "Bodice: silk-blend jacquard. Skirt: 100% raw denim.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "signet-ring-gold",
    name: "The Ton Signet Ring",
    categories: ["Accessories"],
    drop: "drop-01",
    price: 48,
    rating: 4.7,
    reviewCount: 176,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
    ],
    colors: ["Gold"],
    sizes: ["S", "M", "L"],
    description:
      "Engraved with the Historical Hype crest — the mark that gets you recognized as a member of the Ton.",
    materials: "Gold vermeil over sterling silver.",
    shipping: "Ships within 1–3 business days in matte black packaging.",
  },
  {
    id: "reflective-cravat",
    name: "Reflective Thread Cravat",
    categories: ["Accessories"],
    drop: "drop-01",
    price: 42,
    rating: 4.5,
    reviewCount: 38,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    colors: ["Black", "Ivory"],
    sizes: ["S", "M"],
    description:
      "A traditional cravat, hand-tied, woven through with reflective thread that only shows under flash — built for the ball and the after-party.",
    materials: "Silk-blend with reflective jacquard thread.",
    shipping: "Ships within 1–3 business days in matte black packaging.",
  },
  {
    id: "diamond-hoodie",
    name: "Diamond Of The Season Hoodie",
    categories: ["Tops"],
    drop: "drop-01",
    price: 118,
    rating: 4.8,
    reviewCount: 96,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
    colors: ["Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Oversized heavyweight hoodie with a lace-up corset back and chunky screen-printed graphic text across the chest. The everyday piece of the drop.",
    materials: "480gsm cotton fleece. Cotton lacing, brass eyelets.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "lilac-skirt-top",
    name: "Lilac Maxi Skirt And Crop Top",
    categories: ["Skirts", "Tops"],
    drop: "drop-01",
    price: 70,
    rating: 3.9,
    reviewCount: 45,
    isNew: true,
    images: ["/images/slit_maxi_skirt_with_crop_top.png"],
    colors: ["Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A slit lilac maxi skirt paired with a matching cropped top — the two-piece silhouette designed to be worn together or split across separate looks.",
    materials: "95% viscose, 5% elastane.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "denim-corset",
    name: "Vintage Floral Denim Corset Top",
    categories: ["Corsets", "Tops"],
    drop: "drop-01",
    price: 40,
    rating: 4,
    reviewCount: 55,
    isNew: false,
    images: ["https://i.pinimg.com/736x/7f/e4/52/7fe45208394513ff8071361fda6970be.jpg"],
    colors: ["Distressed Denim"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A vintage-inspired blue denim corset top with delicate floral embroidery — chic, feminine, and built for layering over streetwear staples.",
    materials: "100% cotton denim, floral embroidery detailing.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
  {
    id: "floral-dress",
    name: "Vintage Floral Long Dress",
    categories: ["Dresses"],
    drop: "drop-01",
    price: 40,
    rating: 4,
    reviewCount: 55,
    isNew: true,
    images: [
      "https://i.pinimg.com/736x/d1/6d/de/d16dde35b8dedcd58fd10df51d534999.jpg",
      "https://i.pinimg.com/736x/e2/d2/4a/e2d24a2288b775527f51e8d188e2ba15.jpg",
    ],
    colors: ["Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Georgette crepe, full-sleeve long dress with a vintage floral print.",
    materials: "100% georgette crepe.",
    shipping: "Ships within 2–4 business days in matte black packaging, wrapped in parchment.",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getDropById(id) {
  return drops.find((d) => d.id === id);
}
