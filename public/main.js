const BACKEND_URL = "http://localhost:3000";

let submitButton = document.getElementById("submit_button");
let mainMessage = document.getElementById("main_message");
let textboxToSend = document.getElementById("to_send");
let messageResult = document.getElementById("message_result");

/* You can use the fetch() API to retrieve local JSON info */
let sendMessage = false;
fetch('../settings.json')
    .then(response => response.json())
    .then(jsonData => {
        sendMessage = jsonData.sendMessageToBackend;
        console.log(sendMessage);
    })
    .catch(error => console.error('Error:', error));

submitButton.onclick = () => {
    // Update the text of the main message
    mainMessage.innerText = "Submitted!";
    setTimeout(()=> {
        console.log("After 3 seconds");
        mainMessage.innerText = "Hello there world!";
    }, 3000);

    messageResult.innerText = `Previous message sent: ${textboxToSend.value}`;
    if(sendMessage) {
        sendMessageToBackend(textboxToSend.value);
    }
};

function sendMessageToBackend(msg) {
    // Configure options for the fetch function
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: textboxToSend.value
        })
    };

    // Send a POST request to the backend
    fetch(BACKEND_URL, fetchOptions)
        .then((response) => {
            test_persist();
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(`Request failed: ${error}`);
        });
}