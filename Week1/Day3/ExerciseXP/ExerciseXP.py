        #Exercise 1: Cats
#Step 1: Create Cat Objects
class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age
cat1 = Cat("Milou", 3)    
cat2 = Cat("Doudou", 5)    
cat3 = Cat("Kouadio", 2)

#Step 2: Create a Function to Find the Oldest Cat
def find_oldest_cat(cat1, cat2, cat3):
    oldest_cat = max([cat1, cat2, cat3], key=lambda cat: cat.age)
    return oldest_cat.name

#Step 3: Print the Oldest Cat’s Details
find_oldest_cat(cat1, cat2, cat3)
print(f"le chat le plus age est {find_oldest_cat.name} , et a {find_oldest_cat.age} ans")

                       #Exercise 2 : Dogs

#Step 1: Create the Dog Class
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    def bark(self):
        print(f"{self.name} goes Woof!")
    def jump(self):
        print(f"{self.name} jumps {self.height*2}cm high!")
#Step 2: Create Dog Objects
davids_dog = Dog("Rex", 5)
sarahs_dog = Dog("Buddy", 3)
#Step 3: Print Dog Details and Call Methods
print(f"{davids_dog.name} is {davids_dog.height}cm tall.")                
print(f"{sarahs_dog.name} is {sarahs_dog.height}cm tall.")
davids_dog.bark()
sarahs_dog.bark()
davids_dog.jump()
sarahs_dog.jump()
#Compare Dog Sizes
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger than {sarahs_dog.name}.")
else:
    print(f"{sarahs_dog.name} is bigger than {davids_dog.name}.")

                 #Exercise 3 : Who’s the song producer?

#Step 1: Create the Song Class
class Song:
    def __init__(self, lyrics):
        lyrics = []
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

                #Exercise 4 : Afternoon at the Zoo

#Step 1: Define the Zoo Class
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
    def get_animals(self):
        return self.animals
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        regrouped_animals = {}
        for animal in sorted_animals:
            first_letter = animal[0]
            if first_letter not in regrouped_animals:
                regrouped_animals[first_letter] = []
            regrouped_animals[first_letter].append(animal)
        return regrouped_animals
    def get_groups(self):
        print(self.sort_animals())

#Step 2: Create a Zoo Object
Zoo1 = Zoo("zoo_de_bouake")
Zoo1.add_animal("Lion")
Zoo1.add_animal("Zebra")
Zoo1.get_animals("Monkey")
Zoo1.sell_animal("Lion")
Zoo1.get_groups()
Zoo1.get_animals("Monkey")
#Bonus
def add_animal(self,*args):
    for new_animal in args:
        if new_animal not in self.animals:
            self.animals.append(new_animal)
        else:
            print(f"{new_animal} is already in the zoo.")

