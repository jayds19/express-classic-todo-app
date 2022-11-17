function updateTaskRequest(id, value) {
  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, completed: value }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("Task updated. Response", response);
      showMessage("success-message", "Task updated.");
    })
    .catch(function (ex) {
      showMessage("failure-message", "No se pudo actualizar.");
    });
}

function showMessage(messageId, text) {
  var message = document.getElementById(messageId);
  message.className = message.className.replace("hide", "show");
  message.className =
    message.className.replace("show-animation", "") + " hide-animation";
  message.innerHTML = text;

  setTimeout(() => {
    message.className = message.className.replace("show", "hide");
  }, 3000);
}

function hideMessage(messageId) {
  var message = document.querySelector("#" + messageId);
}

function mapClassKeysToList(classKeys) {
  console.log(classKeys);
  var keyIndex = 0;
  var classList = [];

  while (classKeys[keyIndex] != null) {
    classList.push(classKeys[keyIndex]);
    keyIndex++;
  }

  return classList;
}

function classListToString(classList) {
  var classString = "";

  for (var index = 0; index < classList.length; index++) {
    classList += classList[index] + " ";
  }

  return classString;
}
