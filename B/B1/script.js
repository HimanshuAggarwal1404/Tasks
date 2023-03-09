const checkboxes = document.querySelectorAll('input');

//checkboxes.forEach( box => box.addEventListener('change', handleCheck));
//'change' won't work because it doesn't fire a mouse-click to check if shift is down.
checkboxes.forEach( box => box.addEventListener('click', handleCheck));

function handleCheck(e) {
  if (e.shiftKey) {
    let firstCheckBox = getFirstCheckbox();
    if (firstCheckBox !== null) {
        checkBoxRange(firstCheckBox++, getFirstCheckbox(firstCheckBox))
      }
  }
}

function getFirstCheckbox(startIndex = 0) {
  for (let i = startIndex; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return i;
    }
  }
  return null;
}

function checkBoxRange(startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    if(i >= checkboxes.length) break;
    checkboxes[i].checked = true;
  }
}