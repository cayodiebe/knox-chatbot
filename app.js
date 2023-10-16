const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";
const loader = document.getElementById("loader");

// Add event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Add greeting message to the chat messages
  messages.innerHTML += `<div class="message bot-message">
  <img src="./icons/chatbot.png" alt="bot icon"> <span>Olá, sou o assistente de departamento pessoal da KnoxSolutions, pode me perguntar qualquer coisa.</span>
  </div>`;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./icons/user.jpg" alt="user icon"> <span>${message}</span>
  </div>`;

  // Show the loader
  loader.style.display = "block";

  // Use axios library to make a POST request to the OpenAI API
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const chatbotResponse = response.data.choices[0].text;

  messages.innerHTML += `<div class="message bot-message">
  <img src="./icons/chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;

  // Hide the loader
  loader.style.display = "none";
});

