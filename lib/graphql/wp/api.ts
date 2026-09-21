// api de wp graph

import { CACHE_TTL, graphqlFetchGraceful } from "../fetch";

import * as Q from "./queries";

import type {
    GetAuthorsResponse,
    GetCategoriesResponse,
    GetPageResponse,
    GetPagesResponse,
    GetPostResponse,
    GetPostsFilters,
    GetPostsResponse,
    GetTagsResponse,
    WPAuthor,
    WPCategory,
    WPPage,
    WPPost,
    WPTag,
} from "./types";

// ─────────────────────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────────────────────

export async function getPostsPaginated(
    first = 9,
    after?: string,
    filters: GetPostsFilters = {}
): Promise<{
    data: WPPost[];

    pageInfo: {
        hasNextPage: boolean;
        endCursor?: string | null;
    };
}> {

    const data =
        await graphqlFetchGraceful<GetPostsResponse>(
            Q.GET_POSTS,
            {
                posts: {
                    nodes: [],
                    pageInfo: {
                        hasNextPage: false,
                        endCursor: null,
                    },
                },
            },
            {
                first,
                after,
                ...filters,
            },
            [
                "posts",
                filters.category
                    ? `category-${filters.category}`
                    : "",

                filters.tag
                    ? `tag-${filters.tag}`
                    : "",

                filters.author
                    ? `author-${filters.author}`
                    : "",
            ].filter(Boolean),
            CACHE_TTL.posts
        );

    return {
        data: data.posts.nodes,
        pageInfo: data.posts.pageInfo,
    };
}

export async function getPostBySlug(
    slug: string
): Promise<WPPost | null> {

    const data =
        await graphqlFetchGraceful<GetPostResponse>(
            Q.GET_POST_BY_SLUG,
            { post: null },
            { slug },
            ["posts", `post-${slug}`],
            CACHE_TTL.posts
        );

    return data.post;
}

export async function getAllPostSlugs(): Promise<
    { slug: string }[]
> {

    const data =
        await graphqlFetchGraceful<{
            posts: {
                nodes: {
                    slug: string;
                }[];
            };
        }>(
            Q.GET_ALL_POST_SLUGS,
            {
                posts: {
                    nodes: [],
                },
            },
            undefined,
            ["posts"],
            CACHE_TTL.posts
        );

    return data.posts.nodes;
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<
    WPCategory[]
> {

    const data =
        await graphqlFetchGraceful<GetCategoriesResponse>(
            Q.GET_CATEGORIES,
            {
                categories: {
                    nodes: [],
                },
            },
            undefined,
            ["categories"],
            CACHE_TTL.misc
        );

    return data.categories.nodes;
}

// ─────────────────────────────────────────────────────────────
// TAGS
// ─────────────────────────────────────────────────────────────

export async function getAllTags(): Promise<
    WPTag[]
> {

    const data =
        await graphqlFetchGraceful<GetTagsResponse>(
            Q.GET_TAGS,
            {
                tags: {
                    nodes: [],
                },
            },
            undefined,
            ["tags"],
            CACHE_TTL.misc
        );

    return data.tags.nodes;
}

// ─────────────────────────────────────────────────────────────
// PAGES
// ─────────────────────────────────────────────────────────────

export async function getAllPages(): Promise<
    WPPage[]
> {

    const data =
        await graphqlFetchGraceful<GetPagesResponse>(
            Q.GET_PAGES,
            {
                pages: {
                    nodes: [],
                },
            },
            undefined,
            ["pages"],
            CACHE_TTL.pages
        );

    return data.pages.nodes;
}

export async function getPageBySlug(
    slug: string
): Promise<WPPage | null> {

    const data =
        await graphqlFetchGraceful<GetPageResponse>(
            Q.GET_PAGE_BY_SLUG,
            { page: null },
            { slug },
            ["pages", `page-${slug}`],
            CACHE_TTL.pages
        );

    return data.page;
}

// ─────────────────────────────────────────────────────────────
// AUTHORS
// ─────────────────────────────────────────────────────────────

export async function getAllAuthors(): Promise<
    WPAuthor[]
> {

    const data =
        await graphqlFetchGraceful<GetAuthorsResponse>(
            Q.GET_AUTHORS,
            {
                users: {
                    nodes: [],
                },
            },
            undefined,
            ["authors"],
            CACHE_TTL.misc
        );

    return data.users.nodes;
}