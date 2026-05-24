import random

class Game:
    def get_user_item(self):
        """Demande et valide le choix de l'utilisateur."""
        choices = ["pierre", "feuille", "ciseaux"]
        while True:
            user_choice = input("Choisissez pierre, feuille ou ciseaux : ").strip().lower()
            if user_choice in choices:
                return user_choice
            print("Choix invalide. Veuillez réessayer.")

    def get_computer_item(self):
        """Sélectionne aléatoirement un élément pour l'ordinateur."""
        choices = ["pierre", "feuille", "ciseaux"]
        return random.choice(choices)

    def get_game_result(self, user_item, computer_item):
        """Détermine le résultat du match du point de vue de l'utilisateur."""
        if user_item == computer_item:
            return "match nul"
        
        # Conditions de victoire pour l'utilisateur
        win_conditions = {
            "pierre": "ciseaux",
            "feuille": "pierre",
            "ciseaux": "feuille"
        }
        
        if win_conditions[user_item] == computer_item:
            return "victoire"
        else:
            return "défaite"

    def play(self):
        """Exécute une manche complète et affiche le résultat."""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        # Affichage du résultat formaté
        if result == "match nul":
            print(f"Vous avez choisi {user_item}. L'ordinateur a choisi {computer_item}. Vous avez fait match nul !")
        else:
            print(f"Vous avez choisi {user_item}. L'ordinateur a choisi {computer_item}. Vous avez {result} !")
            
        return result
