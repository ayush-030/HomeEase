from flask import Blueprint, request, jsonify
from models.user import db
from models.provider_profile import ProviderProfile
from models.review import Review
from models.booking import Booking
from models.user import User
import math

provider_bp = Blueprint("provider", __name__)


# -----------------------------
# HAVERSINE DISTANCE FUNCTION
# -----------------------------
def haversine(lat1, lon1, lat2, lon2):
    R = 6371

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


# -----------------------------
# CREATE PROVIDER PROFILE
# -----------------------------
@provider_bp.route("/create-profile", methods=["POST"])
def create_provider_profile():

    data = request.get_json()
    user_id = data.get("user_id")

    existing_profile = ProviderProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify({"error": "Provider profile already exists"}), 400

    try:
        profile = ProviderProfile(
            user_id=user_id,
            bio=data.get("bio"),
            experience_years=data.get("experience_years"),
            latitude=data.get("latitude"),
            longitude=data.get("longitude"),
            service_radius_km=data.get("service_radius_km", 5)
        )

        db.session.add(profile)
        db.session.commit()

        return jsonify({
            "message": "Provider profile created (pending admin approval)"
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# -----------------------------
# CHECK PROVIDER STATUS
# -----------------------------
@provider_bp.route("/status/<user_id>", methods=["GET"])
def check_provider_status(user_id):

    provider = ProviderProfile.query.filter_by(user_id=user_id).first()

    if not provider:
        return jsonify({"status": "NOT_CREATED"})

    if not provider.is_approved:
        return jsonify({"status": "PENDING"})

    return jsonify({
        "status": "APPROVED",
        "provider_id": provider.id
    })


# -----------------------------
# SEARCH PROVIDERS (SMART)
# -----------------------------
@provider_bp.route("/search", methods=["GET"])
def search_providers():

    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))

    providers = ProviderProfile.query.filter_by(is_approved=True).all()

    ranked = []

    for provider in providers:

        if provider.latitude is None or provider.longitude is None:
            continue

        distance = haversine(latitude, longitude, provider.latitude, provider.longitude)

        radius = provider.service_radius_km or 5
        if distance > radius:
            continue

        user = User.query.get(provider.user_id)

        # ✅ FIXED RATING LOGIC
        reviews = Review.query.filter_by(provider_id=provider.id).all()
        valid_ratings = [r.rating for r in reviews if r.rating is not None]

        review_count = len(valid_ratings)
        avg_rating = sum(valid_ratings) / review_count if review_count > 0 else 0

        experience = provider.experience_years or 0

        score = (
            (avg_rating * 2) +
            (experience * 0.3) +
            (review_count * 0.2) -
            (distance * 0.5)
        )

        ranked.append({
            "provider_id": provider.id,
            "name": user.full_name if user else "Unknown",
            "bio": provider.bio or "No description",
            "experience": experience,
            "latitude": provider.latitude,
            "longitude": provider.longitude,
            "rating": round(avg_rating, 1),
            "reviews": review_count,
            "distance": round(distance, 2),
            "score": round(score, 2)
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)

    return jsonify(ranked)


# -----------------------------
# PROVIDER DETAILS
# -----------------------------
@provider_bp.route("/details/<provider_id>", methods=["GET"])
def provider_details(provider_id):

    provider = ProviderProfile.query.get(provider_id)

    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    user = User.query.get(provider.user_id)

    reviews = Review.query.filter_by(provider_id=provider.id).all()
    valid_ratings = [r.rating for r in reviews if r.rating is not None]

    avg = sum(valid_ratings) / len(valid_ratings) if valid_ratings else 0

    review_list = []

    for r in reviews:
        booking = Booking.query.get(r.booking_id)
        customer = User.query.get(booking.customer_id) if booking else None

        review_list.append({
            "rating": r.rating,
            "comment": r.comment,
            "customer_name": customer.full_name if customer else "Unknown"
        })

    return jsonify({
        "name": user.full_name if user else "Unknown",
        "bio": provider.bio,
        "experience": provider.experience_years,
        "rating": round(avg, 1),
        "reviews_count": len(valid_ratings),
        "phone": user.phone if user else "N/A",
        "reviews": review_list
    })


# -----------------------------
# PROVIDER REVIEWS (DETAILED)
# -----------------------------
@provider_bp.route("/reviews/<provider_id>", methods=["GET"])
def get_provider_reviews(provider_id):

    reviews = Review.query.filter_by(provider_id=provider_id).all()

    result = []

    for r in reviews:

        booking = Booking.query.get(r.booking_id)
        customer = User.query.get(booking.customer_id) if booking else None

        result.append({
            "rating": r.rating,
            "comment": r.comment,
            "customer_name": customer.full_name if customer else "Unknown"
        })

    return jsonify(result)


# -----------------------------
# PROVIDER RATING (SUMMARY)
# -----------------------------
@provider_bp.route("/ratings/<provider_id>", methods=["GET"])
def get_provider_rating(provider_id):

    reviews = Review.query.filter_by(provider_id=provider_id).all()

    valid_ratings = [r.rating for r in reviews if r.rating is not None]

    if len(valid_ratings) == 0:
        return jsonify({
            "average": 0,
            "count": 0
        })

    avg = sum(valid_ratings) / len(valid_ratings)

    return jsonify({
        "average": round(avg, 1),
        "count": len(valid_ratings)
    })