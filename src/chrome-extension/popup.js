const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.onclick = () => refreshInjections();

const refreshInjections = () => {
  // get by url "https://www.dndbeyond.com/*"
  chrome.tabs.query({ url: "https://www.dndbeyond.com/*" }, (tabs) => {
    console.log("beyond");
    console.log(tabs);
    for (const t of tabs) {
      chrome.tabs.update(t.id, { url: t.url });
    }
  });

  // get by Title "Foundry Virtual Tabletop"
  // todo use regex => tab.title
  chrome.tabs.query({}, (tabs) => {
    for (const t of tabs) {
      if (!t.title.toLowerCase().includes("foundry virtual tabletop")) {
        continue;
      }
      chrome.tabs.update(t.id, { url: t.url });
    }
  });
};
