export interface ZXLanguage {
    code: string;
    name: string;
    locale: string;
    flag: string;
    isDefault: boolean;
    homeUrl: string;
}

export interface ZXLogo {
    default?: string;
    dark?: string;
    light?: string;
    favicon?: string;
}

export interface ZXSocial {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
    threads?: string;
}

export interface ZXSite {
    title: string;
    description?: string;
    url: string;
    lang?: string;
    languages?: ZXLanguage[];
    logo?: ZXLogo;
    contact?: ZXContactForm;
    social?: ZXSocial;
    currency?: string;
    currencySymbol?: string;
}

export interface ZXMenu {
    name: string;
    slug: string;
    lang?: string;
    items: ZXMenuItem[];
}

export interface ZXMenuMeta {
    taxonomy?: string;
    slug?: string;
    thumbnail?: string;
    name?: string;
    description?: string;
    count?: number;
}

export interface ZXMenuItem {
    id: string;
    title: string;
    url: string;
    target?: string;
    classes?: string[];
    order?: number;
    objectId?: string;
    objectType?: string;
    lang?: string;
    icon?: string;
    isOverview?: boolean;
    children?: ZXMenuItem[];
    meta?: ZXMenuMeta;
    anchorTarget?: string | null;
}

export interface ZXCTA {
    enabled: boolean;
    title?: string;
    url?: string;
    newTab?: boolean;
    lang?: string;
}

type ZXContactFieldWidth =
    | "100"
    | "66"
    | "50"
    | "33";

type ZXContactFieldType =
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox"
    | "number"
    | "file"
    | "hidden";

export interface ZXContactFormField {
    name: string;
    label: string;
    placeholder?: string;
    type: ZXContactFieldType;
    width: ZXContactFieldWidth;
    required?: boolean;
    options?: string[];
}

export interface ZXContactForm {
    title: string;
    formId: string;
    lang?: string;
    submitLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    fields: ZXContactFormField[];
}

export interface ZXSeo {
    title?: string;
    description?: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
    noindex?: boolean;
    robots?: string;
    keywords?: string[];
    twitterCard?: string;
    twitterImage?: string;
    structuredData?: string;
}

export type ZXPageSection = {
    id: string;
    layout: string;
    rawJson: string;
};

export interface ZXPage {
    id: string;
    title: string;
    slug: string;
    lang?: string;
    template?: string;
    seo?: ZXSeo;
    sections?: ZXPageSection[];
}

export interface ZXServiceFeature {
    title: string;
    desc?: string;
    icon?: string;
}

export interface ZXService {
    id: string;
    title: string;
    slug: string;
    lang?: string;
    icon?: string;
    shortDesc?: string;
    thumbnail?: string;
    ctaText?: string;
    ctaUrl?: string;
    features?: ZXServiceFeature[];
}

export interface ZXFeature {
    id: number;
    title: string;
    slug: string;
    lang?: string;
    desc?: string;
    image?: string;
}

export interface ZXTeamMember {
    id: string;
    name: string;
    slug: string;
    lang?: string;
    position?: string;
    bio?: string;
    photo?: {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
    };
    linkedin?: string;
    email?: string;
    order?: number;
}

export interface ZXLocation {
    name: string;
    slug: string;
    lang?: string;
    primary?: boolean;
    country?: string;
    phone?: string;
    email?: string;
    address?: string;
    mapsUrl?: string;
    hours?: string;
}

export interface ZXSlide {
    title?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    mobileImageUrl?: string;
    videoUrl?: string;
    overlay?: number;
    alignment?: "left" | "center" | "right";
    ctaText?: string;
    ctaUrl?: string;
    cta2Text?: string;
    cta2Url?: string;
}

export interface ZXSlider {
    id: number;
    title?: string;
    autoplay?: boolean;
    loop?: boolean;
    delay?: number;
    effect?: "slide" | "fade";
    slides: ZXSlide[];
}

export interface ZXHeroStatic {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
    overlay?: number;
    textAlign?: "left" | "center" | "right";
    ctaText?: string;
    ctaUrl?: string;
    cta2Text?: string;
    cta2Url?: string;
}

export interface ZXHero {
    id: number;
    title?: string;
    slug?: string;
    type: "static" | "slider";
    transparentHeader?: boolean;
    darkMode?: boolean;
    minHeight?: string;
    static?: ZXHeroStatic | null;
    slider?: ZXSlider | null;
}

export interface ZXTestimonial {
    id: number;
    title: string;
    slug: string;
    lang?: string;
    author?: string;
    position?: string;
    company?: string;
    content?: string;
    rating?: number;
    photo?: string;
    rawJson?: string;
}

export interface ZXFaqQuestion {
    id: number;
    question: string;
    answer: string;
}

export interface ZXFaq {
    id: number;
    title: string;
    image?: string;
    lang?: string;
    items: ZXFaqQuestion[];
}

export interface ZXGalleryItem {
    id: number;
    title?: string;
    slug?: string;
    lang?: string;
    thumbnail?: string;
    fullUrl?: string;
    alt?: string;
    caption?: string;
    rawJson?: string;
}

export interface ZXContactItem {
    id: number;
    title: string;
    slug: string;
    lang?: string;
    submitLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    fields: ZXContactFormField[];
}

export interface ZXPhoto {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
}

export interface ZXMediaCloud {
    provider?: string;
    bucket?: string;
    region?: string;
    cdnUrl?: string;
    enabled?: boolean;
    offloadMedia?: boolean;
}

export interface ZXDocumentation {
    acf_fc_layout: "documentation";
    title?: string;
    content?: string;
    container?: "narrow" | "default" | "wide" | "full";
    anchor?: string;
}

export interface ZXStat {
    id: number;
    title?: string;
    value?: string;
    suffix?: string;
    icon?: string;
    description?: string;
    lang?: string;
    order?: number;
}

export interface ZXAboutFeature {
    text?: string;
    icon?: string;
    title?: string;
    description?: string;
}

export interface ZXAboutBlock {
    id: number;
    title?: string;
    highlight?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    videoUrl?: string;
    layout?: string;
    ctaText?: string;
    ctaUrl?: string;
    lang?: string;
    features?: ZXAboutFeature[];
}

export interface ZXTimelineItem {
    id: number;
    year?: string;
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    lang?: string;
    order?: number;
}

export interface ZXIndustry {
    id: number;
    title?: string;
    slug?: string;
    description?: string;
    icon?: string;
    image?: string;
    ctaText?: string;
    ctaUrl?: string;
    lang?: string;
}

export interface ZXCaseStudy {
    id: number;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    thumbnail?: string;
    client?: string;
    industry?: string | null;
    results?: string[];
    gallery?: string[];
    lang?: string;
}

export interface ZXPricingFeature {
    text?: string;
    included?: boolean;
}

export interface ZXPricingPlan {
    id: number;
    name?: string;
    price?: string;
    period?: string;
    description?: string;
    featured?: boolean;
    buttonText?: string;
    buttonUrl?: string;
    features?: ZXPricingFeature[];
    lang?: string;
    order?: number;
}

export interface ZXCertification {
    id: number;
    title?: string;
    issuer?: string;
    year?: string;
    image?: string;
    credentialUrl?: string;
    lang?: string;
}

export interface ZXNewsletter {
    id: number;
    highlights?: string;
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    successMessage?: string;
    image?: string;
    lang?: string;
}

export interface ZXPaymentAccountDetail {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    sortCode?: string;
    iban?: string;
    bic?: string;
}

export interface ZXPaymentGateway {
    id: string;
    title: string;
    description?: string;
    enabled: boolean;
    accountDetails?: ZXPaymentAccountDetail[];
}