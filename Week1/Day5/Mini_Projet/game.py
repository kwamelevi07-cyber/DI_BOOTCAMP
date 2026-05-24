import random
class Game:
    def __init__(self):
        self.user_items = None
        self.computer_items = None

    def get_user_items(self):
        self.user_items = input("Entrer un element (pierre, papier, ciseaux) : ").strip().lower()
        
        while self.user_items not in ["pierre", "papier", "ciseaux"]:
            if self.user_items == "":
                print("Vous devez entrer un element pour jouer.")
            else:
                print("Element invalide. Veuillez entrer pierre, papier ou ciseaux.")
            
            self.user_items = input("Entrer un element (pierre, papier, ciseaux) : ").strip().lower()
            
        return self.user_items
    def get_computer_items(self):
        import random
        self.computer_items = random.choice(["pierre", "papier", "ciseaux"])
        return self.computer_items
    
    def get_game_result(self, user_items, computer_items):
        if user_items == computer_items:
            return "Egalité !"
        elif (user_items == "pierre" and computer_items == "ciseaux") or (user_items == "papier" and computer_items == "pierre") or (user_items == "ciseaux" and computer_items == "papier"):
            return "Vous avez gagné !"
        else:
            return "L'ordinateur a gagné !"
    
    def play(self):
        # 1. Récupérer l'élément de l'utilisateur
        user_choice = self.get_user_items()
        
        # 2. Tirer un objet au hasard pour l'ordinateur
        self.computer_items = random.choice(["pierre", "papier", "ciseaux"])
        # 3. Déterminer les résultats et afficher le message
        if user_choice == self.computer_items:
            result_message = "match nul !"
            result_code = "match"
        elif (user_choice == "pierre" and self.computer_items == "ciseaux") or \
             (user_choice == "papier" and self.computer_items == "pierre") or \
             (user_choice == "ciseaux" and self.computer_items == "papier"):
            result_message = "Vous avez gagné !"
            result_code = "victoire"
        else:
            result_message = "Vous avez perdu."
            result_code = "défaite"
            
        # Affichage du résultat demandé
        print(f"Vous avez choisi {user_choice}. L'ordinateur a choisi {self.computer_items}. {result_message}")
        
        # 4. Renvoi du résultat sous forme de chaîne de caractères
        return result_code
    