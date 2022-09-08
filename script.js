const wrapper = document.querySelector(".wrapper"),
   form = wrapper.querySelector("form"),
   fileInp = form.querySelector("input"),
   infoText = form.querySelector("p"),
   qrCode = form.querySelector("img"),
   copyBtn = wrapper.querySelector(".copy");
closeBtn = wrapper.querySelector(".close");

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
         infoText.innerText = result
            ? "Upload QR Code to Scan"
            : "Couldn't Scan QR Code";
         if (!result) return;
         wrapper.querySelector("textarea").innerText = result;
         qrCode.src = URL.createObjectURL(file);
         wrapper.classList.add("active");
      })
      .catch(() => {
         infoText.innerText = "Couldn't Scan QR COde";
      });
}

fileInp.addEventListener("change", (e) => {
   let file = e.target.files[0]; // Getting User Selected File
   if (!file) return;
   let formData = new FormData(); // Creating a New FormData Obj
   formData.append("file", file); // Sffing Select File to FormData
   fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
   let text = wrapper.querySelector("textarea").textContent;
   navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
