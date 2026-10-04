from app import app
import sqlite3
from flask import Flask, request, jsonify

db = sqlite3.connect('server/db/datos.db', check_same_thread=False)
db.row_factory = sqlite3.Row