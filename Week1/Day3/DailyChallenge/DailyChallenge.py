class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, **kwargs):
        for animal_type, count in kwargs.items():
            if animal_type in self.animals:
                self.animals[animal_type] += count
            else:
                self.animals[animal_type] = count

    def get_info(self):
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        info += "\n    E-I-E-I-0!"
        return info

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animals = self.get_animal_types()
        named = [
            a + "s" if self.animals[a] > 1 else a
            for a in animals
        ]
        if len(named) > 1:
            listed = ", ".join(named[:-1]) + " and " + named[-1]
        else:
            listed = named[0]
        return f"{self.name}'s farm has {listed}."


# --- Test ---
macdonald = Farm("McDonald")
macdonald.add_animal(cow=5, sheep=2, goat=12)

print(macdonald.get_info())
print()
print(macdonald.get_short_info())
print()
print("Animal types:", macdonald.get_animal_types())