from flask import Flask, render_template
from flask_jsglue import JSGlue

app = Flask(__name__)
JSGlue(app)


@app.route("/")
def hello():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
