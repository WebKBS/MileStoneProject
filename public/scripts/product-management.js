const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

const deleteProduct = async (event) => {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
  //console.log(buttonElement.closest("li"));

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("삭제 실패");
    return;
  }

  buttonElement.closest("li").remove();
};
for (const deleteBtn of deleteProductButtonElements) {
  deleteBtn.addEventListener("click", deleteProduct);
}
