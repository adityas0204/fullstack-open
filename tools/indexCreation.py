import os

base_path = './notes'
max_depth = 1
index = open('./tools/index.txt', 'w')

for root, dirs, files in os.walk(base_path):
    rel_path = os.path.relpath(root, base_path)
    depth = 0 if rel_path == '.' else rel_path.count(os.sep) + 1

    if depth >= max_depth:
        dirs.clear()

    for file in files:
        if file.endswith('.md'):
            index.write((os.path.join(root, file) + '\n').replace("\\", "/").replace('./', '/'))

index.close()

with open('./tools/index.txt', 'r') as f:
	content = f.read()

print(content)
