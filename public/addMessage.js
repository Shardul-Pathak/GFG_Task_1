const chat = document.getElementById('chat');

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
}

window.addEventListener('load', () => {
  getMessage();
});