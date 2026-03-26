from flask import Blueprint, request, jsonify
from models.user import db, User
import bcrypt

auth_bp = Blueprint("auth", __name__)


# ---------------- REGISTER ----------------
@auth_bp.route("/register", methods=["POST"])
def register_user():

    data = request.get_json()

    email = data.get("email").strip().lower()
    full_name = data.get("full_name")
    phone = data.get("phone")
    role = data.get("role")
    password = data.get("password")

    if not email or not role or not password:
        return jsonify({"error": "Email, role, and password required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # 🔐 Hash password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    new_user = User(
        email=email,
        full_name=full_name,
        phone=phone,
        role=role,
        password=hashed_password.decode("utf-8")
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "role": new_user.role
        }
    })


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login_user():

    data = request.get_json()

    email = data.get("email").strip().lower()
    password = data.get("password")

    from models.user import db, User
    import bcrypt

    user = User.query.filter(db.func.lower(User.email) == email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({"error": "Invalid password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    })