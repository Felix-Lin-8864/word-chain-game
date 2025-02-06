const DEV_CODE = "THERE-ARE-128000-to-200000-WHALE-SHARKS-IN-THE-WORLD";

const socket = new WebSocket("wss://word-chain-game-yxws.onrender.com");

// disable buttons until socket is connected
document.getElementById("word-input").disabled = true;
document.getElementById("submit-word").disabled = true;

function append_word(word) {
    const word_list = document.getElementById("word-list");
    const list_item = document.createElement("li");
    list_item.textContent = word;
    word_list.appendChild(list_item);
    document.getElementById("prev-word").innerText = "Previous Word: " + word;
}

function update_game_state(data) {
    const error_popup = document.getElementById("error-popup");
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

    append_word(data.new_word);

    const word_list = document.getElementById("word-list");
    word_list.scrollTop = word_list.scrollHeight;
    setTimeout(() => {
        socket.send(DEV_CODE + "clear-prev-submitter");
    }, 3000);
}

socket.onopen = function () {
    console.log("Connected");
    document.getElementById("loading-gif").remove();
    document.getElementById("word-input").disabled = false;
    document.getElementById("submit-word").disabled = false;
};

socket.onclose = function (event) {
    document.getElementById("word-input").disabled = false;
    document.getElementById("submit-word").disabled = false;
    console.log("Connection closed");
}

socket.onerror = function (error) {
    console.log("Error: ", error);
}

socket.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        
        if (data.words) {
            data.words.forEach(word => {
                append_word(word);
            });
        } else {
            update_game_state(data);
        }
    } catch (error) {
        console.error("Failed to parse server msg: ", error);
    }
};

document.getElementById("submit-word").addEventListener("click", async function () {
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