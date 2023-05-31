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

describe('ProduitCommande e2e test', () => {
  const produitCommandePageUrl = '/produit-commande';
  const produitCommandePageUrlPattern = new RegExp('/produit-commande(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const produitCommandeSample = {};

  let produitCommande;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/produit-commandes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/produit-commandes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/produit-commandes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (produitCommande) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/produit-commandes/${produitCommande.id}`,
      }).then(() => {
        produitCommande = undefined;
      });
    }
  });

  it('ProduitCommandes menu should load ProduitCommandes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('produit-commande');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ProduitCommande').should('exist');
    cy.url().should('match', produitCommandePageUrlPattern);
  });

  describe('ProduitCommande page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(produitCommandePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ProduitCommande page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/produit-commande/new$'));
        cy.getEntityCreateUpdateHeading('ProduitCommande');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', produitCommandePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/produit-commandes',
          body: produitCommandeSample,
        }).then(({ body }) => {
          produitCommande = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/produit-commandes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/produit-commandes?page=0&size=20>; rel="last",<http://localhost/api/produit-commandes?page=0&size=20>; rel="first"',
              },
              body: [produitCommande],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(produitCommandePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ProduitCommande page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('produitCommande');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', produitCommandePageUrlPattern);
      });

      it('edit button click should load edit ProduitCommande page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProduitCommande');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', produitCommandePageUrlPattern);
      });

      it('edit button click should load edit ProduitCommande page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ProduitCommande');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', produitCommandePageUrlPattern);
      });

      it('last delete button click should delete instance of ProduitCommande', () => {
        cy.intercept('GET', '/api/produit-commandes/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('produitCommande').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', produitCommandePageUrlPattern);

        produitCommande = undefined;
      });
    });
  });

  describe('new ProduitCommande page', () => {
    beforeEach(() => {
      cy.visit(`${produitCommandePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ProduitCommande');
    });

    it('should create an instance of ProduitCommande', () => {
      cy.get(`[data-cy="quantite"]`).type('35282').should('have.value', '35282');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        produitCommande = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', produitCommandePageUrlPattern);
    });
  });
});
