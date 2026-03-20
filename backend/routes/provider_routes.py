from flask import Blueprint, request, jsonify
from models.user import db
from models.provider_profile import ProviderProfile
from models.review import Review

provider_bp = Blueprint("provider", __name__)


# CREATE PROVIDER PROFILE
@provider_bp.route("/create-profile", methods=["POST"])
def create_provider_profile():

    data = request.get_json()

    user_id = data.get("user_id")
    bio = data.get("bio")
    experience_years = data.get("experience_years")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    service_radius_km = data.get("service_radius_km", 5)

    if not user_id:
        return jsonify({"error": "user_id required"}), 400

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

        return jsonify({
            "error": str(e)
        }), 500


# SEARCH PROVIDERS WITH SMART RANKING
@provider_bp.route("/search", methods=["GET"])
def search_providers():

    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    category_id = int(request.args.get("category_id"))

    providers = ProviderProfile.query.filter_by(is_approved=True).all()

    ranked = []

    for provider in providers:

        distance = ((provider.latitude - latitude)**2 +
                    (provider.longitude - longitude)**2) ** 0.5

        if distance > 0.1:
            continue

        reviews = Review.query.filter_by(provider_id=provider.id).all()

        review_count = len(reviews)

        avg_rating = 0

        if review_count > 0:
            avg_rating = sum(r.rating for r in reviews) / review_count

        experience = provider.experience_years or 0

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
            "score": score
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)

    return jsonify(ranked)


# PROVIDER RATINGS
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