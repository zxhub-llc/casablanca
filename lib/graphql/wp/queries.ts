// query de wp

// ─────────────────────────────────────────────────────────────────────────────
// POSTS (WPGraphQL nativo)
// ─────────────────────────────────────────────────────────────────────────────



export const GET_POSTS = `
query GetPosts(
  $first: Int!
  $after: String
  $search: String
  $category: String
  $tag: String
  $author: String
) {
  posts(
    first: $first
    after: $after
    where: {
      search: $search
      categoryName: $category
      tag: $tag
      authorName: $author
      status: PUBLISH
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }

    nodes {
      id
      slug
      title
      excerpt
      date
      modified

      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText

          mediaDetails {
            width
            height
          }
        }
      }

      author {
        node {
          id
          name
          slug

          avatar {
            url
          }
        }
      }

      categories {
        nodes {
          id
          name
          slug
        }
      }

      tags {
        nodes {
          id
          name
          slug
        }
      }

      seo {
        title
        metaDesc

        opengraphImage {
          sourceUrl
        }
      }
    }
  }
}
`;

export const GET_POST_BY_SLUG = `
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    slug
    title
    content
    excerpt
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
          sizes {
            sourceUrl
            width
            height
            name
          }
        }
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
    seo {
      title
      metaDesc
      opengraphImage {
        sourceUrl
      }
    }
  }
}
`;

// Query ligera solo para generateStaticParams — sin campos extra
export const GET_ALL_POST_SLUGS = `
query GetAllPostSlugs {
  posts(first: 1000, where: { status: PUBLISH }) {
    nodes {
      slug
    }
  }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY (WPGraphQL nativo)
// ─────────────────────────────────────────────────────────────────────────────

export const GET_CATEGORIES = `
query GetCategories {
  categories(first: 100) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
`;

export const GET_TAGS = `
query GetTags {
  tags(first: 100) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
`;

export const GET_PAGES = `
query GetPages {
  pages(first: 100, where: { status: PUBLISH }) {
    nodes {
      id
      slug
      title
      status
    }
  }
}
`;

export const GET_PAGE_BY_SLUG = `
query GetPageBySlug($slug: ID!) {
  page(id: $slug, idType: URI) {
    id
    title
    content
    slug
    modified
  }
}
`;

export const GET_AUTHORS = `
query GetAuthors {
  users(first: 100) {
    nodes {
      id
      name
      slug
      avatar {
        url
      }
    }
  }
}
`;