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