from flask import Blueprint, jsonify
from models.user import db
from models.provider_profile import ProviderProfile
from models.user import User
from models.provider_profile import ProviderProfile
from models.booking import Booking

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/approve-provider/<provider_id>", methods=["PUT"])
def approve_provider(provider_id):

    provider = ProviderProfile.query.get(provider_id)

    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    provider.is_approved = True
    db.session.commit()

    return jsonify({"message": "Provider approved successfully"})

@admin_bp.route("/providers", methods=["GET"])
def get_providers():

    providers = ProviderProfile.query.all()

    result = []

    for p in providers:
        result.append({
            "id": p.id,
            "user_id": p.user_id,
            "bio": p.bio,
            "experience": p.experience_years,
            "approved": p.is_approved
        })

    return jsonify(result)

@admin_bp.route("/stats", methods=["GET"])
def platform_stats():

    total_users = User.query.count()
    total_providers = ProviderProfile.query.count()
    total_bookings = Booking.query.count()

    return jsonify({
        "users": total_users,
        "providers": total_providers,
        "bookings": total_bookings
    })