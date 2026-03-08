from flask import Blueprint, jsonify
from models.user import db
from models.provider_profile import ProviderProfile

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/approve-provider/<provider_id>", methods=["PUT"])
def approve_provider(provider_id):

    provider = ProviderProfile.query.get(provider_id)

    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    provider.is_approved = True
    db.session.commit()

    return jsonify({"message": "Provider approved successfully"})