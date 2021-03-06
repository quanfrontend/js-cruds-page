/**
 * 1. GET dữ liệu qua API
 * 2. POST user mới
 * 3. PUT user
 * 4. DELETE user
 */
// ========================
const newUser = document.querySelector(".new-user");
const form = document.querySelector("#form");
const cancel = document.querySelector(".cancel");
const add = document.querySelector(".add");
const save = document.querySelector(".save");
const listUser = document.querySelector(".list-user");
const nameValue = document.querySelector("#input-name");
const avatarValue = document.querySelector("#input-avatar");
const websiteValue = document.querySelector("#input-website");
const companyNameValue = document.querySelector("#input-company-name");
const companyAddressValue = document.querySelector("#input-company-address");
// Show Form
newUser.addEventListener("click", () => {
  form.classList.toggle("active");
});
cancel.addEventListener("click", () => {
  form.classList.remove("active");
  nameValue.value = "";
  avatarValue.value = "";
  websiteValue.value = "";
  companyNameValue.value = "";
  companyAddressValue.value = "";
});
const renderUsers = (users) => {
  let htmls = users.map((user) => {
    return `
      <tr>
        <td class="item id">${user.id}</td>
        <td class="item name">${user.name}</td>
        <td class="item avatar">
          <img id="avatar" src="${user.avatar}" alt="" />
        </td>
        <td class="item website">${user.website}</td>
        <td class="item company-name">${user.company.name}</td>
        <td class="item company-address">${user.company.adress}</td>
        <td class="item actions" data-id="${user.id}">
          <div class="fas fa-user-edit" id="edit-user"></div>
          <div class="fas fa-trash" id="delete-user"></div>
        </td>
      </tr>
    `;
  });
  listUser.innerHTML += htmls.join("");
};
const url = "https://5fa3d0d9f10026001618df85.mockapi.io/users";
// Method: GET
const getUsers = async () => {
  let res = await fetch(url);
  let users = await res.json();
  renderUsers(users);
  listUser.addEventListener("click", (e) => {
    let editClicked = e.target.id == "edit-user";
    let deleteClicked = e.target.id == "delete-user";
    let id = e.target.parentElement.dataset.id;
    // Method: DELETE
    if (deleteClicked) {
      let question = confirm("Are you sure!");
      if (question === true) {
        fetch(`${url}/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => location.reload());
      }
    }
    // Method: PUT
    if (editClicked) {
      add.setAttribute("disabled", "disabled");
      form.classList.toggle("active");
      const parent = e.target.parentElement.parentElement;
      let nameContent = parent.querySelector(".name").textContent;
      let avatarContent = parent.querySelector("#avatar").src;
      let websiteContent = parent.querySelector(".website").textContent;
      let companyNameContent =
        parent.querySelector(".company-name").textContent;
      let companyAddressContent =
        parent.querySelector(".company-address").textContent;

      nameValue.value = nameContent;
      avatarValue.value = avatarContent;
      websiteValue.value = websiteContent;
      companyNameValue.value = companyNameContent;
      companyAddressValue.value = companyAddressContent;

      save.addEventListener("click", () => {
        fetch(`${url}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue.value,
            avatar: avatarValue.value,
            website: websiteValue.value,
            company: {
              name: companyNameValue.value,
              adress: companyAddressValue.value,
            },
          }),
        })
          .then((res) => res.json())
          .then(() => location.reload());
      });
    }
  });
};
getUsers();
// Method: POST
const postUsers = () => {
  add.addEventListener("click", () => {
    save.setAttribute("disabled", "disabled");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue.value,
        avatar: avatarValue.value,
        website: websiteValue.value,
        company: {
          name: companyNameValue.value,
          adress: companyAddressValue.value,
        },
      }),
    })
      .then((res) => res.json())
      .then((users) => {
        const usersArr = [];
        usersArr.push(users);
        renderUsers(usersArr);
      });
    //
    form.classList.remove("active");
    nameValue.value = "";
    avatarValue.value = "";
    websiteValue.value = "";
    companyNameValue.value = "";
    companyAddressValue.value = "";
  });
};
postUsers();
