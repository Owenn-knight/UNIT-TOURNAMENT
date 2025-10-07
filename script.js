// ===== Helpers =====
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, def = []) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : def;
}

// ===== Families =====
const regForm = document.getElementById("regForm");
const famList = document.getElementById("famList");
const clearFamilies = document.getElementById("clearFamilies");

function renderFamilies() {
  const families = load("ucl_families");
  famList.innerHTML = "";
  families.slice(-5).reverse().forEach(f => {
    const div = document.createElement("div");
    div.className = "family-card";
    div.innerHTML = `
      <strong>${f.name}</strong> — ლიდერი: ${f.lead}<br>
       ${f.contact}<br>
      <small>${f.bio || ""}</small>
    `;
    if (f.photo) {
      const img = document.createElement("img");
      img.src = f.photo;
      img.alt = f.name;
      img.style = "max-width:100px;display:block;margin-top:6px";
      div.appendChild(img);
    }
    famList.appendChild(div);
  });
}

if (regForm) {
  regForm.addEventListener("submit", e => {
    e.preventDefault();
    const families = load("ucl_families");
    const file = document.getElementById("photo").files[0];

    let photoData = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        photoData = reader.result;
        families.push({
          name: document.getElementById("famName").value,
          lead: document.getElementById("leadName").value,
          contact: document.getElementById("contact").value,
          bio: document.getElementById("bio").value,
          photo: photoData
        });
        save("ucl_families", families);
        renderFamilies();
        regForm.reset();
        alert("ოჯახი დამატებულია ✅");
        location.href = "დარეგისტრირებული ოჯახები.html";
      };
      reader.readAsDataURL(file);
    } else {
      families.push({
        name: document.getElementById("famName").value,
        lead: document.getElementById("leadName").value,
        contact: document.getElementById("contact").value,
        bio: document.getElementById("bio").value,
        photo: ""
      });
      save("ucl_families", families);
      renderFamilies();
      regForm.reset();
      alert("ოჯახი დამატებულია ✅");
      location.href = "დარეგისტრირებული ოჯახები.html";
    }
  });
}

if (clearFamilies) {
  clearFamilies.addEventListener("click", () => {
    if (confirm("ნამდვილად გსურს ყველა ოჯახის წაშლა?")) {
      localStorage.removeItem("ucl_families");
      renderFamilies();
    }
  });
}

renderFamilies();

// ===== Schedule =====
const scheduleForm = document.getElementById("scheduleForm");
const scheduleList = document.getElementById("scheduleList");
const clearSchedule = document.getElementById("clearSchedule");

function renderSchedule() {
  const schedule = load("ucl_schedule");
  scheduleList.innerHTML = "";
  schedule.forEach(ev => {
    const div = document.createElement("div");
    div.className = "match";
    div.textContent = `${ev.date} ${ev.time} • ${ev.stage} • ${ev.match}`;
    scheduleList.appendChild(div);
  });
}

if (scheduleForm) {
  scheduleForm.addEventListener("submit", e => {
    e.preventDefault();
    const schedule = load("ucl_schedule");
    schedule.push({
      stage: document.getElementById("stage").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      match: document.getElementById("match").value
    });
    save("ucl_schedule", schedule);
    renderSchedule();
    scheduleForm.reset();
    alert("მატჩი დაემატა ✅");
  });
}

if (clearSchedule) {
  clearSchedule.addEventListener("click", () => {
    if (confirm("ყველა მატჩის წაშლა?")) {
      localStorage.removeItem("ucl_schedule");
      renderSchedule();
    }
  });
}

renderSchedule();

// ===== Gallery =====
const gal = document.getElementById("gal");
const photoInput = document.getElementById("photo");

if (photoInput && gal) {
  photoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const div = document.createElement("div");
      div.className = "thumb";
      div.innerHTML = `<img src="${reader.result}" alt="family photo">`;
      gal.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
