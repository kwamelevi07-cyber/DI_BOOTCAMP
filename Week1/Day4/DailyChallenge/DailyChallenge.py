                       #DailyChallenge Day4
#Étape 1 : Créer la Paginationclasse

import math


class pagination:
#Étape 2 : Implémenter la __init__méthode
    def __init__(self, items=None, page_size=10):
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / self.page_size)
#Étape 3 : Mettre en œuvre la get_visible_items()méthode
    def get_visible_items(self):
        start_index = self.current_idx * self.page_size
        end_index = start_index + self.page_size
        return self.items[start_index:end_index]
#Étape 4 : Implémenter les méthodes de navigation    

    def go_to_page(self, page_num):
        if 0 <= page_num < self.total_pages:
            self.current_idx = page_num
        elif page_num < 0:
            self.current_idx = 0
        elif page_num >= self.total_pages:
            print("Exception ValueError: Page number is out of bounds")
                    
    def next_page(self):
        if (self.current_idx + 1) * self.page_size < len(self.items):
            self.current_idx += 1

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1

    def first_page(self):
        self.current_idx = 0

    def last_page(self):
        self.current_idx = (len(self.items) - 1) // self.page_size
    def __str__(self):
       visible_items = self.get_visible_items()  
       strings = [str(item) for item in visible_items]
       return "\n".join(strings)

#Étape 6 : Testez votre code

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = pagination(alphabetList, 4)
print(p.get_visible_items())
p.next_page()
print(p.get_visible_items())
p.last_page()
print(p.get_visible_items())
p.go_to_page(10)
print(p.current_idx + 1)
p.go_to_page(0)

                       
                        