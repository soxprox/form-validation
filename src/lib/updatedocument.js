function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function writeErrorList(element, errors, id) {
  // var errorList = document.getElementById("errorList");
  element.innerHTML = "";
  var ul = document.createElement("ul");
  ul.classList.add('soxprox-error-list')
  ul.id = 'soxprox-' + id + "-error-list";
  for (var i = 0; i < errors.length; i++) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = errors[i];
    li.classList.add("soxprox-error-list-item");
  }
  element.appendChild(ul);
}

export const updateDocument = (id, errors, displayAll = false) => {
  const element = document.getElementById("soxprox-" + id + '-error-message');  //get element 
  if (element) {
    element.parentNode.removeChild(element);  //remove element from dom
  }

  if (errors.length === 0) {
		return;
	}

  const errorElement = document.createElement("div");
  errorElement.id = "soxprox-" + id + "-error-message";
  errorElement.classList.add('soxprox-error');
  if (!displayAll) {
    errorElement.innerHTML = errors[0];
  } else {
    writeErrorList(errorElement, errors, id);
  }
  const formElement = document.getElementById(id);
  insertAfter(formElement, errorElement);
};
