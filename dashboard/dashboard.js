const API_URL = "http://localhost:5000/tasks";
const token = sessionStorage.getItem("dailyforgeToken");

if (!token) {
  window.location.href = "../login/login.html";
}

const today = new Date().toISOString().split("T")[0];
let selectedDate = today;

// Loader Elements
const fullLoader = document.getElementById("fullLoader");
const inlineLoader = document.getElementById("inlineLoader");
const taskContainer = document.getElementById("taskContainer");

// Loader Controls
function showFullLoader() {
  fullLoader.style.display = "flex";
}
function hideFullLoader() {
  fullLoader.style.display = "none";
}
function showInlineLoader() {
  inlineLoader.style.display = "block";
  taskContainer.style.opacity = "0.3";
}
function hideInlineLoader() {
  inlineLoader.style.display = "none";
  taskContainer.style.opacity = "1";
}

// Load Date Tabs
async function loadDateTabs() {
  const res = await fetch(`${API_URL}/dates`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const dates = await res.json();
  const container = document.getElementById("dateScroll");
  container.innerHTML = "";

  if (!dates.includes(today)) dates.push(today);

  dates.sort();

  dates.forEach(date => {
    const tab = document.createElement("div");
    tab.className = "date-tab";
    tab.dataset.date = date;

    tab.innerText = (date === today) ? "Today" : date;

    if (date === selectedDate) tab.classList.add("active");

    tab.onclick = () => {
      selectedDate = date;
      document.querySelectorAll(".date-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadTasks(date);
    };

    container.appendChild(tab);
  });
}

// Load Tasks from DB by Date
async function loadTasks(date) {
  showInlineLoader();
  taskContainer.innerHTML = "";

  const res = await fetch(`${API_URL}/by-date/${date}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const result = await res.json();
  hideInlineLoader();
  taskContainer.innerHTML = "";

  if (result.length === 0) {
    taskContainer.innerHTML = "<li>No tasks for this date.</li>";
    return;
  }

  result.forEach(task => {
    const li = document.createElement("li");
    li.className = task.isCompleted ? "task completed" : "task";
    
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <p>${task.description || ""}</p>
        <small>${task.startTime} → ${task.endTime}</small>
      </div>
      <div>
        ${task.isCompleted
          ? `<span>✔ Done</span>`
          : `<button onclick="markTaskComplete(${task.id})">✔</button>`}
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    taskContainer.appendChild(li);
  });
}

// Mark Task Complete
async function markTaskComplete(id) {
  showInlineLoader();
  await fetch(`${API_URL}/complete/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });
  await loadTasks(selectedDate);
  hideInlineLoader();
}

// Delete Task
async function deleteTask(id) {
  showInlineLoader();
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await loadDateTabs();
  await loadTasks(selectedDate);
  hideInlineLoader();
}

// Create Task Form Submit
document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();

  showFullLoader();

  const payload = {
    title: taskTitle.value,
    description: taskDesc.value,
    date: taskDate.value,
    startTime: startTime.value,
    endTime: endTime.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  selectedDate = payload.date;

  await loadDateTabs();
  await loadTasks(payload.date);

  hideFullLoader();
});

// Initial Load
loadDateTabs();
loadTasks(selectedDate);

// Logout Function from HTML works already
