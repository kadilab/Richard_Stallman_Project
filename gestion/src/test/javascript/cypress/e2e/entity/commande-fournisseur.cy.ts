import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('CommandeFournisseur e2e test', () => {
  const commandeFournisseurPageUrl = '/commande-fournisseur';
  const commandeFournisseurPageUrlPattern = new RegExp('/commande-fournisseur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commandeFournisseurSample = {};

  let commandeFournisseur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/commande-fournisseurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/commande-fournisseurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/commande-fournisseurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (commandeFournisseur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/commande-fournisseurs/${commandeFournisseur.id}`,
      }).then(() => {
        commandeFournisseur = undefined;
      });
    }
  });

  it('CommandeFournisseurs menu should load CommandeFournisseurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('commande-fournisseur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CommandeFournisseur').should('exist');
    cy.url().should('match', commandeFournisseurPageUrlPattern);
  });

  describe('CommandeFournisseur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commandeFournisseurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CommandeFournisseur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/commande-fournisseur/new$'));
        cy.getEntityCreateUpdateHeading('CommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandeFournisseurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/commande-fournisseurs',
          body: commandeFournisseurSample,
        }).then(({ body }) => {
          commandeFournisseur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/commande-fournisseurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/commande-fournisseurs?page=0&size=20>; rel="last",<http://localhost/api/commande-fournisseurs?page=0&size=20>; rel="first"',
              },
              body: [commandeFournisseur],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(commandeFournisseurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CommandeFournisseur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commandeFournisseur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandeFournisseurPageUrlPattern);
      });

      it('edit button click should load edit CommandeFournisseur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandeFournisseurPageUrlPattern);
      });

      it('edit button click should load edit CommandeFournisseur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandeFournisseurPageUrlPattern);
      });

      it('last delete button click should delete instance of CommandeFournisseur', () => {
        cy.intercept('GET', '/api/commande-fournisseurs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('commandeFournisseur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandeFournisseurPageUrlPattern);

        commandeFournisseur = undefined;
      });
    });
  });

  describe('new CommandeFournisseur page', () => {
    beforeEach(() => {
      cy.visit(`${commandeFournisseurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CommandeFournisseur');
    });

    it('should create an instance of CommandeFournisseur', () => {
      cy.get(`[data-cy="numero"]`).type('Practical').should('have.value', 'Practical');

      cy.get(`[data-cy="dateDebut"]`).type('2023-05-30T22:21').blur().should('have.value', '2023-05-30T22:21');

      cy.get(`[data-cy="dateFin"]`).type('2023-05-30T14:02').blur().should('have.value', '2023-05-30T14:02');

      cy.get(`[data-cy="statut"]`).type('Program').should('have.value', 'Program');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        commandeFournisseur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', commandeFournisseurPageUrlPattern);
    });
  });
});
