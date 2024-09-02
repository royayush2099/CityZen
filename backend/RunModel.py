import subprocess

# List of Flask files to run
flask_files = ["app.py", "potholes.py", "traffic.py" ]

# List to hold the subprocesses
processes = []

try:
    # Start each Flask server
    for file in flask_files:
        process = subprocess.Popen(["python", file])
        processes.append(process)
    
    # Keep the script running to maintain the servers
    while True:
        pass

except KeyboardInterrupt:
    # Terminate all servers when the script is interrupted
    for process in processes:
        process.terminate()
