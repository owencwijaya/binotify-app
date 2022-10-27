const exceptionInCase = ["a", "as", "and", "of", "by", "dan", "atau", "dengan"];
const toTitleCase = (title) => {
  let splitted = title.trim().split(" ");
  let ret = "";

  splitted.forEach((x) => {
    if (x.length > 0) {
      ret += exceptionInCase.includes(x.toLowerCase()) ? x[0] : x[0].toUpperCase();

      if (x.length > 1) {
        ret += x.slice(1) + " ";
      } else {
        ret += " ";
      }
    }
  });

  return ret.slice(0, -1);
};

const getDuration = (secs) => {
  let minutes = Math.floor(secs / 60);
  let seconds = secs % 60;
  let hours = Math.floor(minutes / 60);

  text = `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()}:${
    seconds < 10 ? "0" + seconds.toString() : seconds.toString()
  }`;

  if (hours > 0) {
    text = `${hours < 10 ? "0" + hours.toString() : hours.toString()}:` + text;
  }

  return text;
};

const setDuration = () => {
  document.getElementById("audio").addEventListener("loadedmetadata", function () {
    let f_dur = 0;
    f_dur = document.getElementById("audio").duration;
    document.getElementById("f_dur").value = Math.round(f_dur);
  });
  document.getElementById("f_audio").addEventListener("change", function () {
    let file = this.files[0];
    if (!file.name.match(/\.(wav|mp3)/i)) {
      alert("Please select an audio file");
      return;
    }
    let audio = document.getElementById("audio");
    audio.src = URL.createObjectURL(file);
  });
};

const setModal = (title, messages, textPrimary, textSecondary) => {
  let content = `
    <h3 class="modal-title">${title}</h3>
    <p class="modal-body">${messages}</p>
    <div class="modal-footer">
    ${
      textSecondary
        ? `<button id="modal-btn-secondary" class="btn btn-secondary">${textSecondary}</button>`
        : ""
    }
      <button id="modal-btn-primary" class="btn btn-primary">${textPrimary}</button>
    </div>`;
  document.getElementById("modal-container").innerHTML = content;
  document.getElementById("modal-container").classList.remove("hidden");
};

const close_modal = () => {
  document.getElementById("modal-container").classList.add("hidden");
};