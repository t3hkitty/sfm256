import os
import json

def verify_scores():
    leaderboard_dir = os.path.dirname(os.path.abspath(__file__))
    scores_path = os.path.join(leaderboard_dir, 'scores.json')
    
    if not os.path.exists(scores_path):
        raise FileNotFoundError(f"scores.json not found in {leaderboard_dir}")
        
    with open(scores_path, 'r') as f:
        scores = json.load(f)
        
    required_keys = {"username", "game_id", "score", "timestamp", "signature"}
    for idx, score_record in enumerate(scores):
        missing = required_keys - score_record.keys()
        if missing:
            raise ValueError(f"Score record at index {idx} is missing keys: {missing}")
        # Perform mock cryptographic check
        if not score_record["signature"].startswith("mock_signature_"):
            raise ValueError(f"Invalid signature for record at index {idx}")
            
    print("Leaderboard scores verified successfully.")

if __name__ == '__main__':
    verify_scores()
