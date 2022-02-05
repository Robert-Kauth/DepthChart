import os
from flask_socketio import SocketIO, emit, send, join_room, leave_room


# Configure CORS_origins based on environment
if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://depthchart.herokuapp.com/",
               "https://depthchart.herokuapp.com/"]
else:
    origins = "*"

# creates socketio instance
sio = SocketIO(cors_allowed_origins=origins,logger=True, engineio_logger=True)


@sio.on('chat')
def handle_chat(data):
    '''
    Chat event handler
    '''
    emit("chat", data, broadcast=True)


@sio.on('join')
def on_join(data):
    '''
    Handles user joining chat room
    '''
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room', to=room)


@sio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
