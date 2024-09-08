from flask import Flask, Response, stream_with_context
from flask_cors import CORS
from roboflow import Roboflow
import cv2
import os
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

#-------------------Roboflow API KEY ----------------------------
rf = Roboflow(api_key="VArwTQnDOOH8QhfqQEtU")
project = rf.workspace().project("traffic-rz3cd")
model = project.version("1").model

# Shared list to hold alerts
alerts_list = []

def generate_frames():
    video_source = 'C1.mp4'  

    # Check if the video file exists
    if not os.path.exists(video_source):
        print(f"Video file {video_source} not found.")
        return
    
    cap = cv2.VideoCapture(video_source)
    frame_skip = 6  # Skip every 6th frame to increase speed
    frame_count = 0

    while True:
        success, frame = cap.read()
        if not success:
            print("Failed to read frame.")
            break
        
        frame_count += 1

        # Skip frames
        if frame_count % frame_skip != 0:
            continue
        
        # Resize the frame to a lower resolution to speed up processing
        input_size = (640, 640)  # Lower resolution for faster processing
        frame_resized = cv2.resize(frame, input_size)

        # Save the resized frame temporarily to run through the Roboflow model
        temp_frame_path = 'temp_frame.jpg'
        cv2.imwrite(temp_frame_path, frame_resized)

        # Predict using the Roboflow model
        prediction = model.predict(temp_frame_path, confidence=40).json()
        predictions = prediction.get('predictions', [])

        # Initialize vehicle count for each frame
        vehicle_count = 0

        # Draw boxes on the frame using prediction results
        for box in predictions:
            x = int(box['x'] - box['width'] / 2)
            y = int(box['y'] - box['height'] / 2)
            w = int(box['width'])
            h = int(box['height'])
            label = box['class']
            
            # Count vehicles
            if label in ['car', 'truck', 'bus', 'bike']:  # Adjust based on your labels
                vehicle_count += 1
                color = (0, 255, 0)  # Green color for vehicles
                cv2.rectangle(frame_resized, (x, y), (x + w, y + h), color, 2)
                cv2.putText(frame_resized, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
            else:
                color = (0, 0, 255)  # Red color for other labels
                cv2.rectangle(frame_resized, (x, y), (x + w, y + h), color, 2)
                cv2.putText(frame_resized, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

        # Calculate text size and position to center it
        text = f'Vehicle Count: {vehicle_count}'
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 1
        font_color = (0, 255, 0)  # Green color for text
        thickness = 2
        (text_width, text_height), _ = cv2.getTextSize(text, font, font_scale, thickness)
        text_x = (frame_resized.shape[1] - text_width) // 2
        text_y = (frame_resized.shape[0] + text_height) // 2

        # Display the vehicle count at the center of the frame
        cv2.putText(frame_resized, text, (text_x, text_y), font, font_scale, font_color, thickness, cv2.LINE_AA)

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame_resized)
        if not ret:
            continue
        frame_bytes = buffer.tobytes()

        # Yield the frame to be streamed
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        # Clean up the temporary file
        os.remove(temp_frame_path)

    cap.release()

#-------------------------ALERT FUNCTION--------------------------
def send_alert(label):
    # Append the alert to the alerts list
    alert_message = f"ALERT: {label} detected!"
    alerts_list.append(alert_message)
    print(alert_message)

def alert_stream():
    # Stream the alerts as Server-Sent Events
    @stream_with_context
    def generate():
        while True:
            if alerts_list:
                yield f"data: {alerts_list.pop(0)}\n\n"
            time.sleep(1)  # Adjust the sleep time as necessary

    return Response(generate(), mimetype='text/event-stream')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/alerts')
def alerts_feed():
    return alert_stream()

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5002)