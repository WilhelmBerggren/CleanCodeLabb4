import { html, render, useState, useEffect } from './libs/htm.preact.standalone.js';

const api = "http://localhost:5000/api";

function Post({post, deletePost}) {
  return html`
    <div class="post">
      <p><strong>${post.id}: ${post.title}</strong></p>
      <a href=${post.url}>
        ${post.url.endsWith('jpg') 
          ? html`<img loading="lazy" width="300" src=${post.url} alt="post image" />` 
          : post.url}
      </a>
      <p><button onclick="${() => deletePost(post.id)}"></button></p>
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

  function deletePost(id) {
    fetch(`${api}/posts/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
    .then(fetchPosts);
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
      <p>New post: 
        <form onsubmit=${submitPost}>
          <input name="title" placeholder="title" />
          <input name="url" placeholder="url" />
          <input type="submit" value="yeet it to the cloud"/>
        </form>
      </p>
      <div>
        ${posts.map(post => html`
          <${Post} key=${post.id} post=${post} deletePost=${deletePost} />
        `)}
      </div>
    </div>`;
}

render(html`<${App} name="World" />`, document.body);