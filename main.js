import defaultAuthData from '@/api/defaultAuthData';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import gsap from 'gsap';
import { getNode, getStorage, insertLast, setStorage } from 'kind-tiger';
import '/src/styles/global.css';

const tl = gsap.timeline({
  defaults: {
    opacity: 0,
  },
});

tl.from('.visual', { delay: 0.3, y: 30 });
tl.from('h2 > span', { x: -30 }, '-=0.2');

async function logout() {
  if (localStorage.getItem('auth')) {
    const { isAuth, user } = await getStorage('auth');

    if (isAuth) {
      const template = `
          <div class="thumbnail">
            <img src="${getPbImageURL(user, 'avatar')}" alt="" />
          </div>
          <div class="username">${user.name}님 반갑습니다!</div>
          <button type="button" class="logout">로그아웃</button>
        `;

      insertLast('.container', template);

      const logout = getNode('.logout');

      function handleLogout() {
        if (confirm('정말 로그아웃 하실겁니까?')) {
          pb.authStore.clear(); // pochketbase 삭제
          // deleteStorage('auth'); // auth 삭제
          setStorage('auth', defaultAuthData); // key는 유지하고 value만 로그아웃 상태로 수정.
          location.reload(); // 새로고침
        }
      }

      logout.addEventListener('click', handleLogout);
    }
  }
}

logout();
