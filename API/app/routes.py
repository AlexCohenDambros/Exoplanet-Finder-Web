from flask import Blueprint, jsonify

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    return jsonify({'message': 'Bem-vindo ao meu projeto Flask!'})


@bp.route('/generategraph/{id}')
def generate_graph(id):
    return machinelearning.generate(id)