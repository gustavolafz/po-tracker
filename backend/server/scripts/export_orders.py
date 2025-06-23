# server\scripts\export_orders.py

import requests
import json

BASE_URL = "http://localhost:5000/api/orders"

def export_all_orders(output_path="orders.json"):
    all_orders = []
    limit = 100
    offset = 0

    while True:
        params = {
            "limit": limit,
            "offset": offset
        }
        response = requests.get(BASE_URL, params=params)

        if response.status_code != 200:
            print(f"Erro: {response.status_code} - {response.text}")
            break

        data = response.json()
        all_orders.extend(data["orders"])

        if offset + limit >= data["total"]:
            break
        offset += limit

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_orders, f, indent=2, ensure_ascii=False)

    print(f"✅ Exportação concluída: {output_path} ({len(all_orders)} pedidos)")

if __name__ == "__main__":
    export_all_orders()
