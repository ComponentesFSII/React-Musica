from flask import Flask

app = Flask('api')
app.json.ensure_ascii = False