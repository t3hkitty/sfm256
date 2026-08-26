import os
import json

def compile_index():
    kats_dir = os.path.dirname(os.path.abspath(__file__))
    index = []
    
    # Traverse directories to look for .kat configuration or structure info
    for root, dirs, files in os.walk(kats_dir):
        # Avoid traversing self/index.json
        if root == kats_dir:
            continue
        for file in files:
            if file.endswith('.kat') or file == 'kat.json':
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r') as f:
                        data = json.load(f)
                        index.append(data)
                except Exception as e:
                    print(f"Skipping {filepath} due to error: {e}")
                    
    index_path = os.path.join(kats_dir, 'index.json')
    with open(index_path, 'w') as f:
        json.dump(index, f, indent=2)
    print(f"Compiled index with {len(index)} kats into {index_path}")

if __name__ == '__main__':
    compile_index()
