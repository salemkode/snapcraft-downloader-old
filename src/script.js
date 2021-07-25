let output = $("#list-architecture");
let loading = false;
async function getSnap(name) {
  let snap = await fetch("https://snapcraft-api.vercel.app/api/" + name);
  return await snap.json();
}

function $(...parms) {
  return document.querySelector(...parms);
}

$("#get-pakge").onclick = () => {
  getPakge($("#pakge-name").value);
};

$("#pakge-name").onkeydown = (e) => {
  if (e.code === "Enter") {
    getPakge($("#pakge-name").value);
  }
};

async function getPakge(pakgeName) {
  if (!pakgeName) {
    alert("Writh pakge name");
    return;
  }
  if (loading) return;
  loading = true;
  output.innerHTML = "";
  output.classList.add("loading");
  let snap = await getSnap(pakgeName);
  let error = snap["error-list"];
  if (error) {
    output.innerHTML = "<h1>" + error[0].message + "</h1>";
    return;
  }
  let listArchitecture = snap["channel-map"];
  for (let key in listArchitecture) {
    let downloadList = "";
    listArchitecture[key].forEach((element) => {
      downloadList += `<a href="${element.download.url}">${element.channel.name}
       <span>
          ${element.download.size}
       </span>
       </a> `;
    });
    output.innerHTML +=
      /* html */
      `<div class="${key}">
    <div class="bar">
    ${key}
    </div>
    ${downloadList}
    </div>`;
  }
  output.classList.remove("loading");
  loading = false;
}
