from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_cors.core import try_match
from flask_mysqldb import MySQL
import os
import datetime

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})


try:
    app.config['MYSQL_HOST'] = os.environ['MYSQL_HOST']
    app.config['MYSQL_USER'] = os.environ['MYSQL_USER']
    app.config['MYSQL_PASSWORD'] = os.environ['MYSQL_PASSWORD']
    app.config['MYSQL_DB'] = os.environ['MYSQL_DB']
except:
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'finances'


mysql = MySQL(app)


#Testing Route
@app.route('/', methods=['GET'])
def getDefault():
    return jsonify({'response': 'Welcome to my financial app!'})

@app.route('/insertBill', methods=['POST'])
def insertarBill():
    #mysql data
    fecha = request.json['date']
    fecha = fecha.split("/")[2]+"-"+fecha.split("/")[1]+"-"+fecha.split("/")[0]
    description = request.json['description']
    amount = request.json['amount']
    category = request.json['category']
    
    cur = mysql.connection.cursor()

    cur.execute("INSERT INTO bills (date, description, amount, category) VALUES (%s, %s, %s, %s)", (fecha, description, amount, category))
    mysql.connection.commit()
    return jsonify({'message': "Inserted correctly"})
    
@app.route('/bills', methods=['GET'])
def getBills():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM bills')
    data = cur.fetchall()
    res = []
    for i in data:
        fecha = str(i[1]).split("-")[2]+"/"+str(i[1]).split("-")[1]+"/"+str(i[1]).split("-")[0]
        res.append({"id": i[0], "date": fecha, "description": i[2], "amount": i[3], "category": i[4]})
    return res

@app.route('/billsByCategory/<string:category>', methods=['GET'])
def getBillsCategory(category):
    cur = mysql.connection.cursor()
    cur.execute(f"SELECT * FROM bills WHERE category = '{category}'")
    data = cur.fetchall()
    res = []
    for i in data:
        res.append({"date": i[1], "description": i[2], "amount": i[3], "category": i[4]})
    return res

@app.route('/searchByDate/<string:date>', methods=['GET'])
def searchByDate(date):
    cur = mysql.connection.cursor()
    cur.execute(f"SELECT * FROM bills WHERE date = '{date}'")
    data = cur.fetchall()
    res = []
    for i in data:
        res.append({"date": i[1], "description": i[2], "amount": i[3], "category": i[4]})
    return res

@app.route('/insertCategory', methods=['POST'])
def insertCategory():
    #mysql data
    category = request.json['category']
    
    cur = mysql.connection.cursor()

    cur.execute(f"INSERT INTO categories (category) VALUES ('{category}')")
    mysql.connection.commit()
    return jsonify({'message': "Inserted correctly"})

@app.route('/categories', methods=['GET'])
def getCategories():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM categories')
    data = cur.fetchall()
    res = []
    for i in data:
        res.append({"category": i[1]})
    return res

if __name__ == '__main__':
    app.run(debug=True)