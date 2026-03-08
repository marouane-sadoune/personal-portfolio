// tab navigation
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, elem) {
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active-link");
  }
  for (var i = 0; i < tabcontents.length; i++) {
    tabcontents[i].classList.remove("active-tab");
  }
  if (elem) elem.classList.add("active-link");
  var target = document.getElementById(tabname);
  if (target) target.classList.add("active-tab");
}

// side menu
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

// form submission to Google Sheets via Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbzGdUWbkcMbVj5-So0gAh8BWn_L-uK6TPydqanarfoTQk91ny03aoiyJPPJxwME4ETMFA/exec";
const form = document.getElementById("submit-to-google-sheet");

if (!form) {
  console.error('Form "submit-to-google-sheet" not found');
} else {
  // set action as a fallback for non-JS submissions and for visibility
  form.action = scriptURL;

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitButton) submitButton.disabled = true;
    try {
      // Send as application/x-www-form-urlencoded to ensure Apps Script parses fields
      const payload = new URLSearchParams(new FormData(form));
      const res = await fetch(scriptURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: payload,
      });

      const text = await res.text();
      console.log('Response status:', res.status, 'body:', text);
      if (!res.ok) throw new Error('Network response was not ok: ' + res.status + ' - ' + text);
      alert('Message sent — thank you!');
      form.reset();
    } catch (err) {
      console.error("Error sending form:", err);
      alert('Error sending message: ' + (err.message || err));
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

// Toggle tech tags visibility
function toggleTechTags(element) {
  const techOverlap = element.closest('.tech-overlap');
  techOverlap.classList.toggle('expanded');
  
  // Change text based on state
  if (techOverlap.classList.contains('expanded')) {
    element.textContent = 'Less';
  } else {
    element.textContent = '+7';
  }
}