export function extractDifficultyMultiplyer(difficulty: string) {
    switch (difficulty) {
      case "hard":
        return 3;
  
      case "medium":
        return 2;
  
      case "easy":
        return 1;
  
      default:
        return 0;
    }
  }
  