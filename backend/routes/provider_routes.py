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

    if not user_id:
        return jsonify({"error": "user_id required"}), 400

    profile = ProviderProfile(
        user_id=user_id,
        bio=bio,
        experience_years=experience_years,
        latitude=latitude,
        longitude=longitude
    )

    db.session.add(profile)
    db.session.commit()

    return jsonify({"message": "Provider profile created (pending admin approval)"})


# SEARCH PROVIDERS
@provider_bp.route("/search", methods=["GET"])
def search_providers():

    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    category_id = int(request.args.get("category_id"))

    providers = ProviderProfile.query.filter_by(is_approved=True).all()

    results = []

    for provider in providers:

        distance = ((provider.latitude - latitude)**2 +
                    (provider.longitude - longitude)**2) ** 0.5

        if distance <= 0.1:

            results.append({
                "provider_id": provider.id,
                "bio": provider.bio,
                "experience": provider.experience_years,
                "latitude": provider.latitude,
                "longitude": provider.longitude
            })

    return jsonify(results)


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