import requests
from bs4 import BeautifulSoup
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def get_ozon_price(url):
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        price_element = soup.find('span', {'class': 'l3z_28 zl1_28'})
        
        if price_element:
            return price_element.text.strip().replace('\u202f', '')
        return 'Price not found'
    except Exception as e:
        return f'Error: {str(e)}'

if __name__ == '__main__':
    product_url = 'https://www.ozon.ru/product/ruchnoy-otparivatel-philips-sth3000-20-888633176/'
    while True:
        price = get_ozon_price(product_url)
        print(f'[{time.strftime("%H:%M:%S")}] Current price: {price}')
        time.sleep(300)
