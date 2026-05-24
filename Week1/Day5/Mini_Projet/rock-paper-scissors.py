from game import Game

def get_user_menu_choice():
    """Affiche le menu et récupère le choix de l'utilisateur sans boucle."""
    print("\n--- MENU PRINCIPAL ---")
    print("1. Jouer une nouvelle partie")
    print("2. Afficher les scores")
    print("Q. Quitter")
    
    choice = input("Votre choix : ").strip().lower()
    return choice

def print_results(results):
    """Affiche le score cumulé de manière conviviale et remercie le joueur."""
    print("\n=============================")
    print("      RÉSUMÉ DES SCORES      ")
    print("=============================")
    print(f" Victoires : {results['win']}")
    print(f" Défaites  : {results['loss']}")
    print(f" Matchs nuls : {results['draw']}")
    print("=============================")
    print("Merci d'avoir joué ! À bientôt !")

def main():
    """Fonction principale gérant la boucle de l'application."""
    # Initialisation du dictionnaire des scores selon le format requis
    scores = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == "1":
            # Création d'une instance et lancement de la partie
            current_game = Game()
            outcome = current_game.play()
            
            # Mise à jour des scores
            if outcome == "victoire":
                scores["win"] += 1
            elif outcome == "défaite":
                scores["loss"] += 1
            elif outcome == "match nul":
                scores["draw"] += 1
                
        elif choice == "2":
            # Option bonus pour afficher les scores en cours de session
            print(f"\nScores actuels -> Victoires: {scores['win']}, Défaites: {scores['loss']}, Nuls: {scores['draw']}")
            
        elif choice in ["q", "x"]:
            # Sortie de la boucle et affichage final
            print_results(scores)
            break
        else:
            print("Option indisponible. Veuillez choisir 1, 2 ou Q.")

if __name__ == "__main__":
    main()
