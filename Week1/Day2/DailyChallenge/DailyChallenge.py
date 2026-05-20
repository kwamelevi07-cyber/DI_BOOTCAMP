             # Defi 1 quotidien - Jour 2 : Dictionnaire d'index des lettres 

mot = input("saisissez un mot : ")
dictionnaire = {}
for index, lettre in enumerate(mot):
    if lettre in dictionnaire:
        dictionnaire[lettre].append(index)
    else:
        dictionnaire[lettre] = [index]
print(dictionnaire)

# Defi 2 quotidien - Jour 2 : Articles abordables 

items_purchase = {"Water": "$1", "Bread": "$3", "TV": "$1,000", "Fertilizer": "$20"}
wallet = "$300"

wallet_amount = int(wallet.replace("$", "").replace(",", ""))
basket = []

for item, price in items_purchase.items():
    
    item_price = int(price.replace("$", "").replace(",", ""))
    if item_price <= wallet_amount:
        basket.append(item)
        wallet_amount -= item_price 

if len(basket) == 0:
    print("Nothing")
else:
    print(sorted(basket))     

