from models.user import db
import uuid

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    booking_id = db.Column(db.String, nullable=False)
    
    
    provider_id = db.Column(db.String, nullable=False)

    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)