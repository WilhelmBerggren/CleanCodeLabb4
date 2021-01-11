import { html, render, useState, useEffect } from './libs/htm.preact.standalone.js';

const api = "http://localhost:5000/api";

function Post({post}) {
  return html`
    <div class="post">
      <p><strong>${post.id}: ${post.title}</strong></p>
      <a href=${post.url}>
        ${post.url.endsWith('jpg') 
          ? html`<img loading="lazy" width="300" src=${post.url} alt="post image" />` 
          : post.url}
      </a>
    </div>
  `;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(fetchPosts, []);

  function fetchPosts() {
    fetch(`${api}/posts`)
      .then(res => res.json())
      .then(d => setData(d || []));
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
        ${data.map(post => html`
          <${Post} key=${post.id} post=${post} />
        `)}
      </div>
    </div>`;
}

render(html`<${App} name="World" />`, document.body);