from flask import Blueprint, request, jsonify
from models.review import Review
from models.booking import Booking
from models.user import db
import uuid

review_bp = Blueprint("review", __name__)


# ---------------- CREATE REVIEW ----------------
@review_bp.route("/create", methods=["POST"])
def create_review():

    data = request.get_json()

    booking_id = data.get("booking_id")
    rating = data.get("rating")
    comment = data.get("comment")

    # 🔥 Get provider_id from booking
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    review = Review(
        id=str(uuid.uuid4()),
        booking_id=booking_id,
        provider_id=booking.provider_id,  # ✅ AUTO LINK
        rating=rating,
        comment=comment
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review submitted successfully"})