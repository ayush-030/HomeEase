from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from sqlalchemy import text
from models.user import db
from models.provider_profile import ProviderProfile
from models.service_category import ServiceCategory
from models.provider_service import ProviderService
from models.booking import Booking
from models.review import Review
from routes.auth_routes import auth_bp
from routes.provider_routes import provider_bp
from routes.admin_routes import admin_bp
from routes.booking_routes import booking_bp
from routes.review_routes import review_bp
from routes.chat_routes import chat_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(provider_bp, url_prefix="/provider")
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(booking_bp, url_prefix="/booking")
app.register_blueprint(review_bp, url_prefix="/review")
app.register_blueprint(chat_bp, url_prefix="/chat")

@app.route("/")
def home():
    return {"message": "HomeEase Backend Running"}

@app.route("/test-db")
def test_db():
    try:
        db.session.execute(text("SELECT 1"))
        return {"message": "Database connected successfully"}
    except Exception as e:
        return {"error": str(e)}    

if __name__ == "__main__":
    app.run()