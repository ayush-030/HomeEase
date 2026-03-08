from .user import db
import uuid

class ProviderService(db.Model):
    __tablename__ = "provider_services"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))

    provider_id = db.Column(db.String, db.ForeignKey("provider_profiles.id"))
    category_id = db.Column(db.Integer, db.ForeignKey("service_categories.id"))

    base_price = db.Column(db.Float)