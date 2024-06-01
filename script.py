# script.py
import sys
import json

# Read data from stdin
data = sys.stdin.readline()
data = json.loads(data)

# Process data
message_from_nodejs = data.get('message')
result = f'Python received: {message_from_nodejs}. Python says: Hello from Python!'

# Send result to stdout
print(json.dumps(result))
