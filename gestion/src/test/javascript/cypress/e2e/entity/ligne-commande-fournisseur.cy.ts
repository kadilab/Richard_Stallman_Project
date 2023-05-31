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

describe('LigneCommandeFournisseur e2e test', () => {
  const ligneCommandeFournisseurPageUrl = '/ligne-commande-fournisseur';
  const ligneCommandeFournisseurPageUrlPattern = new RegExp('/ligne-commande-fournisseur(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const ligneCommandeFournisseurSample = {};

  let ligneCommandeFournisseur;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/ligne-commande-fournisseurs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/ligne-commande-fournisseurs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/ligne-commande-fournisseurs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (ligneCommandeFournisseur) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/ligne-commande-fournisseurs/${ligneCommandeFournisseur.id}`,
      }).then(() => {
        ligneCommandeFournisseur = undefined;
      });
    }
  });

  it('LigneCommandeFournisseurs menu should load LigneCommandeFournisseurs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('ligne-commande-fournisseur');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('LigneCommandeFournisseur').should('exist');
    cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
  });

  describe('LigneCommandeFournisseur page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(ligneCommandeFournisseurPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create LigneCommandeFournisseur page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/ligne-commande-fournisseur/new$'));
        cy.getEntityCreateUpdateHeading('LigneCommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/ligne-commande-fournisseurs',
          body: ligneCommandeFournisseurSample,
        }).then(({ body }) => {
          ligneCommandeFournisseur = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/ligne-commande-fournisseurs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/ligne-commande-fournisseurs?page=0&size=20>; rel="last",<http://localhost/api/ligne-commande-fournisseurs?page=0&size=20>; rel="first"',
              },
              body: [ligneCommandeFournisseur],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(ligneCommandeFournisseurPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details LigneCommandeFournisseur page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('ligneCommandeFournisseur');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
      });

      it('edit button click should load edit LigneCommandeFournisseur page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LigneCommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
      });

      it('edit button click should load edit LigneCommandeFournisseur page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('LigneCommandeFournisseur');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
      });

      it('last delete button click should delete instance of LigneCommandeFournisseur', () => {
        cy.intercept('GET', '/api/ligne-commande-fournisseurs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('ligneCommandeFournisseur').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);

        ligneCommandeFournisseur = undefined;
      });
    });
  });

  describe('new LigneCommandeFournisseur page', () => {
    beforeEach(() => {
      cy.visit(`${ligneCommandeFournisseurPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('LigneCommandeFournisseur');
    });

    it('should create an instance of LigneCommandeFournisseur', () => {
      cy.get(`[data-cy="quantite"]`).type('99931').should('have.value', '99931');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        ligneCommandeFournisseur = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', ligneCommandeFournisseurPageUrlPattern);
    });
  });
});
