describe('Details page', () => {

  const SELECTORS = {
    LOADING_INDICATOR: '[data-test="estab-details-loading"]',
    DETAILS_INFO: '[data-test="estab-details-data"]',
    ERROR_INDICATOR: '[data-test="estab-details-error"]',
    FAVORITE_TABLE: '[data-test="favorites-table"]',
    DETAILS_TOGGLE_FAVORITE_BTN: (id) => `[data-test="estab-details-data"] [data-test="toggle-favorite-btn-${id}"]`, 
    FAV_TABLE_TOGGLE_FAVORITE_BTN: (id) => `[data-test="favorites-table"] [data-test="toggle-favorite-btn-${id}"]`
  };

  beforeEach(() => {

    // Fixture for establishment 766323
    cy.fixture('/establishments/details/766323.json').then((estab) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/766323', 
        {
          statusCode: 200,
          body: estab
        }).as('getEstab766323');
    });

    // 404 not found
    cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/123456', 
      {
        statusCode: 404,
      }).as('getEstabNotFound123456');

    // 500 server error
    cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/654321', 
      {
        statusCode: 500,
      }).as('getEstabServerError654321');
    
  });

  it('should load the correct state correctly', () => {
    cy.visit('/establishments/766323');

    cy.get(SELECTORS.LOADING_INDICATOR).should('be.visible');

    cy.wait("@getEstab766323");

    cy.get(SELECTORS.LOADING_INDICATOR).should('not.exist');

    cy.get(SELECTORS.ERROR_INDICATOR).should('not.exist');

    cy.get(SELECTORS.DETAILS_INFO).should('be.visible');
  });

  it('should load the error not found state', () => {
    cy.visit('/establishments/123456');

    cy.wait("@getEstabNotFound123456");

    cy.get(SELECTORS.DETAILS_INFO).should('not.exist');

    cy.get(SELECTORS.ERROR_INDICATOR).should('be.visible')

    cy.contains('Not Found').should('be.visible');

  });

  it('should load the server error state', () => {
    cy.visit('/establishments/654321');

    cy.wait("@getEstabServerError654321");

    cy.get(SELECTORS.DETAILS_INFO).should('not.exist');

    cy.get(SELECTORS.ERROR_INDICATOR).should('be.visible')

    cy.contains('Internal Server Error').should('be.visible');

  });

  it('it should redirect to the index after clicking on the back button', () => {
    cy.visit('/establishments/766323');
    cy.wait("@getEstab766323");
    cy.get('[data-test="back-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('it should update the favorite table after clicking on toggle favorite', () => {
    const id = "766323"
    cy.visit('/establishments/766323');
    cy.wait("@getEstab766323");
    cy.get(SELECTORS.FAVORITE_TABLE).should('contain.text', 'No favorites selected');
    cy.get('[data-test="favorite-establishment-766323"]').should('not.exist')
    cy.get(SELECTORS.DETAILS_TOGGLE_FAVORITE_BTN(id)).click();
    cy.get('[data-test="favorite-establishment-766323"]').should('exist')
    cy.get(SELECTORS.DETAILS_TOGGLE_FAVORITE_BTN(id)).should('contain.text', 'Unfavorite');
    cy.get(SELECTORS.FAV_TABLE_TOGGLE_FAVORITE_BTN(id)).click()
    cy.get(SELECTORS.FAVORITE_TABLE).should('contain.text', 'No favorites selected');
    cy.get(SELECTORS.DETAILS_TOGGLE_FAVORITE_BTN(id)).should('contain.text', 'Favorite');
  });
});