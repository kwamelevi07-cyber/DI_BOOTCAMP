            #  Exercise 1:Convertir des listes en dictionnaires
from curses.ascii import US


keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
dictionnaire = dict(zip(keys, values))
print(dictionnaire)
            # Exercise 2: Cinemax

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
cout_total = 0
for name, age in family.items():
    if age < 3 :
        print(f"le tarif pour{name} est gratuit")
        cout_total += 0
    elif 3<= age < 12:
            print(f"le tarif pour {name} est 10 dollars")
            cout_total += 10
    elif 12 < age:
        print(f"le tarif pour {name} est 15 dollars")
        cout_total += 15
print(f"le cout total pour la famille est de {cout_total} dollars")

                # Exercise 3: Zara

brand = {
       "name": "Zara",
       "creation_date" : "1975",
       "creator_name" : "Amancio_Ortega_Gaona",
       "type_of_clothes" : ["men","women","children","home"],
       "international_competitors" : ["Gap", "H&M", "Benetton"],
       "number_stores" : 7000,
       "major_color" :{"France": "blue",
                           "Spain": "red" ,
                           "US": ["pink", "green"]} }
       
brand["number_stores"]=2
print(f"les clients de Zara sont {brand['type_of_clothes']}")
brand["country_creation"]="Spain"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
del brand["creation_date"]   
print(brand["international_competitors"][-1])
print(brand["major_color"]["US"]) 
print(len(brand))
print(brand.keys())

more_on_zara = {"creation_date": "1955",
                "number_stores":123
                }
brand.update(more_on_zara)
print(brand)

                 #Exercise 4: un peu de geographie

def describe_city(city, country="Inconnu"):
    print(f"{city} est dans {country}.")

describe_city("Paris", "France")
describe_city("Londres", "Royaume-Uni")
describe_city("New York", "États-Unis")
describe_city("Tokyo")

               #Exercise 5: Aleatoire

import random
def random_number(number):
    numbers= random.randint(1, 100)
    for number in numbers:
         if number==number:
            print("Bravo, vous avez reussi le nombre !")
         elif number != number:
            print("Dommage,le nombre est different !")
random_number(10)       

                    #Exercise 6: Creons des t-shirts personnalises


def make_shirt(size, text):
    print(f"Le t-shirt de taille {size} a le texte '{text}' imprimé dessus.")

make_shirt("L", "Je suis enjaillee!")
def make_shirt(size="Large", text="J'adore Python"):
    print(f"Le t-shirt de taille {size} a le texte '{text}' imprimé dessus.")

make_shirt("XXL",text="J'adore python")
make_shirt("M",text="J'adore python")
make_shirt("S",text="J'aime cette tenue")
make_shirt(size="small",text="Hello")

                   #Exercise 7: Conseils sur la temperature 


def get_temperature_temp():
    return random.randint(-10, 40)
def main():
    get_temperature_temp()
    temperature = get_temperature_temp()
    print(f"La température actuelle est de {temperature} degrés Celsius.")
    if temperature < 0:
        print("Brr,il fait un froid de canard! Mets des vetements supplemetaires aujourd'hui.")
    elif 0 <= temperature < 16:
        print("Il fait assez froid. N'oubliez pas votre manteau.")
    elif 16 <= temperature < 23:
        print("Beau temps.")
    elif 24 <= temperature < 32:
        print("Il fait chaud, pensez a bien vous hybrater.")
    elif 32 <= temperature < 40:
        print("Il fait vraiment chaud. Reste au frais")

def get_temperature_temp():
    return random.uniform(-10, 40)                        

mois=input("Entrez le numéro du mois de l'année: ")
if mois in ["1", "2", "3"]:
    print("C'est le printemps, la température est généralement douce.")
elif mois in ["4", "5", "6"]:
    print("C'est l'été, la température est généralement chaude.")
elif mois in ["7", "8", "9"]:
    print("C'est l'automne, la température est généralement fraîche.")
elif mois in ["10", "11", "12"]:
    print("C'est l'hiver, la température est généralement froide.")
def get_temperature_temp(temperature):
    if temperature < 0:
        print("C'est l'hiver")
    elif 0 <= temperature < 16:
        print("C'est l'automne")
    elif 16 <= temperature < 23:
        print("C'est le printemps")
    elif 24 <= temperature < 32:
        print("C'est l'été")
    elif 32 <= temperature < 40:
        print("C'est l'été")

                   #Exercise 8:Garnitures de pizza

ingredients = []
while True:
    ingredient = input("Entrez les ingredients de pizza ou 'quit' pour terminer : ")
    if ingredient.lower() == 'quit':
        break
    ingredients.append(ingredient)
    print(f"ajout de {ingredient} à votre pizza.")
print(f"tous les ingredients de votre pizza sont {ingredients} et le cout total de votre pizza est de {(len(ingredients) * 2.5)+ 10 } dollars.")    


    
