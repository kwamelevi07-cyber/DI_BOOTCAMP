class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'
#Étape 2 : Créer une liste d’instances de chat    
class Siamese(Cat):
    def __init__(self, name, age):
        super().__init__(name, age)
    def sing(self, sounds):
            return f'{sounds}'
    def dance(self, style):
            return f'{style}'
        
class Bengal(Cat):
    def __init__(self, name, age):
        super().__init__(name, age)
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def __init__(self, name, age):
        super().__init__(name, age)
    def sing(self, sounds):
        return f'{sounds}'

all_cats = [Bengal("Sia", 2), Chartreux("Ben", 3), Siamese("Char", 4)]    
#Étape 2 : Créer une liste d’instances de chat  
sara_pets=Pets(all_cats)
#Étape 4 : Emmener les chats en promenade
sara_pets.walk()

                    #Exercise 2 :Chiens

#Étape 1 : Créer la classe Chien
class Dog():
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    def bark(self):
        return (f"{self.name} is barking")
    def run_speed(self):
        return self.weight / self.age * 10
    def fight(self, other_dog):
        if self.run_speed() * self.weight > other_dog.run_speed() * other_dog.weight:
            return f"{self.name} wins the fight against {other_dog.name}"
        elif self.run_speed() * self.weight < other_dog.run_speed() * other_dog.weight:
            return f"{other_dog.name} wins the fight against {self.name}"

#Étape 2 : Créer des instances de chien
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Buddy", 3, 15)
dog3 = Dog("Max", 4, 25)      
#Étape 3 : Méthodes de test sur les chiens
dog1.bark()
dog1.run_speed()
dog1.fight(dog2)
dog2.bark()
dog2.run_speed()
dog2.fight(dog3)
dog3.bark()   
                      #Exercice 3 : Chiens domestiqués
import random
from ExerciseXP.Exercise2 import Dog
class PetDog(Dog):
    def __init__(self, name, age, weight, train):
        super().__init__(name, age, weight)
        self.train = False
    def trained(self):
        self.bark()
        self.train = True    
    def play(self,*args):
        return (f"{', '.join([dog.name for dog in args])} are playing together")    
    def do_a_trick(self):
        tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
        if self.train==True:
            return random.choice(tricks)
#Étape 3 : Tester les méthodes PetDog
my_dog = PetDog("Fido", 2, 10)
my_dog1 = PetDog("Buddy", 3, 15)
my_dog2 = PetDog("Max", 4, 25)
my_dog.trained()
my_dog.play(my_dog1, my_dog2)
my_dog.do_a_trick()     
            
                          #Exercice 4 : Cours en famille et par personne
#Étape 1 : Créer la Personclasse
class Person:
    def __init__(self,first_name,age,last_name):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name
    def is_18(self):
         if self.age >= 18:
             return True
         else:
             return False
#Étape 2 : Créer la Familyclasse
class Family:
    def __init__(self,last_name,members):
        members = []
        self.last_name = last_name
        self.members = members
    def born(self,first_name,age):
        new_person=Person(first_name,age,self.last_name)
        self.members.append(new_person)
    def check_majority(self,first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    return (f"You are 18 or older, you can go out with your friends")
                else:
                   return (f"Sorry, you are not allowed to go out with your friends.")
    def family_presentation(self):
        print(f'your last name is {self.last_name}')   
        for member in self.members:
            print(f'your first name is {member.first_name} and your age is {member.age}')     