from .user import db
import uuid

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))

    booking_id = db.Column(db.String, db.ForeignKey("bookings.id"))
    customer_id = db.Column(db.String, db.ForeignKey("users.id"))
    provider_id = db.Column(db.String, db.ForeignKey("provider_profiles.id"))

    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)

    created_at = db.Column(db.DateTime)