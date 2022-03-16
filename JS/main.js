// Setting Box
let opened = false;
document.querySelector(".settingBox .toggleSetting").onclick = () => {
  document.querySelector(".settingBox").classList.toggle("opened");
  document.querySelector(".settingBox i").classList.toggle("fa-spin");
};
//Change Colors Option
let colorArray = document.querySelectorAll(".optionBox  ul li");
let mcolor = window.localStorage.getItem("mcolor");

if (mcolor) {
  document.documentElement.style.setProperty("--mcolor", mcolor);

  colorArray.forEach((c) => c.classList.remove("active"));
  document.querySelector(`[data-color="${mcolor}"]`).classList.add("active");
}

colorArray.forEach((c) => {
  c.addEventListener("click", () => {
    colorArray.forEach((c) => c.classList.remove("active"));
    c.classList.add("active");

    document.documentElement.style.setProperty("--mcolor", c.dataset.color);

    window.localStorage.setItem("mcolor", c.dataset.color);
  });
});
//Change Background Option
let backgroundArray = document.querySelectorAll(".background-option span");
let chbackground;
let backgroundOption = true;
let boption = window.localStorage.getItem("boption");
if (boption) {
  if (boption === "yes") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  backgroundArray.forEach((b) => {
    b.classList.remove("active");
    if (b.classList.contains(boption)) {
      b.classList.add("active");
    }
  });
}
backgroundArray.forEach((b) => {
  b.onclick = () => {
    backgroundArray.forEach((b) => b.classList.remove("active"));
    b.classList.add("active");

    if (b.classList.contains("yes")) {
      backgroundOption = true;
      randomizeImgs();
      window.localStorage.setItem("boption", "yes");
    } else {
      backgroundOption = false;
      clearInterval(chbackground);
      window.localStorage.setItem("boption", "no");
    }
  };
});

//Start Bullets Option
let bulletShow = document.querySelectorAll(".bullets-option span");
let bullets = document.querySelector("nav");
let bulletOption = localStorage.getItem("bulletOption");
if (bulletOption) {
  bullets.style.display = "none";
  document.querySelector(".bullets-option .yes").classList.remove("active");
  document.querySelector(".bullets-option .no").classList.add("active");
}
bulletShow.forEach((b) => {
  b.onclick = () => {
    bulletShow.forEach((b) => b.classList.remove("active"));
    b.classList.add("active");
    if (b.classList.contains("yes")) {
      bullets.style.display = "inline-block";
      localStorage.removeItem("bulletOption");
    } else {
      bullets.style.display = "none";
      localStorage.setItem("bulletOption", "none");
    }
  };
});

// Start Reset Option
document.querySelector(".settingBox .reset").onclick = () => {
  localStorage.clear();
  location.reload();
};

// End Setting Box

// Change Landing Page Background
// let imgArray = ["01", "02", "04", "05", "07", "08", "10"];

// function randomizeImgs() {
//   if (backgroundOption === true) {
//     chbackground = setInterval(() => {
//       let r = imgArray[Math.floor(Math.random() * imgArray.length)];
//       document.querySelector(
//         "article"
//       ).style.backgroundImage = `url(/IMG/${r}.jpeg)`;
//     }, 5000);
//   }
// }
// randomizeImgs();

// Skills Show
window.addEventListener("scroll", () => {
  if (window.scrollY >= document.querySelector(".skills").offsetTop - 400) {
    document.querySelectorAll(".skills .skill-progress span").forEach((s) => {
      s.style.width = s.dataset.progress;
    });
  } else {
    document.querySelectorAll(".skills .skill-progress span").forEach((s) => {
      s.style.width = "0";
    });
  }
});

// Gallery Show
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.style.cssText =
      "position:fixed; left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.7); z-index:100";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    popupBox.style.cssText =
      "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background-color:#fff; border:2px solid #ccc; padding: 20px; z-index:101;";
    document.body.appendChild(popupBox);
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupImage.style.maxWidth = "100%";
    popupBox.appendChild(popupImage);

    let close = document.createElement("h3");
    close.append("X");
    close.style.cssText =
      "position:absolute; top:-12px; right:-12px; padding:5px 10px; color:white; background-color:var(--mcolor);border-radius: 50%; text-align:center; cursor:pointer;";
    popupBox.appendChild(close);
    close.onclick = (e) => {
      e.target.parentNode.remove();
      // document.querySelector(".popup-box").remove();
      document.querySelector(".popup-overlay").remove();
    };

    if (img.alt !== null) {
      let heading = document.createElement("h3");
      heading.append(img.alt);
      heading.style.cssText =
        "width:fit-content; margin:auto; color:var(--mcolor); padding-top:10px;";
      popupBox.appendChild(heading);
    }
  });
});

// Bullets
document.querySelectorAll("nav .bullet").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelector(b.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//Textarea
let txtarea = document.querySelector("form textarea");
let maxl = txtarea.getAttribute("maxlength");
let prog = document.querySelector("form .progress");

txtarea.oninput = () => {
  prog.style.width = `${(txtarea.value.length / maxl) * 100}%`;
  txtarea.value.length >= maxl - 5
    ? (prog.style.backgroundColor = "red")
    : (prog.style.backgroundColor = "var(--mcolor)");
};

//Togelle Menu
let links = document.querySelector("header ul");
let menuShown = false;
document.querySelector("header i").onclick = () => {
  if (!menuShown) {
    links.style.display = "flex";
    menuShown = true;
    let overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    overlay.style.cssText =
      "position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,.6); z-index:199;";
    document.body.appendChild(overlay);
  } else {
    links.style.display = "none";
    menuShown = false;
    document.querySelector(".menu-overlay").remove();
  }
};
document.querySelectorAll("header ul a").forEach((l) => {
  l.addEventListener("click", () => {
    links.style.display = "none";
    document.querySelector(".menu-overlay").remove();
  });
});

//Landing Animation
let stars = document.getElementById("stars");
let moon = document.getElementById("moon");
let mountain1 = document.getElementById("mountain1");
let mountain2 = document.getElementById("mountain2");
let river = document.getElementById("river");
let boat = document.getElementById("boat");
let art = document.querySelector("article > h1");

let sphone = window.matchMedia("(max-width:767px)")

window.addEventListener("scroll", () => {
  let value = scrollY;
  stars.style.left = `${value * 0.3}px`;
  moon.style.top = `${value * 2}px`;
  mountain1.style.top = `${value * 1}px`;
  mountain2.style.top = `${value * 0.5}px`;
  river.style.top = `${value * 0.5}px`;
  boat.style.top = `${value * 0.5}px`;
  boat.style.left = `${value * 2}px`;
  art.style.fontSize = `${value * 0.13}px`;
  let sy;
  let fy;
  if (sphone.matches) {
    sy = 243.5;
    fy = "31.5px"
  } else {
    sy = 189;
    fy = "48.5px"
    art.style.fontSize = `${value * 0.25}px`;
  }
  if (scrollY >= sy) {
    art.style.fontSize = fy;
    art.style.position = `fixed`;
    if (scrollY >= 500) {
      art.style.display = "none";
    } else {
      art.style.display = `block`;
    }
  }

  if (scrollY >= 210) {
    document.querySelector("article").style.background =
      "linear-gradient(rgb(45, 181, 235), rgb(16, 0, 34))";
  } else {
    document.querySelector("article").style.background =
      "linear-gradient(rgb(35, 7, 49), rgb(16, 0, 34))";
  }
  if (scrollY >= 800) {
    document.querySelector("header").style.display = "none";
  } else {
    document.querySelector("header").style.display = "block";
  }
});

