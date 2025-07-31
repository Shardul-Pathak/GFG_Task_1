const chat = document.getElementById('chat');
const previousChats = document.getElementById('previousChats');
const chatHeading = document.getElementById('chatHeading');
const message = document.getElementById('message');

async function getMessage(title) {
    console.log("getMessage Called")
    console.log(title)
    const botMessage = await fetch(`/api/responses?title=${title}`);
    chat.innerHTML = '';
    chatHeading.innerHTML = '';
    const chats = await botMessage.json();
    chats.forEach(item => {
        const cardHtml = `
        <div class="flex justify-end">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl max-w-lg shadow-md">
                <p class="text-white">${item.userMessage}</p>
            </div>
        </div>
        <div class="flex justify-start">
            <div class="bg-gray-700 p-3 rounded-xl max-w-lg shadow-md">
                <p class="text-gray-100">${item.botMessage}</p>
            </div>
        </div>
        `;
        chat.insertAdjacentHTML('beforeend', cardHtml);
    });
    chatHeading.innerHTML = `<h1 class="text-2xl font-bold text-white">${title}</h1>`
    message.innerHTML = ``
    message.innerHTML = `
        <form id="message" action="/api/send" method="post" class="p-4 bg-gray-800 flex items-center space-x-3 rounded-br-lg shadow-lg">
            <input type="text" name="userMessage" placeholder="Type your message..." class="flex-grow p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600">
            <input type="hidden" name="title" value="${title}">
            <button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-purple-700 hover:to-indigo-700 transition-colors duration-200">
                    Send
            </button>
        </form>`
    chat.scrollTop = chat.scrollHeight;
}

async function getPreviousChats() {
    const titles = await fetch('/api/previousChats');
    previousChats.innerHTML = '';
    const previous = await titles.json();
    previous.forEach(item => {
        const chatHtml = `<button class="w-full p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200 font-medium" onclick="loadChat('${item.title}')">${item.title}</button>
        `;
        previousChats.insertAdjacentHTML('beforeend', chatHtml);
    });
    previousChats.scrollTop = previousChats.scrollHeight;
}

function loadChat(title) {
    getMessage(title);
}

window.addEventListener('load', () => {
  getPreviousChats();
});