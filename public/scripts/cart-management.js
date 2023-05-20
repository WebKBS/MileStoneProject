const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

const addToCart = async () => {
  const productId = addToCartButtonElement.dataset.productid;
  const crsfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId, // 컨트롤러에서 body.productId를 사용
        _csrf: crsfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    alert("fetch 실패!");
    return;
  }

  if (!response.ok) {
    alert("데이터 포스트 실패!");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  const newTotalQuantity = responseData.newTotalItems;

  for (const cartBadgeElement of cartBadgeElements)
    cartBadgeElement.textContent = newTotalQuantity;
};

addToCartButtonElement.addEventListener("click", addToCart);
