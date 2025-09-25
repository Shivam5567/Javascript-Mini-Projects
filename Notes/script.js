const container = document.querySelector(".container");
const add_btn = document.getElementById("add"); 

function updatestorage() {
  localStorage.setItem("notes", container.innerHTML);
}

function createNote(text = "Enter Something") {
  let wrapper = document.createElement("div");
  wrapper.className = "note-wrapper";

  let input_box = document.createElement("p");
  input_box.className = "input-box";
  input_box.innerText = text;
  input_box.setAttribute("contenteditable", "true");

  let del = document.createElement("button");
  del.textContent = "DEL";
  del.className = "delete-btn";

  // update storage whenever text changes
  input_box.addEventListener("keyup", updatestorage);

  // delete button
  del.addEventListener("click", () => {
    wrapper.remove();
    updatestorage();
  });

  wrapper.appendChild(input_box);
  wrapper.appendChild(del);
  container.appendChild(wrapper);
}

function showNotes() {
  container.innerHTML = localStorage.getItem("notes") || "";

  // re-bind listeners for restored notes
  container.querySelectorAll(".note-wrapper").forEach(wrapper => {
    let input_box = wrapper.querySelector(".input-box");
    let del = wrapper.querySelector(".delete-btn");

    input_box.addEventListener("keyup", updatestorage);
    del.addEventListener("click", () => {
      wrapper.remove();
      updatestorage();
    });
  });
}

showNotes();

add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  createNote();
  updatestorage();
});
