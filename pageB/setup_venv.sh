#!/bin/bash

# Check if virtual environment directory exists
if [ ! -d "venv" ]; then
	# Create a virtual environment
	python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt
