import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.diameter = diameter
        else:
            raise ValueError("Vous devez spécifier un rayon (radius) ou un diamètre (diameter).")

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Le rayon ne peut pas être négatif.")
        self._radius = value

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value < 0:
            raise ValueError("Le diamètre ne peut pas être négatif.")
        self._radius = value / 2

    @property
    def area(self):
        return math.pi * (self._radius ** 2)

    def __repr__(self):
        return f"Circle(radius={self._radius:.2f})"

    def __str__(self):
        return f"Cercle de rayon : {self._radius:.2f}, Diamètre : {self.diameter:.2f}, Aire : {self.area:.2f}"

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(radius=self.radius + other.radius)

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return math.isclose(self.radius, other.radius)

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius
