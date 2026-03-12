from flask import Blueprint, request, jsonify
from models.user import db, User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    email = data.get("email")
    full_name = data.get("full_name")
    phone = data.get("phone")
    role = data.get("role")

    if not email or not role:
        return jsonify({"error": "Email and role required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(
        email=email,
        full_name=full_name,
        phone=phone,
        role=role
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

@auth_bp.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()

    result = []

    for u in users:
        result.append({
            "id": u.id,
            "email": u.email,
            "role": u.role
        })

    return jsonify(result)