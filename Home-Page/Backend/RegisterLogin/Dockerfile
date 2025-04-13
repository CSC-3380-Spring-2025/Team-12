FROM python:3.13.2

WORKDIR /code

# Install system dependencies
RUN apt-get update && \
    apt-get install -y libmariadb-dev-compat gcc && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . /code/