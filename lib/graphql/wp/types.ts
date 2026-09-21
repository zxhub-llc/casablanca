export interface WPImage {
    sourceUrl: string;
    altText?: string | null;
    mediaDetails?: {
        width?: number | null;
        height?: number | null;
    } | null;
}

export interface WPCategory {
    id: string;
    name: string;
    slug: string;
    count?: number | null;
}

export interface WPTag {
    id: string;
    name: string;
    slug: string;
    count?: number | null;
}

export interface WPAuthor {
    id: string;
    name: string;
    slug: string;

    avatar?: {
        url: string;
    } | null;
}

export interface WPSeo {
    title?: string | null;
    metaDesc?: string | null;

    opengraphImage?: {
        sourceUrl: string;
    } | null;
}

export interface WPPost {
    id: string;
    slug: string;
    title: string;

    content?: string | null;
    excerpt?: string | null;

    date: string;
    modified?: string | null;

    featuredImage?: {
        node?: WPImage | null;
    } | null;

    author?: {
        node?: WPAuthor | null;
    } | null;

    categories?: {
        nodes: WPCategory[];
    } | null;

    tags?: {
        nodes: WPTag[];
    } | null;

    seo?: WPSeo | null;
}

export interface WPPage {
    id: string;
    slug: string;
    title: string;

    content?: string | null;
    modified?: string | null;
}

export interface PostsConnection {
    nodes: WPPost[];

    pageInfo: {
        hasNextPage: boolean;
        endCursor?: string | null;
    };
}


export interface GetPostsFilters {
    search?: string;
    category?: string;
    tag?: string;
    author?: string;
}

export interface CategoriesConnection {
    nodes: WPCategory[];
}

export interface TagsConnection {
    nodes: WPTag[];
}

export interface AuthorsConnection {
    nodes: WPAuthor[];
}

export interface PagesConnection {
    nodes: WPPage[];
}

export interface GetPostsResponse {
    posts: PostsConnection;
}

export interface GetPostResponse {
    post: WPPost | null;
}

export interface GetCategoriesResponse {
    categories: CategoriesConnection;
}

export interface GetTagsResponse {
    tags: TagsConnection;
}

export interface GetPagesResponse {
    pages: PagesConnection;
}

export interface GetPageResponse {
    page: WPPage | null;
}

export interface GetAuthorsResponse {
    users: AuthorsConnection;
}