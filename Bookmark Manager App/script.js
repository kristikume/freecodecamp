const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");

const categoryDropdown = document.getElementById("category-dropdown");
const closeFormBtn = document.getElementById("close-form-button");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryBtn = document.getElementById("view-category-button");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

//Functions:
//user stories 1-2
function getBookmarks() {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (!storedBookmarks) {
    return [];
  }
  try {
    const bookmarks = JSON.parse(storedBookmarks);
    if (
      Array.isArray(bookmarks) &&
      bookmarks.every((item) => item.name && item.category && item.url)
    ) {
      return bookmarks;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
}

//user storie 3
function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

//user storie 4
addBookmarkBtn.addEventListener("click", () => {
  document.querySelector(".category-name").innerText = categoryDropdown.value;
  displayOrCloseForm();
});

//user storie 5
closeFormBtn.addEventListener("click", () => {
  displayOrCloseForm();
});

//user stories 6-7
addBookmarkBtnForm.addEventListener("click", () => {
  const nameInput = document.getElementById("name");
  const urlInput = document.getElementById("url");
  const category = categoryDropdown.value;
  const bookmarks = getBookmarks();

  bookmarks.push({ name: nameInput.value, category, url: urlInput.value });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  nameInput.value = "";
  urlInput.value = "";
  displayOrCloseForm();
});

//user story 8
function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}

//user stories 9-12
function displayBookmarks(bookmarks) {
  let htmlStr = ``;
  bookmarks.forEach((bookmark) => {
    const { name, category, url } = bookmark;
    if (category === categoryDropdown.value) {
      htmlStr += `
      <input type="radio" id="${name}" value="${name}" name="${category}"/>
      <label for="${name}"><a href="${url}" target="_blank">${name}</a></label>
      `;
    }
  });
  document.querySelector("#category-list").innerHTML =
    htmlStr !== `` ? htmlStr : `<p>No Bookmarks Found</p>`;
}

viewCategoryBtn.addEventListener("click", () => {
  document.querySelector(".category-name").innerText = categoryDropdown.value;
  displayOrHideCategory();
  displayBookmarks(getBookmarks());
});

//user story 13
closeListBtn.addEventListener("click", () => {
  displayOrHideCategory();
});

//user story 14
deleteBookmarkBtn.addEventListener("click", () => {
  const radioInput = document.querySelector(
    "#category-list input[type='radio']:checked",
  );
  if (!radioInput) return;

  if (radioInput) {
    const bookmarks = getBookmarks();
    const updatedbookmarks = bookmarks.filter(
      (bookmark) =>
        !(
          bookmark.name === radioInput.id &&
          bookmark.category === radioInput.name
        ),
    );
    localStorage.setItem("bookmarks", JSON.stringify(updatedbookmarks));
    displayBookmarks(getBookmarks());
  }
});
