const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
    (process.env.WORDPRESS_URL && process.env.GRAPHQL_PATH
        ? `${process.env.WORDPRESS_URL}/${process.env.GRAPHQL_PATH}`
        : undefined);

if (!GRAPHQL_ENDPOINT) {
    console.warn("[GraphQL] GRAPHQL_ENDPOINT is not defined");
}

// ─────────────────────────────────────────────────────────────
// CACHE TTL
// ─────────────────────────────────────────────────────────────

export const CACHE_TTL = {
    site: 86400,
    social: 86400,
    menu: 86400,
    cta: 86400,
    pages: 3600,
    posts: 300,
    products: 600,
    forms: 86400,
    team: 86400,
    services: 3600,
    misc: 3600,
} as const;

export type CacheTTLKey = keyof typeof CACHE_TTL;

// ─────────────────────────────────────────────────────────────
// ERROR
// ─────────────────────────────────────────────────────────────

export class GraphQLAPIError extends Error {
    constructor(
        message: string,
        public status: number,
        public query: string
    ) {
        super(message);

        this.name = "GraphQLAPIError";
    }
}

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface GraphQLResponse<T> {
    data?: T;

    errors?: {
        message: string;
    }[];
}

// ─────────────────────────────────────────────────────────────
// FETCH
// ─────────────────────────────────────────────────────────────

export async function graphqlFetch<T>(
    query: string,
    variables?: object,
    tags: string[] = ["wordpress"],
    revalidate: number = CACHE_TTL.misc,
    headers?: Record<string, string>
): Promise<T> {

    if (!GRAPHQL_ENDPOINT) {
        throw new Error(
            "[GraphQL] Endpoint not configured"
        );
    }

    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            ...headers,
            // "Authorization":
            // `Basic ${process.env.WP_APP_PASSWORD_B64}`,
        },

        body: JSON.stringify({
            query,
            variables,
        }),

        next: {
            tags: ["wordpress", ...tags],
            revalidate,
        },
    });

    if (!res.ok) {
        throw new GraphQLAPIError(
            `[GraphQL] Request failed: ${res.status} ${res.statusText}`,
            res.status,
            query
        );
    }

    const json: GraphQLResponse<T> =
        await res.json();

    if (json.errors?.length) {

        // Hard error
        if (!json.data) {
            throw new GraphQLAPIError(
                JSON.stringify(json.errors),
                res.status,
                query
            );
        }

        // Partial error
        console.warn(
            "[GraphQL] Partial errors:",
            JSON.stringify(json.errors)
        );
    }

    return json.data as T;
}

// ─────────────────────────────────────────────────────────────
// GRACEFUL FETCH
// ─────────────────────────────────────────────────────────────

function mergeWithFallback<T>(data: T, fallback: T): T {
    if (
        typeof data !== "object" ||
        data === null ||
        typeof fallback !== "object" ||
        fallback === null
    ) {
        return (data ?? fallback) as T;
    }

    const result = { ...data } as Record<string, unknown>;
    const fb = fallback as Record<string, unknown>;

    for (const key of Object.keys(fb)) {
        if (result[key] === null || result[key] === undefined) {
            result[key] = fb[key];
        }
    }

    return result as T;
}

export async function graphqlFetchGraceful<T>(
    query: string,
    fallback: T,
    variables?: object,
    tags: string[] = ["wordpress"],
    revalidate: number = CACHE_TTL.misc,
    headers?: Record<string, string>
): Promise<T> {

    if (!GRAPHQL_ENDPOINT) {
        return fallback;
    }

    try {
        const result = await graphqlFetch<T>(
            query,
            variables,
            tags,
            revalidate,
            headers
        );

        if (result && typeof result === "object") {
            return mergeWithFallback(result, fallback);
        }

        return result ?? fallback;

    } catch (error) {
        console.warn(
            "[GraphQL] Fetch failed, using fallback:",
            error
        );
        return fallback;
    }
}