import * as runtime from "@wails/runtime";

function addReloadKeyHandler() {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
      if (e.shiftKey) {
        runtime.WindowReloadApp();
      } else {
        runtime.WindowReload();
      }
    }
  });
}

function addFullscreenKeyHandler() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "F11") {
      runtime.WindowIsFullscreen().then((isFullscreen) => {
        if (isFullscreen) {
          runtime.WindowUnfullscreen();
        } else {
          runtime.WindowFullscreen();
        }
      });
    }
  });
}

function preventContextMenu() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });
}

interface DeskifyInit {
  allowReloadKey?: boolean;
  allowFullscreenWithKeys?: boolean;
  allowContextMenu?: boolean;
}

export function deskify(config: DeskifyInit) {
  if (config.allowReloadKey) {
    addReloadKeyHandler();
  }
  if (config.allowFullscreenWithKeys) {
    addFullscreenKeyHandler();
  }
  if (!config.allowContextMenu) {
    preventContextMenu();
  }
}
