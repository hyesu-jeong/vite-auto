import '@/pages/register/register.css';
import { getNode as $ } from 'kind-tiger';
import gsap from 'gsap';
import pb from '@/api/pocketbase';

function register() {
  const idField = $('#idField');
  const pwField = $('#pwField');
  const next1 = $('.next-1');
  const next2 = $('.next-2');

  function validation(e) {
    // input의 값이 5글자 이상 적히면 버튼 활성화

    const target = e.currentTarget;

    if (target.value.length > 5) {
      target.nextElementSibling.disabled = false;
    } else {
      target.nextElementSibling.disabled = true;
    }
  }

  idField.addEventListener('input', validation);
  pwField.addEventListener('input', validation);

  // 다음 버튼 누르면 다음 스텝으로 넘어가고, 프로그레스바 채우기
  next1.addEventListener('click', () => {
    gsap.to('.wrapper', { x: -500 });
    gsap.to('.line > div', { width: '50%' });
  });

  next2.addEventListener('click', () => {
    const email = idField.value;
    const password = pwField.value;
    const passwordConfirm = password;

    // gsap.to('.line > div',{width:'100%',onComplete()})

    pb.collection('users')
      .create({
        email,
        password,
        passwordConfirm,
      })
      .then(() => {
        alert('🎉회원 가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        location.href = '/src/pages/login/';
      })
      .catch(() => {
        alert('동일한 이메일이 존재합니다.');
        gsap.to('.wrapper', { x: 0 });
        gsap.to('.line > div', { width: '0' });
        idField.value = '';
        pwField.value = '';
        // location.reload();
      });
  });
}

register();
