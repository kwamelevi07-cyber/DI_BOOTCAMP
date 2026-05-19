         #  Defi 1

number = input("Entrez un nombre: ")
number = int(number)        
length = int(input("Entrez la longueur: "))
list = list(range(1, length + 1))
list_multiplied = [x * number for x in list]
print(list_multiplied)

           #Defi 2

chaine = input("Entrez une chaîne : ")

resultat = ""

for i in range(len(chaine)):
    if i == 0 or chaine[i] != chaine[i - 1]:
        resultat += chaine[i]

print("Nouvelle chaîne :", resultat)          