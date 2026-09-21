import type { WPPost } from "./types";

export function normalizePost(post: WPPost) {
    return {
        ...post,

        image:
            post.featuredImage?.node?.sourceUrl ??
            "/placeholder.jpg",

        imageAlt:
            post.featuredImage?.node?.altText ??
            post.title,

        authorName:
            post.author?.node?.name ??
            "Unknown",

        categories:
            post.categories?.nodes ?? [],

        tags:
            post.tags?.nodes ?? [],
    };
}