document.addEventListener("DOMContentLoaded", () => {
  const myForm = document.getElementById("contact-form");

  if (!myForm) return;

  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newMessage = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    if (!newMessage.name || !newMessage.email || !newMessage.message) {
      alert("Please fill out your Name, Email, and Message before submitting!");
      return; // Stop the code here, don't save yet
    }

    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    messages.push(newMessage);

    localStorage.setItem("contactMessages", JSON.stringify(messages));

    myForm.reset();

    alert("Message sent successfully! We'll get back to you soon. 🪄");
    const formHeader = document.querySelector(".header");
    if (formHeader) {
      formHeader.textContent = "Message Sent! ✨";
      setTimeout(() => {
        formHeader.textContent = "SEND US A MESSAGE";
      }, 3000);
    }
  });
});
