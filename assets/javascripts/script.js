const currentYear = new Date().getFullYear();
const footerYear = document.getElementById("footer-year");
footerYear.innerHTML = currentYear;

var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

const contactUsBtn = document.getElementById("contact-us-btn");

contactUsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("#contact-form");

  const email = form.querySelector("#email");
  const message = form.querySelector("#message");
  const name = form.querySelector("#name");
  const occation = form.querySelector("#occation");
  const phone = form.querySelector("#phone");

  const response = validation({
    email: email.value,
    message: message.value,
    name: name.value,
    occation: occation.value,
    phone: phone.value,
  });

  const lastChild = form.lastElementChild;

  // Check if the last child element is a <span> element
  if (lastChild.tagName.toLowerCase() === "span") {
    form.removeChild(lastChild);
  }

  form.appendChild(showResponse(response.message, response.type));

  if (response.type === "text-success") {
    setTimeout(() => {
      form.removeChild(form.lastElementChild);
    }, 3000);

    form.reset();
  }
});

function validation(data) {
  // Check if the data object is null or undefined
  if (!data) {
    return {
      message: "Data object is missing or invalid",
      type: "text-danger",
    };
  }

  // Ensure that the data object has all the required properties
  if (
    !("email" in data) ||
    !("message" in data) ||
    !("name" in data) ||
    !("occation" in data) ||
    !("phone" in data)
  ) {
    return {
      message: "Required fields are missing in the data object",
      type: "text-danger",
    };
  }

  let { email, message, name, occation, phone } = data;

  email = email.trim();
  message = message.trim();
  name = name.trim();
  occation = occation.trim();
  phone = phone.trim();

  if (name.length < 3)
    return {
      message: "Name must be at least 3 characters",
      type: "text-danger",
    };

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (!phoneRegex.test(phone)) {
    return {
      message: "Please enter a valid phone number",
      type: "text-danger",
    };
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email", type: "text-danger" };
  }

  // Occation is selecte element
  if (occation === "none")
    return { message: "Please select an occation", type: "text-danger" };

  if (message.length < 10)
    return {
      message: "Your message must be at least 10 characters",
      type: "text-danger",
    };

  return { message: "Your message has been sent", type: "text-success" };
}

function showResponse(response, type) {
  const spanElement = document.createElement("span");
  spanElement.innerHTML = response;
  spanElement.classList.add(`${type}`);

  return spanElement;
}
