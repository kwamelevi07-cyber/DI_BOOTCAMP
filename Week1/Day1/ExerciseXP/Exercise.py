          #exercise 1


a = 1
while a <5:
    print("hello world")
    a = a + 1

    #exercise 2

a = 99
a = a**3
a = a * 8
print(a)

    #exercise 3

5 < 3 #False
3 == 3 #True
3 == "3" #False
"3" > 3 #False
"Hello" == "hello" #False 
    #exercise 4

computer_brand = "HP_EliteBook_840_G3"
print ( f" I have a {computer_brand} computer" )

    #exercise 5

name = " KOFFI "
age = 24
shoe_size = 42
info = "Bonjour tout le monde, je m'appelle " + name + " j'ai " + str(age) + " ans et ma pointure est " + str(shoe_size)
print(info)


       #exercise 6

a = 12
b = 5
if a > b:
    print("Hello World")    

            #exercise 7

a = input("Entrez un nombre: ")
a = int(a)
if a % 2 == 0:
    print("Le nombre est pair")
else:           
    print("Le nombre est impair")

            #exercise 8


name = input("Entrez votre nom: ")
if name == "KOFFI":
    print("Bonjour chez maitre comment vas-tu ? mon jumeau")
else:
    print("Bonjour " + name + " ta vieille tete la ?")    

            #exercise 9

    taille = input("Entrez votre taille en cm: ")
taille = int(taille)
if taille > 145:
    print("Vous êtes assez grand pour monter à cheval")
else:
    print("Vous n'êtes pas assez grand pour monter à cheval, vous devez grandir un peu plus")        