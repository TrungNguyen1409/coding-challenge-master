#!/bin/bash
cd python-backend
python3 -m venv virtual-env
source virtual-env/bin/activate
pip3 install -r requirements.txt
python3 server.py
