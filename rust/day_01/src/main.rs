use std::env;
use std::fs::File;
use std::io::{self, BufReader, BufRead};

fn main() {
    let mut cwd = env::current_dir().unwrap();
    cwd.push("src/data.txt");

    let data = File::open(cwd).unwrap();
    let reader = BufReader::new(data);

    let mut score: usize = 0;
    let mut scores: Vec<usize> = vec![];

    for line in reader.lines() {
        let line_string = line.unwrap();

        if line_string == "" {
            scores.push(score);
            score = 0;
            continue;
        }

        let cleaned = line_string.parse::<usize>().unwrap();
        score += cleaned;
    }

    scores.sort();

    let (_rest, top_three) = scores.split_at(scores.len() - 3);
    println!("{:?}", top_three)

}
