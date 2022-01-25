import blockchain_code
from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
import json

app =  Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

nonceDifficulty = 4
blockchain = blockchain_code.Blockchain(nonceDifficulty)

@app.route('/blockchain', methods=['GET'])
@cross_origin()
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)
    return json.dumps({"length": len(chain_data),
                       "chain": chain_data})

@app.route('/add', methods=['POST'])
def add():
    record = json.loads(request.data)
    for i in range(len(record)):
        blockchain.add_new_transaction(record[i]['transaction'])
    blockchain.mine()
    return json.dumps({"message": "Success"})
app.run(debug=True, port=5000)