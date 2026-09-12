export type Locale = "ar" | "en" | "es";

export type CountryCode =
  | "MA"
  | "SA"
  | "AE"
  | "OM"
  | "IQ"
  | "LY"
  | "KW"
  | "BH"
  | "QA"
  | "EG"
  | "US"
  | "MX"
  | "AR"
  | "CR"
  | "EC"
  | "GT"
  | "HN"
  | "SV"
  | "NI"
  | "DO";

export type CurrencyCode =
  | "SAR"
  | "AED"
  | "KWD"
  | "BHD"
  | "OMR"
  | "QAR"
  | "IQD"
  | "LYD"
  | "EGP"
  | "MAD"
  | "USD"
  | "MXN"
  | "ARS"
  | "CRC"
  | "GTQ"
  | "HNL"
  | "NIO"
  | "DOP";

export interface Category {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  nameEs?: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionEs?: string;
  image: string;
  createdAt: string;
  /** If set, this is a country-market category */
  country?: CountryCode;
  availableIn?: CountryCode[];
}

export interface ProductLandingSection {
  titleAr: string;
  titleEn: string;
  titleEs?: string;
  bodyAr: string;
  bodyEn: string;
  bodyEs?: string;
  image?: string;
}

export interface ProductLandingFaq {
  questionAr: string;
  questionEn: string;
  questionEs?: string;
  answerAr: string;
  answerEn: string;
  answerEs?: string;
}

export interface ProductLanding {
  headlineAr: string;
  headlineEn: string;
  headlineEs?: string;
  introAr: string;
  introEn: string;
  introEs?: string;
  sections: ProductLandingSection[];
  benefitsAr: string[];
  benefitsEn: string[];
  benefitsEs?: string[];
  faq: ProductLandingFaq[];
}

/** Color option shown on the product page swatches */
export interface ProductColor {
  id: string;
  nameAr: string;
  nameEn: string;
  /** CSS color value, e.g. #1f3d36 */
  hex: string;
}

/** Quantity-based upsell tiers on the same product page */
export interface ProductQtyOffer {
  quantity: number;
  /** Total price for this quantity in local currency */
  marketPrices?: Partial<Record<CountryCode, number>>;
  /** Discount off qty × unit price when marketPrices not set */
  discountPercent?: number;
  labelAr?: string;
  labelEn?: string;
  labelEs?: string;
  /** Highlight as recommended tier */
  popular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  nameAr: string;
  nameEn: string;
  nameEs?: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionEs?: string;
  detailsAr: string[];
  detailsEn: string[];
  detailsEs?: string[];
  /** Base catalog price in USD (fallback) */
  priceUSD: number;
  compareAtUSD?: number;
  /**
   * Local market prices keyed by country (in that country's currency).
   * Example: { MA: 499, SA: 189, AE: 179 }
   */
  marketPrices?: Partial<Record<CountryCode, number>>;
  marketComparePrices?: Partial<Record<CountryCode, number>>;
  /** If set, product only appears in these markets */
  availableIn?: CountryCode[];
  images: string[];
  /** @deprecated Preset swatches removed — kept optional for old data */
  colors?: ProductColor[];
  /** When true, customer can type their preferred color on the product page */
  customColorEnabled?: boolean;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  landing?: ProductLanding;
  /** Same-product quantity upsell tiers (1 / 2 / 3 pcs…) */
  qtyOffers?: ProductQtyOffer[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  /** Override line total in USD when qty-tier pricing applies */
  lineTotalUSD?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  };
  country: CountryCode;
  currency: CurrencyCode;
  locale: Locale;
  paymentMethod: "cod";
  totalUSD: number;
  createdAt: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

export interface CurrencyInfo {
  code: CurrencyCode;
  nameAr: string;
  nameEn: string;
  nameEs?: string;
  symbol: string;
  /** Multiply USD price by this to get local amount */
  rate: number;
  region: "gulf" | "morocco" | "mena" | "usa" | "latam";
}
