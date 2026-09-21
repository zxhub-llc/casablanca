type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};
type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
}

type PostNode = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
}

type GetPostsResponse = {
  posts: {
    nodes: PostNode[];
    pageInfo: PageInfo;
  };
}