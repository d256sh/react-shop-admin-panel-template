import { API } from "../constants";

const BASE_URL = API.jsonPlaceholder;

const getPostStatus = (id) => {
  if (id % 5 === 0) return "pending";
  if (id % 4 === 0) return "inactive";
  return "active";
};

export const mapPost = (post) => {
  const body = post.body ?? "";
  const title = post.title ?? "";

  return {
    id: post.id,
    userId: post.userId,
    title,
    body,
    excerpt: body.length > 90 ? `${body.slice(0, 90)}…` : body,
    author: `User #${post.userId}`,
    authorLink: `/users/${post.userId}`,
    status: getPostStatus(post.id),
    words: body.trim() ? body.trim().split(/\s+/).length : 0,
  };
};

export const mapComment = (comment) => ({
  id: comment.id,
  postId: comment.postId,
  name: comment.name,
  email: comment.email,
  body: comment.body,
});

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`JSONPlaceholder error: ${response.status}`);
  }
  return response.json();
}

export const postsService = {
  fetchPosts: async () => {
    const data = await request("/posts");
    return data.map(mapPost).slice(0, 40);
  },
  fetchPost: async (id) => {
    const data = await request(`/posts/${id}`);
    return mapPost(data);
  },
  fetchPostComments: async (id) => {
    const data = await request(`/posts/${id}/comments`);
    return data.map(mapComment);
  },
  createPost: async (body) => {
    const data = await request("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return mapPost({ ...body, id: data.id ?? Date.now() });
  },
  deletePost: async (id) => {
    await request(`/posts/${id}`, { method: "DELETE" });
    return id;
  },
};
