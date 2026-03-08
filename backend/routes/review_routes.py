from flask import Blueprint, request, jsonify
from models.user import db
from models.review import Review
from models.booking import Booking

review_bp = Blueprint("review", __name__)

@review_bp.route("/create", methods=["POST"])
def create_review():

    data = request.get_json()

    booking_id = data.get("booking_id")
    rating = data.get("rating")
    comment = data.get("comment")

    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    if booking.status != "COMPLETED":
        return jsonify({"error": "Review allowed only after service completion"}), 400

    review = Review(
        booking_id=booking_id,
        customer_id=booking.customer_id,
        provider_id=booking.provider_id,
        rating=rating,
        comment=comment
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review submitted"})