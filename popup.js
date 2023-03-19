const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ["xpath.js"],
});

const getButtons = () => [...document.getElementsByTagName("button")].map(btn => [btn.textContent, getXPath(btn)]);

const buttons = (await chrome.scripting.executeScript({
  target: {tabId: tab.id},
  func: getButtons,
})).map(i => i.result).flat();

const buttonContainer = document.querySelector(".buttons");

for (const [buttonText, buttonXPath] of buttons) {
  const buttonEl = document.createElement("div");
  buttonEl.classList.add("buttons__btn");
  
  const buttonTextEl = document.createElement("button");
  buttonTextEl.classList.add("buttons__btn-text");
  buttonTextEl.textContent = buttonText.trim() || ">>empty button<<";
  buttonEl.append(buttonTextEl);

  const buttonXPathEl = document.createElement("div");
  buttonXPathEl.textContent = buttonXPath;
  buttonEl.append(buttonXPathEl);

  buttonContainer.append(buttonEl);
}
