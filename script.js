const wrapper = document.querySelector(".wrapper"),
   form = wrapper.querySelector("form"),
   fileInp = form.querySelector("input"),
   infoText = form.querySelector("p"),
   qrCode = form.querySelector("img");

function fetchRequest(formData, file) {
   infoText.innerText = "Scanning QR Code...";
   // Sending Post Request To QR Server API With Passing
   // Form Data as Body and Getting Response From it
   fetch("https://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
   })
      .then((res) => res.json())
      .then((result) => {
         result = result[0].symbol[0].data;
         wrapper.querySelector("textarea").innerText = result;
         qrCode.src = URL.createObjectURL(file);
         infoText.innerText = "Upload QR Code to Scan";
         wrapper.classList.add("active");
      });
}

fileInp.addEventListener("change", (e) => {
   let file = e.target.files[0]; // Getting User Selected File
   let formData = new FormData(); // Creating a New FormData Obj
   formData.append("file", file); // Sffing Select File to FormData
   fetchRequest(formData, file);
});

form.addEventListener("click", () => fileInp.click());
