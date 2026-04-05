from flask import Blueprint, request, jsonify
from models.chat import Message
from models.user import User
from models.booking import Booking
from models.user import db

chat_bp = Blueprint("chat", __name__)

# -----------------------------
# SEND MESSAGE
# -----------------------------
@chat_bp.route("/send", methods=["POST"])
def send_message():

    data = request.get_json()

    booking_id = data.get("booking_id")
    sender_id = data.get("sender_id")
    message = data.get("message")

    if not booking_id or not sender_id or not message:
        return jsonify({"error": "Missing fields"}), 400

    new_message = Message(
        booking_id=booking_id,
        sender_id=sender_id,
        message=message
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent"})


# -----------------------------
# GET MESSAGES
# -----------------------------
@chat_bp.route("/<booking_id>", methods=["GET"])
def get_messages(booking_id):

    messages = Message.query.filter_by(booking_id=booking_id)\
        .order_by(Message.created_at.asc()).all()

    result = []

    for m in messages:
        user = User.query.get(m.sender_id)

        result.append({
            "id": m.id,
            "message": m.message,
            "sender_id": m.sender_id,
            "sender_name": user.full_name if user else "User",
            "time": str(m.created_at)
        })

    return jsonify(result)