from flask import Flask, render_template, jsonify,request
from flask_cors import CORS
import requests


app=Flask(__name__)

CORS(app)

#Devolvemos el template html
@app.route("/")
def home():
    return render_template("index.html")


#Obtenemos por ip la ubicacion
@app.route("/location",methods=["GET"])

def ubicacion():
    
    lugar=requests.get("http://ip-api.com/json/").json()
    return jsonify(lugar)


#Obtenemos la ciudad del front y enviamos datos
@app.route("/info",methods=["POST"])

def datos():
    data=request.get_json()
    ciudad=data["city"]
    url = f"https://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid=04f2d60f588a23246440ab1492f34599&units=metric&lang=es"
    response = requests.get(url)  
    weather_data = response.json()

    return jsonify(weather_data) 



if __name__=="__main__":
    app.run(debug=True)







