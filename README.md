# The Game
A simple word chain game; the next word must start with the last letter of the previous one. Take turns playing with others across the web from both the [chrome extension](https://chromewebstore.google.com/detail/word-chain-inator/ocmjgbgadgaombpgidnbfckikodidojf) or [website](https://felix-lin-8864.github.io/word-chain-game/)!

## Other Rules
Players must wait 3 seconds, or for another player to submit a word, before they can submit again.

## PLEASE NOTE
that the backend is hosted on render.com's free services, so the web socket may take a minute or two to spin up, per the monkeys (visit the site or download the extension to understand :D).

# The Project
A simple Web Socket application; frontend in JavaScript with HTML and CSS, backend in Rust hosted using Render's free services.

After following Socket.io's tutorial to make the [SimpleSocketChat](https://github.com/Felix-Lin-8864/SimpleSocketChat) project, I attempted this project using a Rust web socket crate, [ws](https://crates.io/crates/ws/0.9.2). Though this project could have been completed entirely in JavaScript, I wanted to try applying Rust and communicate between languages (albeit using sockets instead of FFI).