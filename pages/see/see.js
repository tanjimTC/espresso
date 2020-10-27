const cafeList = document.querySelector("#cafe-list");

function rederCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let location = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  location.textContent = doc.data().location;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(location);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //   deleting data
  cross.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("caffes").doc(id).delete();
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
    }
  });
});
