# itacasa

## Environment Variables
The project requires `.env` files for configuration: one for Docker (`./`) and one for the backend (`./itacasa-backend/`).

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/TonyALima/itacasa.git
    ```
2. Navigate to the project directory:
    ```bash
    cd itacasa
    ```
3. Set all `.env` files.
4. Build the Docker containers:
    ```bash
    docker-compose build
    ```

## Usage
1. Start the project:
    ```bash
    docker-compose up -d
    ```