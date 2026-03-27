from flask import Blueprint, request, jsonify
from models.user import db
from models.provider_profile import ProviderProfile
from models.review import Review
import math
from models.user import User

provider_bp = Blueprint("provider", __name__)


# -----------------------------
# HAVERSINE DISTANCE FUNCTION
# -----------------------------
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

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

    # 🔒 Prevent duplicate profiles
    existing_profile = ProviderProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify({
            "error": "Provider profile already exists for this user"
        }), 400

    bio = data.get("bio")
    experience_years = data.get("experience_years")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    service_radius_km = data.get("service_radius_km", 5)

    try:
        profile = ProviderProfile(
            user_id=user_id,
            bio=bio,
            experience_years=experience_years,
            latitude=latitude,
            longitude=longitude,
            service_radius_km=service_radius_km
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

    profile = ProviderProfile.query.filter_by(user_id=user_id).first()

    if not profile:
        return jsonify({"status": "NOT_CREATED"})

    if not profile.is_approved:
        return jsonify({"status": "PENDING"})

    return jsonify({"status": "APPROVED"})


# -----------------------------
# SEARCH PROVIDERS (SMART RANKING + DISTANCE)
# -----------------------------
@provider_bp.route("/search", methods=["GET"])
def search_providers():

    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    category_id = int(request.args.get("category_id"))

    providers = ProviderProfile.query.filter_by(is_approved=True).all()

    ranked = []

    for provider in providers:

        # 📍 Accurate distance
        distance = haversine(latitude, longitude, provider.latitude, provider.longitude)

        # Filter within radius (optional)
        if distance > (provider.service_radius_km or 5):
            continue

        reviews = Review.query.filter_by(provider_id=provider.id).all()

        review_count = len(reviews)

        avg_rating = 0
        if review_count > 0:
            avg_rating = sum(r.rating for r in reviews) / review_count

        experience = provider.experience_years or 0

        # 🤖 Smart ranking formula
        score = (
            0.5 * avg_rating +
            0.2 * experience +
            0.2 * review_count -
            0.1 * distance
        )

        ranked.append({
            "provider_id": provider.id,
            "bio": provider.bio,
            "experience": experience,
            "latitude": provider.latitude,
            "longitude": provider.longitude,
            "rating": round(avg_rating, 1),
            "reviews": review_count,
            "distance": round(distance, 2),
            "score": score
        })

    # Sort by best providers first
    ranked.sort(key=lambda x: x["score"], reverse=True)

    return jsonify(ranked)


# -----------------------------
# PROVIDER RATINGS
# -----------------------------
@provider_bp.route("/ratings/<provider_id>", methods=["GET"])
def get_provider_rating(provider_id):

    reviews = Review.query.filter_by(provider_id=provider_id).all()

    if len(reviews) == 0:
        return jsonify({
            "average": 0,
            "count": 0
        })

    total = sum(r.rating for r in reviews)
    avg = total / len(reviews)

    return jsonify({
        "average": round(avg, 1),
        "count": len(reviews)
    })

@provider_bp.route("/details/<provider_id>", methods=["GET"])
def provider_details(provider_id):

    provider = ProviderProfile.query.get(provider_id)
    user = User.query.get(provider.user_id)

    reviews = Review.query.filter_by(provider_id=provider.id).all()

    avg = 0
    if len(reviews) > 0:
        avg = sum(r.rating for r in reviews) / len(reviews)

    return jsonify({
        "name": user.full_name,
        "bio": provider.bio,
        "experience": provider.experience_years,
        "rating": round(avg, 1),
        "reviews": len(reviews),
        "phone": user.phone
    })