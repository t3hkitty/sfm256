import os
import json

def validate_achievements():
    achievements_dir = os.path.dirname(os.path.abspath(__file__))
    registry_path = os.path.join(achievements_dir, 'registry.json')
    
    if not os.path.exists(registry_path):
        raise FileNotFoundError(f"registry.json not found in {achievements_dir}")
        
    with open(registry_path, 'r') as f:
        registry = json.load(f)
        
    required_keys = {"id", "title", "description", "points"}
    for idx, trophy in enumerate(registry):
        missing = required_keys - trophy.keys()
        if missing:
            raise ValueError(f"Trophy at index {idx} is missing keys: {missing}")
        if not isinstance(trophy["points"], int) or trophy["points"] < 0:
            raise ValueError(f"Trophy '{trophy['id']}' must have non-negative integer points")
            
    print("Achievement registry validated successfully.")

if __name__ == '__main__':
    validate_achievements()
