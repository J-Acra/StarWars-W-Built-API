"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Favorite
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    gender = request.json.get("gender", None)
    user = User(email=email, password=password, gender=gender)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize())

@api.route('/character', methods=['GET'])
def get_character():
    character_query = Character.query.all()
    all_serialized_characters = list(map(lambda item:item.serialize(), character_query))
    return jsonify(all_serialized_characters)

@api.route('/planet', methods=['GET'])
def get_planet():
    planet_query = Planet.query.all()
    all_serialized_planets = list(map(lambda item:item.serialize(), planet_query))
    return jsonify(all_serialized_planets)

@api.route('/planet', methods=['POST'])
def create_planet():
    name = request.json.get('name', None)
    climate = request.json.get('climate', None)
    rotation_period = request.json.get('rotation_period', None)
    orbital_period = request.json.get('orbital_period', None)
    diameter = request.json.get('diameter', None)
    terrain = request.json.get('terrain', None)
    population = request.json.get('population', None)
    img_url = request.json.get('img_url', None)
    
    planet = Planet(name=name,
                    climate=climate,
                    rotation_period=rotation_period,
                    orbital_period=orbital_period,
                    diameter=diameter,
                    terrain=terrain,
                    population=population, 
                    img_url=img_url)
    db.session.add(planet)
    db.session.commit()
    return jsonify(planet.serialize())

@api.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    user_id = request.json.get('user', None)
    planets_id = request.json.get('planet', None)
    character_id = request.json.get('character', None)
    duplicate = Favorite.query.filter_by(user_id=user_id,planets_id=planets_id,character_id=character_id).first()
    favorite = Favorite(
        user_id=user_id,
        planets_id=planets_id,
        character_id=character_id)
    if duplicate is None:
        db.session.add(favorite)
        db.session.commit()
        return jsonify(favorite.serialize())
    
    return jsonify({"msg":"Duplicated Detected"}), 400

@api.route('/favorite', methods=['GET'])
@jwt_required()
def get_favorite():
    current_user_id=get_jwt_identity()
    user = User.query.get(current_user_id)
    favorite_query = Favorite.query.filter_by(user_id=user.id)
    all_serialized_favorite = list(map(lambda item:item.serialize(), favorite_query))
    return jsonify(all_serialized_favorite)

@api.route("/token", methods=["POST"])
def create_token():
    if request.json is None:
        return jsonify({"msg": "Body Empty!"}), 401
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "User not found!"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })