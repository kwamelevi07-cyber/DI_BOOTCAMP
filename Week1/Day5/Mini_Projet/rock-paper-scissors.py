                 #Partie II - pierre-papier-ciseaux.py
from Week1.Day5.Mini_Projet.game import Game

def get_user_menu_choice():
    print("Menu :")
    print("1. Jouer au jeu")
    print("2. Quitter")
    
    choice = input("Entrez votre choix (1 ou 2) : ").strip()
    
    if choice == "1":
        return "play"
    elif choice == "2":
        return "quit"
    
    return choice

def print_results(results):
    results = {
        "win":2,
        "loss":4,
        "draw":3
    }
    print("Merci pour votre participation !")
    print("Résultats :")

def main():
    while True:
        get_user_menu_choice()
        user_choice = get_user_menu_choice()
        if user_choice == "play":
            print("Le jeu commence !")
        elif user_choice == "quit":
            print("Au revoir !")
            break
        else:
            print("Choix invalide. Veuillez entrer 1 pour jouer ou 2 pour quitter.")
    Joueur_1 = Game()
    Joueur_1.play()
    print_results(Joueur_1)