// query de zx

export const GET_SITE = `
query GetSite($lang: String) {
  zxSite(lang: $lang) {
    title
    description
    url
    lang

    languages {
      code
      name
      locale
      flag
      isDefault
      homeUrl
    }

    logo {
      default
      dark
      light
      favicon
    }

    contact {
      name
      slug
      phone
      email
      address
      mapsUrl
      hours
      country
      primary
    }

    social {
      facebook
      instagram
      twitter
      linkedin
      youtube
      tiktok
      whatsapp
      threads
    }
  }
}
`;

export const GET_SOCIAL = `
query GetSocial {
  zxSocial {
    facebook
    instagram
    twitter
    linkedin
    youtube
    tiktok
    whatsapp
    threads
  }
}
`;

export const GET_CTA = `
query GetCTA($lang: String) {
  zxCta(lang: $lang) {
    enabled
    title
    url
    newTab
    lang
  }
}
`;

export const GET_MENU = `
query GetMenu($slug: String, $lang: String) {
  zxMenu(slug: $slug, lang: $lang) {
    name
    slug
    lang

    items {
      id
      title
      url
      target
      classes
      order
      objectId
      objectType
      lang
      meta {
        taxonomy
        slug
        thumbnail
        name
        description
        count
      }
      children {
        id
        title
        url
        target
        classes
        order
        icon
        isOverview
      }
    }
  }
}
`;

export const GET_CONTACT_FORM = `
query GetContactForm($lang: String, $formId: String) {
  zxContactForm(lang: $lang, formId: $formId) {
    title
    formId
    lang

    submitLabel
    successMessage
    errorMessage

    fields {
      name
      label
      placeholder
      type
      required
      options
    }
  }
}
`;

export const GET_ZX_PAGE = `
query GetZxPage($slug: String, $lang: String) {
  zxPage(slug: $slug, lang: $lang) {
    id
    title
    slug
    lang
    template

    seo {
      title
      description
      ogImage
      ogType
      canonical
      noindex
      robots
      keywords
      twitterCard
      twitterImage
      structuredData
    }

    sections {
      layout
      rawJson
    }
  }
}
`;

export const GET_ALL_ZX_PAGES = `
query GetAllZxPages($lang: String) {
  zxPages(lang: $lang) {
    id
    title
    slug
    lang

    seo {
      title
      description
      canonical
      noindex
    }
  }
}
`;

export const GET_SEO = `
query GetSeo($id: Int!) {
  zxSeo(id: $id) {
    title
    description
    ogImage
    canonical
    noindex
  }
}
`;

export const GET_SERVICES = `
query GetServices($lang: String) {
  zxServices(lang: $lang) {
    id
    title
    slug
    lang
    icon
    shortDesc
    thumbnail
    ctaText
    ctaUrl

    features {
      title
      desc
      icon
    }
  }
}
`;

export const GET_TEAM = `
query GetTeam($lang: String) {
  zxTeam(lang: $lang) {
    id
    name
    slug
    lang
    position
    bio

    photo {
      url
      width
      height
      alt
    }

    linkedin
    email
    order
  }
}
`;

export const GET_SLIDER = `
query GetSlider($id: Int!) {
  zxSlider(id: $id) {
    id
    title
    autoplay
    loop
    delay
    effect

    slides {
      title
      subtitle
      description
      imageUrl
      imageAlt
      mobileImageUrl
      videoUrl
      overlay
      alignment
      ctaText
      ctaUrl
      cta2Text
      cta2Url
    }
  }
}
`;

export const GET_HERO = `
query GetHero($id: Int, $slug: String) {
  zxHero(id: $id, slug: $slug) {
    id
    title
    slug
    type
    transparentHeader
    darkMode
    minHeight

    static {
      title
      subtitle
      imageUrl
      imageAlt
      videoUrl
      overlay
      textAlign
      ctaText
      ctaUrl
      cta2Text
      cta2Url
    }

    slider {
      id
      title
      autoplay
      loop
      delay
      effect

      slides {
        title
        subtitle
        description
        imageUrl
        imageAlt
        mobileImageUrl
        videoUrl
        overlay
        alignment
        ctaText
        ctaUrl
        cta2Text
        cta2Url
      }
    }
  }
}
`;

export const GET_TESTIMONIALS = `
query GetTestimonials($lang: String, $perPage: Int) {
  zxTestimonials(lang: $lang, perPage: $perPage) {
    id
    title
    slug
    lang
    author
    position
    company
    content
    rating
    photo
  }
}
`;

