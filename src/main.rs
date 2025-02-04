use std::{collections::{HashMap, HashSet}, env, fs::read_to_string, sync::{Arc, Mutex}};
use ws::{Handler, Sender, Result, Message, listen};

struct Game {
    words: Vec<String>,
    prev_submitter: Option<Sender>,
    dict: HashSet<String>,
}

struct Server {
    out: Sender,
    game: Arc<Mutex<Game>>,
}

impl Handler for Server {
    fn on_open(&mut self, _: ws::Handshake) -> Result<()> {
        let game = self.game.lock().unwrap();
        let res = serde_json::json!({
            "words": game.words,
            "new_word": game.words.last().expect("there is always a word, 'a' to begin with"),
        });

        self.out.send(res.to_string())
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        let mut game = self.game.lock().unwrap();
        let word = msg.as_text()?.trim().to_lowercase();

        fn error_check(game: &Game, word: &String, out: &Sender) -> Option<String> {
            // check the consecutive submission rule is followed
            if let Some(prev_submitter) = &game.prev_submitter {
                if prev_submitter == out {
                    return Some(String::from("You cannot submit twice in a row"))
                }
            }
            
            // check the word-chain rule is followed
            if let Some(prev_word) = game.words.last() {
                if prev_word.chars().last().unwrap() != word.chars().next().unwrap() {
                    return Some(format!("Your word, '{word}', does not start with the last letter of the previous word, {prev_word}"))
                }
            }
            
            // validate the word itself
            if word.is_empty() {
                Some(String::from("Word cannot be empty"))
            } else if game.words.contains(word) {
                Some(format!("Your word, '{word}', has already been used in the chain"))
            } else if !game.dict.contains(word) {
                Some(format!("Your word, '{word}', is not a valid English word"))
            } else {
                None
            }
        }

        // if any errors, send error msg to this socket conn only
        if let Some(e) = error_check(&game, &word, &self.out) {
            let error_msg = serde_json::json!({
                "error": format!("Error: {e}!"),
            });
            
            return self.out.send(error_msg.to_string());
        }

        // otherwise update game state and broadcast it (JSONified) to 
        // all socket conns
        game.words.push(word.clone());
        game.prev_submitter = Some(self.out.clone());
        
        let res = serde_json::json!({
            "words": game.words,
            "new_word": word,
        });
        
        self.out.broadcast(res.to_string())
    }
}

fn main() -> Result<()> {
    // initialise Eng dictionary
    let dict = read_to_string("src/words.json").expect("Failed to read words.json");
    let dict: HashMap<String, i32> = serde_json::from_str(&dict)
        .expect("Failed to parse words JSON");
    let dict: HashSet<String> = dict.keys().cloned().collect();

    // Arc<Mutex> for concurrency
    let game = Arc::new(Mutex::new(Game {
        words: vec![String::from("a")],
        prev_submitter: None,
        dict,
    }));

    // PORT set on render.com, or 3030 for localhost
    let port = env::var("PORT").unwrap_or_else(|_| String::from("3030"));
    
    // 0.0.0.0 allows connections to be from anywhere
    let address = format!("0.0.0.0:{port}");
    println!("Listening on {address}");
    listen(address, |out| Server {
        out,
        game: game.clone(),
    })
}
