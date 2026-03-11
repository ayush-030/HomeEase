from flask import Blueprint, request, jsonify
from models.user import db
from models.booking import Booking

booking_bp = Blueprint("booking", __name__)

@booking_bp.route("/create", methods=["POST"])
def create_booking():
    data = request.get_json()

    customer_id = data.get("customer_id")
    provider_id = data.get("provider_id")
    category_id = data.get("category_id")
    booking_date = data.get("booking_date")
    booking_time = data.get("booking_time")

    booking = Booking(
        customer_id=customer_id,
        provider_id=provider_id,
        category_id=category_id,
        booking_date=booking_date,
        booking_time=booking_time
    )

    db.session.add(booking)
    db.session.commit()

    return jsonify({"message": "Booking request created"})

@booking_bp.route("/update-status/<booking_id>", methods=["PUT"])
def update_booking_status(booking_id):

    data = request.get_json()
    status = data.get("status")

    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    booking.status = status
    db.session.commit()

    return jsonify({"message": "Booking status updated"})

@booking_bp.route("/provider/<provider_id>", methods=["GET"])
def get_provider_bookings(provider_id):

    bookings = Booking.query.filter_by(provider_id=provider_id).all()

    results = []

    for b in bookings:
        results.append({
            "id": b.id,
            "customer_id": b.customer_id,
            "date": str(b.booking_date),
            "time": str(b.booking_time),
            "status": b.status
        })

    return jsonify(results)