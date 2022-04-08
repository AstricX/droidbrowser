"use strict";

/*
#####  ######  ####  #    # # #####  ###### 
#    # #      #    # #    # # #    # #      
#    # #####  #    # #    # # #    # #####  
#####  #      #  # # #    # # #####  #      
#   #  #      #   #  #    # # #   #  #      
#    # ######  ### #  ####  # #    # ###### 
*/

const { ipcRenderer } = require("electron");

const loadTheme = require("../modules/loadTheme.js");
const applyTheme = require("../modules/applyTheme.js");
const applyWinControls = require("../modules/applyWinControls.js");
const loadWinControlsModule = require("../modules/loadWinControls.js");

/*
.########.##.....##.##....##..######..########.####..#######..##....##..######.
.##.......##.....##.###...##.##....##....##.....##..##.....##.###...##.##....##
.##.......##.....##.####..##.##..........##.....##..##.....##.####..##.##......
.######...##.....##.##.##.##.##..........##.....##..##.....##.##.##.##..######.
.##.......##.....##.##..####.##..........##.....##..##.....##.##..####.......##
.##.......##.....##.##...###.##....##....##.....##..##.....##.##...###.##....##
.##........#######..##....##..######.....##....####..#######..##....##..######.
*/

function openLicenseFile() {
  ipcRenderer.send("tabManager-addTab", "file://" + __dirname + "/../LICENSE", true);
}

function loadAbout() {
  document.getElementById("about-electron").innerHTML = "Electron: v" + process.versions.electron;
  document.getElementById("about-chrome").innerHTML = "Chrome: v" + process.versions.chrome;
  document.getElementById("about-node").innerHTML = "Node: " + process.version;
  document.getElementById("about-ferny").innerHTML = "Ferny's Github Repo: " + process.version;

  ipcRenderer.send("request-set-about");
}


function openDonatePage() {
  ipcRenderer.send("tabManager-addTab", "https://www.patreon.com/moduleart", true);
}





function openPlannerPage() {
  ipcRenderer.send("tabManager-addTab", "https://trello.com/b/cb5lXUgS/ferny", true);
}



function openElectronPage() {
  ipcRenderer.send("tabManager-addTab", "https://electronjs.org/releases", true);
}

function openChromePage() {
  ipcRenderer.send("tabManager-addTab", "https://chromereleases.googleblog.com", true);
}

function openNodePage() {
  ipcRenderer.send("tabManager-addTab", "https://nodejs.org/en/download/releases", true);
}

function openFernyPage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/ModuleArt/ferny", true);
}


function openLicensePage() {
  ipcRenderer.send("tabManager-addTab", "https://droidlicense.netlify.app/", true);
}

function checkForUpdates() {
  ipcRenderer.send("main-checkForUpdates");
}

/*
 ###### #    # #    #  ####              ##### #    # ###### #    # ######  ####
 #      #    # ##   # #    #               #   #    # #      ##  ## #      #
 #####  #    # # #  # #         #####      #   ###### #####  # ## # #####   ####
 #      #    # #  # # #                    #   #    # #      #    # #           #
 #      #    # #   ## #    #               #   #    # #      #    # #      #    #
 #       ####  #    #  ####                #   #    # ###### #    # ######  ####
*/

function updateTheme() {
  loadTheme().then(({ theme, dark }) => {
    console.log(theme)
    applyTheme(theme, dark);
  });
}

/*
 ###### #    # #    #  ####              #    # # #    # #####   ####  #    #
 #      #    # ##   # #    #             #    # # ##   # #    # #    # #    #
 #####  #    # # #  # #         #####    #    # # # #  # #    # #    # #    #
 #      #    # #  # # #                  # ## # # #  # # #    # #    # # ## #
 #      #    # #   ## #    #             ##  ## # #   ## #    # #    # ##  ##
 #       ####  #    #  ####              #    # # #    # #####   ####  #    #
*/

function closeWindow() {
  ipcRenderer.send("about-closeWindow");
}

/*
# #####   ####                ##   #####   ####  #    # ##### 
# #    # #    #              #  #  #    # #    # #    #   #   
# #    # #         #####    #    # #####  #    # #    #   #   
# #####  #                  ###### #    # #    # #    #   #   
# #      #    #             #    # #    # #    # #    #   #   
# #       ####              #    # #####   ####   ####    #   
*/

ipcRenderer.on("action-set-about", (event, arg) => {
  document.getElementById("about-app").innerHTML = "Beta v" + arg.version + "<br>" + arg.platform + " / " + arg.arch;
});

/*
 # #####   ####              #    # # #    # #####   ####  #    #
 # #    # #    #             #    # # ##   # #    # #    # #    #
 # #    # #         #####    #    # # # #  # #    # #    # #    #
 # #####  #                  # ## # # #  # # #    # #    # # ## #
 # #      #    #             ##  ## # #   ## #    # #    # ##  ##
 # #       ####              #    # # #    # #####   ####  #    #
*/

ipcRenderer.on("window-blur", (event) => {
  document.getElementById("titlebar").classList.add("blur");
});

ipcRenderer.on("window-focus", (event) => {
  document.getElementById("titlebar").classList.remove("blur");
});

/*
 # #    # # #####
 # ##   # #   #
 # # #  # #   #
 # #  # # #   #
 # #   ## #   #
 # #    # #   #
*/

function init() {
  loadWinControlsModule().then((winControls) => {
    applyWinControls(winControls.systemTitlebar, "only-close");
  });

  updateTheme();

  loadAbout();
}

document.onkeyup = function(e) {
  if (e.which == 27) {
    closeWindow();
  } 
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
      init();
  }
};

/*
##### #    # ######    ###### #    # #####  
  #   #    # #         #      ##   # #    # 
  #   ###### #####     #####  # #  # #    # 
  #   #    # #         #      #  # # #    # 
  #   #    # #         #      #   ## #    # 
  #   #    # ######    ###### #    # #####  
*/