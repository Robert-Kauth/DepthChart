import os
from flask_socketio import SocketIO, emit


# Configure CORS_origins based on environment
if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://depthchart.herokuapp.com/",
               "https://depthchart.herokuapp.com/"]
else:
    origins = "*"

# creates socketio instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('chat')
def handle_chat(data):
    emit("chat", data, broadcast=True)
