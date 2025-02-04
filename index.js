// const socket = new WebSocket("ws://127.0.0.1:3030");
const socket = new WebSocket("wss://word-chain-game-yxws.onrender.com");

function append_word(word) {
    const word_list = document.getElementById("word-list");
    const list_item = document.createElement("li");
    list_item.textContent = word;
    word_list.appendChild(list_item);
}

function update_game_state(data) {
    error_popup = document.getElementById("error-popup");
    // remove any prev error popups from screen
    error_popup.style.display = "none";

    if (data.error) {
        error_popup.textContent = data.error;
        error_popup.style.display = "block";

        // fade out the error popup
        setTimeout(() => {
            error_popup.style.transition = "opacity 1s ease-out";
            error_popup.style.opacity = "0";

            setTimeout(() => {
                error_popup.style.display = "none";
                error_popup.style.opacity = "1";
            }, 1000);
        }, 1500);
        return;
    }

    document.getElementById("prev-word").innerText = "Previous Word: " + data.new_word;
    append_word(data.new_word);

    const word_list = document.getElementById("word-list");
    word_list.scrollTop = word_list.scrollHeight;
}

socket.onopen = function (event) {
    console.log("Connected");

    try {
        const data = JSON.parse(event.data);
        data.words.forEach(word => {
            append_word(word);
        });

        document.getElementById("prev-word").innerText = "Previous Word: " + data.new_word;
    } catch (error) {
        console.error("Failed to parse server msg: ", error);
    }
};

socket.onclose = function (event) {
    console.log("Connection closed");
}

socket.onerror = function (error) {
    console.log("Error: ", error);
}

socket.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        update_game_state(data);
    } catch (error) {
        console.error("Failed to parse server msg: ", error);
    }
};

document.getElementById("submit-word").addEventListener("click", async function () {
    while (socket.readyState === WebSocket.CONNECTING) {
        console.error("Socket is in a connecting state");
        await new Promise(r => setTimeout(r, 500));
    }
    
    const word_input = document.getElementById("word-input");
    socket.send(word_input.value);
    word_input.value = "";
});

document.getElementById("word-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("submit-word").click();
    }
});

