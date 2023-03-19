function getPosOfElem(elem) {
  let cnt = 1;
  
  let prev = elem.previousElementSibling;
  while (prev) {
    if (prev.localName == elem.localName)
      ++cnt;
    
    prev = prev.previousElementSibling;
  }
  
  return cnt;
}

function getXPath(elem) {
  if (elem.tagName == "HTML")
    return "/html";
  
  if (elem.id)
    return `id("${elem.id}")`;

  return `${getXPath(elem.parentElement)}/${elem.localName}[${getPosOfElem(elem)}]`;
}
