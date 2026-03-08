from .user import db
import uuid

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))

    customer_id = db.Column(db.String, db.ForeignKey("users.id"))
    provider_id = db.Column(db.String, db.ForeignKey("provider_profiles.id"))
    category_id = db.Column(db.Integer, db.ForeignKey("service_categories.id"))

    booking_date = db.Column(db.Date)
    booking_time = db.Column(db.Time)

    status = db.Column(
        db.Enum("PENDING","ACCEPTED","REJECTED","COMPLETED","CANCELLED", name="booking_status"),
        default="PENDING"
    )