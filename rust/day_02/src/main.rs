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
    _opponent: Symbol,
    me: Symbol,
    result: GameResult
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

    fn parse_match_up_strat_two(&mut self, string: &str) {
        let (first, last) = get_firs_and_last(string);

        let opponent = get_opponent_symbol(first.as_str()).unwrap();
        let result = get_my_result(last.as_str()).unwrap();
        
        let me = get_my_symbol_from_game_result(&opponent, &result);

        self.matchups.push(Matchup {
            _opponent: opponent,
            me,
            result
        });
    }

    fn parse_match_up_strat_one(&mut self, string: &str) {
        let (first, last) = get_firs_and_last(string);

        let opponent = get_opponent_symbol(first.as_str()).unwrap();
        let me = get_my_symbol(&last.as_str()).unwrap();

        let result = get_game_result(&opponent, &me);

        self.matchups.push(Matchup {
            _opponent: opponent,
            me,
            result
        });
    }
}

fn get_my_symbol_from_game_result(opponent: &Symbol, result: &GameResult) -> Symbol {
    match opponent {
        Symbol::Rock => match result {
            GameResult::Win => Symbol::Paper,
            GameResult::Lose => Symbol::Scissors,
            _ => Symbol::Rock,
        },
        Symbol::Paper => match result {
            GameResult::Win => Symbol::Scissors,
            GameResult::Lose => Symbol::Rock,
            _ => Symbol::Paper,
        },
        Symbol::Scissors => match result {
            GameResult::Win => Symbol::Rock,
            GameResult::Lose => Symbol::Paper,
            _ => Symbol::Scissors,
        },
    }
}

fn get_firs_and_last(string: &str) -> (String, String) {
    let chars = string.chars().collect::<Vec<char>>();
    let first = chars.get(0).unwrap().to_string();
    let last = chars.get(2).unwrap().to_string();

    return (first, last)
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

fn get_my_symbol(string: &str) -> Result<Symbol, &str> {
    match string {
        "X" => Ok(Symbol::Rock),
        "Y" => Ok(Symbol::Paper),
        "Z" => Ok(Symbol::Scissors),
        _ => Err("Unknown Symbol")
    }
}

fn get_my_result(string: &str) -> Result<GameResult, &str> {
    match string {
        "X" => Ok(GameResult::Lose),
        "Y" => Ok(GameResult::Draw),
        "Z" => Ok(GameResult::Win),
        _ => Err("Unknown Symbol")
    }
}

fn get_opponent_symbol(string: &str) -> Result<Symbol, &str> {
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

    let mut game_one = Game::new();
    let mut game_two = Game::new();

    for line in reader.lines() {
        let line_string = line.unwrap();
        game_one.parse_match_up_strat_one(&line_string);
        game_two.parse_match_up_strat_two(&line_string)
    }

    let score_one = game_one.calculate_scores();
    let score_two = game_two.calculate_scores();

    println!("Score of game one is: {}", score_one);
    println!("Score of game two is: {}", score_two);
}
