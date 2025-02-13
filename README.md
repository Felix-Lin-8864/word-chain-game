# Word-Chain-Inator

## The Project

### Aim
Primary Aim: To have a fully deployed, functional web application utilising with web sockets.

Secondary Aim: Attempt communication between different programming languages (albeit using sockets instead of FFI).

### Composition [![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](https://www.rust-lang.org/) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

This project is a simple web socket application. The frontend is composed in JavaScript with basic HTML and CSS (not the focus of this project). The user backend is written in JavaScript with the WebSocket API, whilst the server backend is written in Rust with the ws crate/library for web socket connection and communication, and serde/serde_json to write and parse JSON for the communication of data over web sockets. Rust was chosen for this project, as it offers fast performance times, memory and type-safety and digestable concurrency control primitives, all of which are valuable for a multi-user web application.

### Deployment
This project is deployed as both a public chrome extension and website hosted on GitHub pages. These endpoints were chosen to maximise the game's exposure and accessibility, whilst balancing cost; Chrome Developer accounts incur a minor fee, but published extensions are available to anyone with a Chrome account and are easy to install; GitHub provides a free hosting avenue for static websites on the web through Pages. The chrome extension and website operate as the frontend interacting with the Rust backend. The Rust backend is hosted on render.com using their web service hosting products. render.com's products were chosen for their simplicity and as there are free options.

### Links
- [GitHub Repo](https://github.com/Felix-Lin-8864/word-chain-game)
- [GitHub Pages](https://felix-lin-8864.github.io/word-chain-game/)
- [Chrome Webstore Listing](https://chromewebstore.google.com/detail/word-chain-inator/ocmjgbgadgaombpgidnbfckikodidojf)
- [English Dictionary (words.json)](https://github.com/dwyl/english-words)
- [ws crate](https://crates.io/crates/ws/0.9.2)

## The Game
![game gif](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZodmp0b3U3eTQ3ZjU5Y2RqZml6Y25vem91YWwwMml3NjY5aW14cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2XlLH5o5gIIYC2sviv/giphy.gif)

A simple multiplayer word chain game:
- The next word must start with the last letter of the previous one
- Players must wait 3 seconds or for another player to submit a word before they can submit again
- Words must be new to the list
- Words must be valid English words

Play from either the website or the chrome extension :D.

## PLEASE NOTE
that the backend is hosted on render.com's free services, so the web socket may take a minute or two to spin up if inactive, or a couple seconds to establish a connection.

(please wait patiently so that the monkeys can work):

![monkey loading gif](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHRuYXhyb3RpdzJwMDJxdnlkemw2N3BvNnV4bDlpc3JvMWhvaGo0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PaItQMQWMCGeNJAHh3/giphy.gif)
