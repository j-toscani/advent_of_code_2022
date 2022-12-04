use std::env;
use std::fs::File;
use std::io::{self, BufReader, BufRead};

enum Symbol {
    Rock,
    Paper,
    Scissors,
}

enum GameResult {
    Win,
    Lose,
    Draw,
}

struct Matchup {
    opponent: Symbol,
    me: Symbol,
    result: GameResult
}

impl Matchup {
    fn get_result(&self) -> GameResult{
        match self.opponent {
            Symbol::Rock => match self.me {
                Symbol::Paper => GameResult::Win,
                Symbol::Scissors => GameResult::Lose,
                _ => GameResult::Draw,
            },
            Symbol::Paper => match self.me {
                Symbol::Scissors => GameResult::Win,
                Symbol::Rock => GameResult::Lose,
                _ => GameResult::Draw,
            },
            Symbol::Scissors => match self.me {
                Symbol::Rock => GameResult::Win,
                Symbol::Paper => GameResult::Lose,
                _ => GameResult::Draw,
            },
        }
    }
}

struct Game {
    matchups: Vec<Matchup>
}

impl Game {
    fn new() -> Game {
        Game { matchups: Vec::new() }
    }

    fn calculate_scores(&mut self) -> u32 {
        let mut score = 0;
    
        for matchup in &self.matchups {
            score += get_result_score(&matchup.result) + get_symbol_score(&matchup.me);
        }

        score
    }

    fn parse_match_up(&mut self, string: &str) {
        let chars = string.chars().collect::<Vec<char>>();
        let first = chars.get(0).unwrap().to_string();
        let last = chars.get(2).unwrap().to_string();

        let opponent = get_oponent_symbol(first.as_str()).unwrap();
        
        let me = (match last.as_str() {
            "X" => Ok(Symbol::Rock),
            "Y" => Ok(Symbol::Paper),
            "Z" => Ok(Symbol::Scissors),
            _ => Err("Unknown Symbol")
        }).unwrap();

        let result = get_game_result(&opponent, &me);

        self.matchups.push(Matchup {
            opponent,
            me,
            result
        });
    }
}

fn get_game_result(opponent: &Symbol, me: &Symbol) -> GameResult{
    match opponent {
        Symbol::Rock => match me {
            Symbol::Paper => GameResult::Win,
            Symbol::Scissors => GameResult::Lose,
            _ => GameResult::Draw,
        },
        Symbol::Paper => match me {
            Symbol::Scissors => GameResult::Win,
            Symbol::Rock => GameResult::Lose,
            _ => GameResult::Draw,
        },
        Symbol::Scissors => match me {
            Symbol::Rock => GameResult::Win,
            Symbol::Paper => GameResult::Lose,
            _ => GameResult::Draw,
        },
    }
}

fn get_oponent_symbol(string: &str) -> Result<Symbol, &str> {
    match string {
        "A" => Ok(Symbol::Rock),
        "B" => Ok(Symbol::Paper),
        "C" => Ok(Symbol::Scissors),
        _ => Err("Unknown Symbol!")
    }
}

fn get_result_score(result: &GameResult) -> u32 {
    match result {
        GameResult::Win => 6,
        GameResult::Draw => 3,
        GameResult::Lose => 0,
    }
}

fn get_symbol_score(symbol: &Symbol) -> u32 {
    match symbol {
        Symbol::Rock => 1,
        Symbol::Paper => 2,
        Symbol::Scissors => 3,
    }
}

fn main() {
    let mut cwd = env::current_dir().unwrap();
    cwd.push("src/data.txt");

    let data = File::open(cwd).unwrap();
    let reader = BufReader::new(data);

    let mut game = Game::new();

    for line in reader.lines() {
        let line_string = line.unwrap();
        game.parse_match_up(&line_string);
    }

    let score = game.calculate_scores();

    println!("{}", score);
}
