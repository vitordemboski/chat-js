function gotoBottom(id) {
  var element = document.getElementById(id);
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function createStructureMessage(text) {
  const divMessage = document.createElement("div");
  divMessage.className = "message";

  const divAuthor = document.createElement("div");
  divAuthor.className = "author";

  const divContentMessage = document.createElement("div");
  divContentMessage.className = "message-content";
  divContentMessage.innerHTML += text;

  return {
    author: divAuthor,
    content: divContentMessage,
    message: divMessage,
  };
}

const typesMessage = {
  clerk: (text) => {
    const { author, content, message } = createStructureMessage(text);
    author.innerHTML += "Atendente diz:";
    message.appendChild(author);
    message.appendChild(content);
    return message;
  },
  person: (id) => {
    const input = document.getElementById(id);
    const { author, content, message } = createStructureMessage(input.value);
    input.value = "";
    author.innerHTML += "Você diz:";
    message.className += " message-person";
    message.appendChild(author);
    message.appendChild(content);
    return message;
  },
};

function addMessage(type, value) {
  const addMessageFunc = typesMessage[type];
  if (!addMessageFunc) throw new Error("Type invalid");

  const message = addMessageFunc(value);

  const chat = document.querySelector(".chat-messages");
  chat.appendChild(message);
}

window.addEventListener("load", function (e) {
  gotoBottom("chat-messages");
  addMessage("clerk", "Em que posso ajudar o/a senhor/a ?");

  document.getElementById("simple_form").onsubmit = function () {
    addMessage("person", "text-message");
    addMessage("clerk", "Pooo que legal");
    gotoBottom("chat-messages");
    return false;
  };
});
