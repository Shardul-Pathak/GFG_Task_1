const chat = document.getElementById('chat');
const previousChats = document.getElementById('previousChats');

async function getMessage() {
    const botMessage=await fetch('/api/responses');
    chat.innerHTML = '';
    const chats= await botMessage.json();
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
    chat.scrollTop = chat.scrollHeight;
}

async function getPreviousChats() {
    const titles = await fetch('/api/previousChats');
    previousChats.innerHTML = '';
    const previous = await titles.json();
    previous.forEach(item => {
        const chatHtml = `
            <div class="p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                <button class="font-medium">${item.title}</button>
            </div>
        `;
        previousChats.insertAdjacentHTML('beforeend', chatHtml);
    });
    previousChats.scrollTop = previousChats.scrollHeight;
}

window.addEventListener('load', () => {
  getMessage();
  getPreviousChats();
});