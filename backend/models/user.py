from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    full_name = db.Column(db.String(255))
    phone = db.Column(db.String(20))

    role = db.Column(
        db.Enum("CUSTOMER", "PROVIDER", "ADMIN", name="user_roles"),
        nullable=False
    )
    password = db.Column(db.String, nullable=False)
    status = db.Column(
        db.Enum("ACTIVE", "PENDING", "BLOCKED", name="user_status"),
        default="ACTIVE"
    )

    created_at = db.Column(db.DateTime)