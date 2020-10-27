const cafeList = document.querySelector("#cafe-list");
const data = document.querySelector("#updateData");

function rederCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let location = document.createElement("span");
  let edit = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  location.textContent = doc.data().location;
  cross.textContent = "x";
  edit.textContent = "edit";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(location);
  li.appendChild(edit);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //   deleting data
  cross.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("caffes").doc(id).delete();
  });

  edit.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    $("#exampleModal").modal("show");
    updateUi(id);
    console.log(id);
  });
}

function updateUi(id) {
  console.log(id);
  data.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("caffes").doc(id).update({
      name: data["name"].value,
      city: data["city"].value,
      location: data["location"].value,
    });
    data["name"].value = "";
    data["location"].value = "";
    data["city"].value = "";
    $("#exampleModal").modal("hide");
  });
}

db.collection("caffes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((element) => {
    if (element.type == "added") {
      rederCafe(element.doc);
    } else if (element.type == "removed") {
      let li = cafeList.querySelector("[data-id=" + element.doc.id + "]");
      cafeList.removeChild(li);
    } else if (element.type == "modified") {
      let li = cafeList.querySelector("[data-id=" + element.doc.id + "]");
      cafeList.removeChild(li);
      rederCafe(element.doc);
    }
  });
});
