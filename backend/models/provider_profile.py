from .user import db
import uuid

class ProviderProfile(db.Model):
    __tablename__ = "provider_profiles"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)

    bio = db.Column(db.Text)
    experience_years = db.Column(db.Integer)

    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    service_radius_km = db.Column(db.Integer, default=5)
    is_approved = db.Column(db.Boolean, default=False)