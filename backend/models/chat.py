from models.user import db
import uuid

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    booking_id = db.Column(db.String, nullable=False)
    sender_id = db.Column(db.String, nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())