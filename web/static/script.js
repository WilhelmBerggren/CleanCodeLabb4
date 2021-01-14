import { html, render, useState, useEffect } from './libs/htm.preact.standalone.js';

const api = "http://localhost:5000/api";

function SubmitForm({ submitPost }) {
  return html`
    <p>New post: 
      <form onsubmit=${submitPost}>
        <input name="title" placeholder="title" />
        <input name="url" placeholder="url" />
        <input type="submit" value="yeet it to the cloud"/>
      </form>
    </p>`;
}

function Post({post, deletePost}) {
  const { id, title, url } = post;

  return html`
    <div class="post">
      <p><strong>${id}: ${title}</strong></p>
      <a href=${url}>
        ${url.endsWith('jpg') 
          ? html`<img loading="lazy" width="300" src=${url} alt="post image" />` 
          : url}
      </a>
      <p><button onclick="${() => deletePost(id)}">Delete post</button></p>
    </div>
  `;
}

function usePosts() {
  const [posts, setPosts] = useState([]);
  useEffect(fetchPosts, []);

  function fetchPosts() {
    fetch(`${api}/posts`)
      .then(res => res.json())
      .then(d => setPosts(d || []));
  }

  function submitPost() {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = data.get('url');
    const title = data.get('title');
    fetch(`${api}/posts`, {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ url, title })
    })
    .then(fetchPosts);
  }

  function deletePost(id) {
    fetch(`${api}/posts/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
    .then(fetchPosts);
  }

  return {
    posts,
    fetchPosts,
    submitPost,
    deletePost
  }
}

function App() {
  const { posts, submitPost, deletePost } = usePosts();

  return html`
    <div class="body">
      <p class="title">Nilhelm Hacker News [48 65 6a 20 44 61 76 69 64]</p>
      <${SubmitForm} submitPost=${submitPost} />
      <div>
        ${posts.map(post => html`
          <${Post} key=${post.id} post=${post} deletePost=${deletePost} />
        `)}
      </div>
    </div>`;
}

render(html`<${App} name="World" />`, document.body);