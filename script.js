const wrapper = document.querySelector(".wrapper"),
   form = wrapper.querySelector("form"),
   fileInp = form.querySelector("input");

function fetchRequest(formData) {
   fetch("https://api.qrserver.com/v1/read-qr-code");
}

fileInp.addEventListener("change", (e) => {
   let file = e.target.files[0]; // Getting User Selected File
   let formData = new FormData(); // Creating a New FormData Obj
   formData.append("file", file); // Sffing Select File to FormData
   fetchRequest(formData);
});

form.addEventListener("click", () => fileInp.click());