export const GET_FAQS = `
query GetFaqs($lang: String) {
  zxFaqs(lang: $lang) {
    id
    title
    image
    lang

    items {
      id
      question
      answer
    }
  }
}
`;

export const GET_GALLERY = `
query GetGallery($lang: String, $perPage: Int) {
  zxGallery(lang: $lang, perPage: $perPage) {
    id
    title
    slug
    lang
    thumbnail
    fullUrl
    alt
    caption
  }
}
`;

export const GET_MEDIA_CLOUD = `
query GetMediaCloud {
  zxMediaCloud {
    provider
    bucket
    region
    cdnUrl
    enabled
    offloadMedia
  }
}
`;

export const GET_LOCATIONS = `
query GetLocations {
  zxLocations {
    name
    slug
    lang
    primary
    country
    phone
    email
    address
    mapsUrl
    hours
  }
}
`;

export const GET_LOCATION = `
query GetLocation($lang: String, $slug: String) {
  zxLocation(lang: $lang, slug: $slug) {
    name
    slug
    lang
    primary
    country
    phone
    email
    address
    mapsUrl
    hours
  }
}
`;

export const SUBMIT_CONTACT_FORM = `
mutation ZxSubmitContact(
  $formId: String
  $lang: String
  $data: String!
) {
  zxSubmitContact(input: {
    formId: $formId
    lang: $lang
    data: $data
  }) {
    success
    message
  }
}
`;

export const GET_STATS = `
query GetStats($lang: String) {
  zxStats(lang: $lang) {
    id
    title
    value
    suffix
    icon
    description
    lang
    order
  }
}
`;

export const GET_FEATURES = `
query GetFeatures($lang: String, $perPage: Int) {
  zxFeatures(
    lang: $lang
    perPage: $perPage
  ) {
    id
    title
    slug
    lang
    desc
    image
  }
}
`;

export const GET_ABOUT_BLOCKS = `
query GetAboutBlocks($lang: String) {
  zxAboutBlocks(lang: $lang) {
    id
    title
    highlight
    subtitle
    content
    image
    videoUrl
    layout
    ctaText
    ctaUrl
    lang
    features {
      text
      icon
      title
      description
    }
  }
}
`;

export const GET_TIMELINE = `
query GetTimeline($lang: String) {
  zxTimeline(lang: $lang) {
    id
    year
    title
    description
    icon
    image
    lang
    order
  }
}
`;

export const GET_INDUSTRIES = `
query GetIndustries($lang: String) {
  zxIndustries(lang: $lang) {
    id
    title
    slug
    description
    icon
    image
    ctaText
    ctaUrl
    lang
  }
}
`;

export const GET_CASE_STUDIES = `
query GetCaseStudies($lang: String) {
  zxCaseStudies(lang: $lang) {
    id
    title
    slug
    excerpt
    content
    thumbnail
    client
    industry
    results
    gallery
    lang
  }
}
`;

export const GET_PRICING_PLANS = `
query GetPricingPlans($lang: String) {
  zxPricingPlans(lang: $lang) {
    id
    name
    price
    period
    description
    featured
    buttonText
    buttonUrl
    lang
    order

    features {
      text
      included
    }
  }
}
`;

export const GET_CERTIFICATIONS = `
query GetCertifications($lang: String) {
  zxCertifications(lang: $lang) {
    id
    title
    issuer
    year
    image
    credentialUrl
    lang
  }
}
`;

export const GET_NEWSLETTER = `
query GetNewsletter($lang: String) {
  zxNewsletters(lang: $lang) {
    id
    highlights
    title
    description
    placeholder
    buttonText
    successMessage
    image
    lang
  }
}
`;

export const GET_CONTACTS = `
query GetContacts($lang: String, $perPage: Int) {
  zxContacts(lang: $lang, perPage: $perPage) {
    lang
    formId
    title
    submitLabel
    successMessage
    errorMessage

    fields {
      name
      label
      placeholder
      type
      width
      required
      options
    }
  }
}
`;

export const GET_PAYMENT_GATEWAYS = `
query GetPaymentGateways($lang: String) {
  zxPaymentGateways(lang: $lang) {
    id
    title
    description
    enabled
    accountDetails {
      bankName
      accountName
      accountNumber
      sortCode
      iban
      bic
    }
  }
}
`;