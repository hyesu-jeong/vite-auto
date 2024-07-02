import '@/pages/detail/detail.css';
import pb from '@/api/pocketbase';
import { comma } from 'kind-tiger';
import getPbImageURL from '@/api/getPbImageURL';
import { insertLast } from 'kind-tiger';

async function renderProductDetail() {
  const params = new URLSearchParams(location.search);
  const productId = params.get('product');

  const data = await pb.collection('products').getOne(productId);

  const { brand, description, price, ratio } = data;

  const template = /* html */ `
    <div class="wrapper">
      <div class="brand">
        <label for="brand">브랜드</label>
        <input type="text" value="${brand}" id="brand" />
      </div>
      <div class="visual">
        <img src="${getPbImageURL(data)}" alt="" />
      </div>
      <div class="desc">
        <label for="description">상품 제목</label>
        <input type="text" value="${description}" id="description"/>
      </div>
      <div class="price">
        <label for="price">가격</label>
        <input type="text" value="${price}" id="price" />
      </div>
      <div class="discount">
        <label for="discount">할인율(%)</label>
        <input type="text" value="${ratio}" id="discount" />
      </div>
      <div class="real-price">${comma(price - price * (ratio * 0.01))}원</div>
    </div>
  `;

  insertLast('.container', template);
}

renderProductDetail();

//

// 주소창에 product id 가져와서
// pb  해당 id 요청
//  요청에 응답된 데이터
// 브랜드명
// 렌더링
