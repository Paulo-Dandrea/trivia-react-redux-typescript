const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const LOCAL_STORAGE_STATE_KEY = 'player';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';
const FEEDBACK_TEXT_SELECTOR = '[data-testid="feedback-text"]';

const BUTTON_SETTINGS_SELECTOR = '[data-testid="btn-settings"]';
const SETTINGS_TITLE_SELECTOR = '[data-testid="settings-title"]';
const TOKEN_KEY = 'token';

const name = 'Nome da pessoa';
const email = 'email@pessoa.com';

const name1 = 'Nome da pessoa';
const email1 = 'email@pessoa.com';

const name2 = 'Outra pessoa';
const email2 = 'outra@pessoa.com';

const name3 = 'Mais uma pessoa';
const email3 = 'mais@pessoa.com';

const LOCAL_STORAGE_RANKING_KEY = 'ranking';
const BUTTON_RANKING_SELECTOR = '[data-testid="btn-ranking"]';
const RANKING_TITLE_SELECTOR = '[data-testid="ranking-title"]';
const RANKING_PLAYERS_NAME_SELECTOR = '[data-testid*="player-name"]';
const BUTTON_GO_HOME_SELECTOR = '[data-testid="btn-go-home"]';

const FEEDBACK_TOTAL_SCORE_SELECTOR = '[data-testid="feedback-total-score"]';
const FEEDBACK_TOTAL_QUESTION_SELECTOR = '[data-testid="feedback-total-question"]';
const BUTTON_PLAY_AGAIN_SELECTOR = '[data-testid="btn-play-again"]';

// game

describe('_Header_ must contain player info', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_NAME_SELECTOR);
  });

  it('the Gravatar image should be on the _Header_', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('the player namer should be on the _Header_', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('the initial score should be on the _Header_', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});

describe('Page should contain all info related to the question', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('category should be present', () => {
    cy.get(QUESTION_CATEGORY_SELECTOR).should('exist');
  });

  it('all answers should be present', () => {
    cy.get(QUESTION_TEXT_SELECTOR).should('exist');
  });

  it('category should be present', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('exist');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('exist');
  });
});

describe('It must be possible to guess only once', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('should only exist 1 correct answer', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.length', 1);
  });
});

describe('When clicking on an answer, the correct answer should be green and the incorrect ones should be red', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('checks the correct answer colour', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border', '3px solid rgb(6, 240, 15)');
  });

  it('checks the incorrect answers colour', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border', '3px solid rgb(255, 0, 0)');
  });

  it('checks the correct answer colour when the player guessed wrongly', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border', '3px solid rgb(6, 240, 15)');
  });

  it('checks the incorrect answers colour when the player guessed wrongly', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border', '3px solid rgb(255, 0, 0)');
  });
});

describe('Player only have 30 seconds to guess it', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('waits 30 seconds', () => {
    cy.wait(32000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('be.disabled');
  });
});

describe('By clicking on the correct answer, points must be added to the score of the player', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  it('scores points for getting a question right', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.score).to.be.lt(now.score);
    });
  });

  it("doesn't scores points for getting a question wrong", () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.score).to.be.eq(now.score);
    });
  });
});

describe('After the answer is given, the "Next" button should appear.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(QUESTION_TEXT_SELECTOR);
  });

  it('the "Next" button should not be visible at the start of the game', () => {
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('not.be.visible');
  });

  it('the "Next" button should  be visible when getting a question right', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });

  it('the "Next" button should  be visible when getting a question wrong', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });
});

describe('The player must answer 5 questions in total.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  it('he gets all the questions right', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.score).to.be.lt(after.score);
    });
  });

  it('he gets all the questions worng', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.score).to.be.eq(after.score);
    });
  });

  it('redirects to _feedback_ screen after fifth question', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).should('exist');
  });
});

// home

describe('The person who plays must fill in the information to start a game.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it("write the player's name", () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
  });

  it("write the player's email", () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
  });

  it('Play button should be disabled when player person does not fill any field', () => {
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Play button must be enabled when player person fills name and email fields', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('not.be.disabled');
  });
});

describe('The player must have access to the settings screen via Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('the play button should exist on the page', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).should('exist');
  });

  it('the settings screen should have a title', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).click();
    cy.get(SETTINGS_TITLE_SELECTOR).should('exist');
  });
});

describe('The player should start a game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
  });

  it('starts the game by saving a player token', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).click().should(() => {
      expect(localStorage.getItem(TOKEN_KEY)).not.to.be.null;
    });
  });
});

// ranking

describe('There must be a button to go Home at _ranking_', () => {
  it('volta para a tela inicial', () => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).should('exist');
  });
});

describe('_ranking_ presentation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
  });

  it('should exist one player on the _ranking_ page', () => {
    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(1);
    });
  });

  it('should exist two players on the _ranking_ page', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(2);
    });
  });

  it('the _ranking_ must be ordered by score', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name3);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email3);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    const ranking = [name1, name3, name2];

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(3);
    });

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).each(($el, $index) => {
      expect($el.text()).to.be.eq(ranking[$index]);
    });
  });
});

// feedback

describe('The _header_feedback_ should contain player info', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  it('Gravater image should be visible', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it("Player's name should be visible", () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('The updated score should be visible', () => {
    cy.get(HEADER_SCORE_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.score);
    });
  });
});

describe('User must see feedback message', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('He got right less than 3 times', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Podia ser melhor...');
  });

  it('He got right 3 times', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Mandou bem!');
  });

  it('He got right more than 3 times', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Mandou bem!');
  });
});

describe('The User should be able to see his score and assertions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('He got all wrong', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.assertions);
    });
  });

  it('He got right 2 questions', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.assertions);
    });
  });

  it('He got right 4 questions', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const player = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(player.assertions);
    });
  });
});

describe('The User can play again', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  it('The User must be redirected to Home', () => {
    cy.get(BUTTON_PLAY_AGAIN_SELECTOR).click();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).should('exist');
  });
});

describe('The User can see the ranking', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  it('The User must be redirected to Home', () => {
    cy.get(BUTTON_RANKING_SELECTOR).click();
    cy.get(RANKING_TITLE_SELECTOR).should('exist');
  });
});
