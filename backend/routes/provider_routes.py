from flask import Blueprint, request, jsonify
from models.user import db
from models.provider_profile import ProviderProfile

provider_bp = Blueprint("provider", __name__)

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

@provider_bp.route("/search", methods=["GET"])
def search_providers():

    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    category_id = int(request.args.get("category_id"))

    providers = ProviderProfile.query.filter_by(is_approved=True).all()

    results = []

    for provider in providers:

        distance = ((provider.latitude - latitude)**2 + (provider.longitude - longitude)**2) ** 0.5

        if distance <= 0.1:   # basic radius filtering

            results.append({
                "provider_id": provider.id,
                "bio": provider.bio,
                "experience": provider.experience_years
            })

    return jsonify(results)