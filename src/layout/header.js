import { getStorage, setStorage } from 'kind-tiger';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import defaultAuthData from '@/api/defaultAuthData';

// IIAFE
(async function () {
  if (!localStorage.getItem('auth')) {
    setStorage('auth', defaultAuthData);
  }

  const { isAuth, user } = await getStorage('auth');

  class Header extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = `@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');`;

      this.shadowRoot.innerHTML = `
      <style>
        ${style.textContent}
        .bg-slate-200{
          background-color: #e2e8f0;
        }
      </style>
      <header class="p-6 bg-slate-200 flex justify-between">
        <h1 class="logo font-bold">
          <a href="/">29CM</a>
        </h1>

        <nav>
          <ul class="flex gap-5">
            <li><a href="/">HOME</a></li>
            <li><a href="/src/pages/product/">PRODUCTS</a></li>

            ${
              isAuth
                ? `<li>
                <div class="thumbnail">
                  <img src="${getPbImageURL(user, 'avatar')}" alt="" />
                </div>
                <div class="username">${user.name}님 반갑습니다!</div>
                <button type="button" class="logout">로그아웃</button>
              </li>`
                : '<li><a href="/src/pages/login/">LOGIN</a></li>'
            }
            
          </ul>
        </nav>
      </header>

    `;

      this.logout = this.shadowRoot.querySelector('.logout');
    }

    connectedCallback() {
      if (this.logout) {
        this.logout.addEventListener('click', this.logOut.bind(this));
      }
    }

    logOut(e) {
      e.preventDefault();

      pb.authStore.clear(); // auth 정보 초기화
      setStorage('auth', defaultAuthData); // storage auth 기본값

      location.reload(); // 새로고침
    }
  }

  customElements.define('c-header', Header);
})();
