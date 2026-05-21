#DailyChallenge Day 3
#Step 1: Create the Farm Class
class Farm:
    def __init__(self,Farm_name):
        self.name = Farm_name
        self.animals = {}
#Step 8: upgrade the add_animal Method        
    def add_animal(self, **kwargs):
        count=1
        for animal_type, count in kwargs.items():
          if animal_type in self.animals:
             count += 1
          else:
            count = 1
#Step 4: Implement the get_info Method            
    def get_info(self):
        print(f"{self.name} has:")
        for animal, count in self.animals.items():
            print(f"{count} {animal}")
        print("E-I-E-I-0!")
#Step 6: Implement the get_animal_types Method
    def get_animal_types(self):
      return sorted(self.animals.keys())  
#Step 7: Implement the get_short_info Method
    def get_short_info(self):
        print("McDonald's farm has cows,goats and sheeps.") 
             
#Step 5: Test Your Code
farm1=Farm("McDonald's")
farm1.add_animal("cow",1)
farm1.add_animal("chicken",7)
farm1.add_animal("pig",3)
farm1.get_info()
farm1.get_animal_types()
for animal, count in farm1.animals.items():
    if count > 1:
        print(f"{count} {animal}s")



