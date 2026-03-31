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

    booking = Booking.query.get(data.get("booking_id"))

    if not booking:
        return jsonify({"error": "Invalid booking"}), 400

    # 🔥 IMPORTANT: get provider_id from booking
    provider_id = booking.provider_id

    review = Review(
        booking_id=booking.id,
        provider_id=provider_id,   # ✅ THIS FIXES YOUR ISSUE
        rating=data.get("rating"),
        comment=data.get("comment")
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review submitted"})