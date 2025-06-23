# server/core/validation_middleware.py
# Description: This file contains the validation middleware for Flask API using Pydantic.

from functools import wraps 
from flask import request, jsonify
from pydantic import ValidationError

def validate_json(schema):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                data = schema(**request.json)
            except ValidationError as e:
                return jsonify({'error': 'validation error', 'details': str(e)}), 400
            return func(data, *args, **kwargs)
        return wrapper 
    return decorator
