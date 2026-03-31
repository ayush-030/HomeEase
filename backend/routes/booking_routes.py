from flask import Blueprint, request, jsonify
from models.booking import Booking
from models.provider_profile import ProviderProfile
from models.user import User
from models.user import db
from models.review import Review
from datetime import time
import uuid

booking_bp = Blueprint("booking", __name__)


# ---------------- CREATE BOOKING ----------------
@booking_bp.route("/create", methods=["POST"])
def create_booking():

    data = request.get_json()

    customer_id = data.get("customer_id")
    provider_id = data.get("provider_id")
    booking_date = data.get("booking_date")
    booking_time = data.get("booking_time")

    if not customer_id or not provider_id:
        return jsonify({"error": "Missing data"}), 400

    booking = Booking(
        id=str(uuid.uuid4()),
        customer_id=customer_id,
        provider_id=provider_id,
        booking_date=booking_date,
        booking_time=booking_time,
        status="PENDING"
    )

    db.session.add(booking)
    db.session.commit()

    return jsonify({"message": "Booking created successfully"})


# ---------------- PROVIDER BOOKINGS ----------------
@booking_bp.route("/provider/<user_id>", methods=["GET"])
def get_provider_bookings(user_id):

    provider = ProviderProfile.query.filter_by(user_id=user_id).first()

    if not provider:
        return jsonify([])

    bookings = Booking.query.filter_by(provider_id=provider.id).all()

    result = []

    for b in bookings:

        customer = User.query.get(b.customer_id)

        result.append({
            "id": b.id,
            "customer_name": customer.full_name if customer else "Unknown",
            "customer_phone": customer.phone if customer else "N/A",
            "customer_address": customer.address if customer else "N/A",
            "customer_city": customer.city if customer else "N/A",
            "date": str(b.booking_date),
            "time": str(b.booking_time),
            "status": b.status
        })

    return jsonify(result)


# ---------------- UPDATE STATUS ----------------
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

@booking_bp.route("/customer/<customer_id>", methods=["GET"])
def get_customer_bookings(customer_id):

    bookings = Booking.query.filter_by(customer_id=customer_id).all()

    result = []

    for b in bookings:

        provider = ProviderProfile.query.get(b.provider_id)
        user = User.query.get(provider.user_id) if provider else None

        # check if review already exists
        review = Review.query.filter_by(booking_id=b.id).first()

        result.append({
            "id": b.id,
            "provider_name": user.full_name if user else "Unknown",
            "date": str(b.booking_date),
            "time": str(b.booking_time),
            "status": b.status,
            "review_given": True if review else False
        })

    return jsonify(result)

@booking_bp.route("/available-slots/<provider_id>", methods=["GET"])
def get_available_slots(provider_id):

    date = request.args.get("date")

    if not date:
        return jsonify({"error": "Date required"}), 400

    # ⏰ Fixed slots (can upgrade later)
    all_slots = [
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "14:00:00",
        "16:00:00",
        "18:00:00"
    ]

    # Get booked slots
    bookings = Booking.query.filter_by(
        provider_id=provider_id,
        booking_date=date
    ).all()

    booked_slots = [str(b.booking_time) for b in bookings]

    # Remove booked slots
    available = [slot for slot in all_slots if slot not in booked_slots]

    return jsonify(available)