describe('Home page', () => {

  const SELECTORS = {
    AUTHORITY_DROPDOWN: '[data-test="authority-dropdown"]',
    ERROR_AUTHORITY_DROPDOWN: '[data-test="error-authority-dropdown"]',
    ESTAB_TABLE: {
      ESTAB_ROW: (id: string | number) => `[data-test="establishment-row-${id}"]`,
      FAV_CHECKBOX: (id: string | number) => `[data-test="establishment-row-${id}"] input[type="checkbox"]`,
      ERROR: '[data-test="establishment-list-error"]'
    },
    LOADING: {
      AUTHORITY_DROPDOWN: '[data-test="loading-authority-dropdown"]',
      ESTABLISHMENTS_TABLE: '[data-test="loading-establishments"]',
    },
    PAGINATION: {
      PREV_BUTTON: '[data-test="previous-page-button"]', 
      NEXT_BUTTON: '[data-test="next-page-button"]',
      CURRENT_PAGE: '[data-test="current-page-number"]',
    },
    FAV_TABLE: {
      TABLE: '[data-test="favorites-table"]',
      TOGGLE_FAV_BTN: (id: string | number) => `[data-test="toggle-favorite-btn-${id}"]`,
      ESTABLISHMENT_RECORD: (id: string | number) => `[data-test="favorite-establishment-${id}"]`,
    }
  }

  beforeEach(() => {

    // Fixture for Authorities API
    cy.fixture('/authorities/list.json').then((authorities) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Authorities/basic', 
        {
          statusCode: 200,
          body: authorities
        }).as('getAuthorities')
    })

    // Fixture for general establishment fetch - page 1
    cy.fixture('/establishments/initial/page-1.json').then((establishments) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/basic/1/10', 
        {
          statusCode: 200,
          body: establishments
        }).as('getEstablishmentsPg1')
    })

    // Fixture for general establishment fetch - page 2
    cy.fixture('/establishments/initial/page-2.json').then((establishments) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/basic/2/10', 
        {
          statusCode: 200,
          body: establishments
        }).as('getEstablishmentsPg2')
    })

    // Fixture for general establishment fetch - page 3
    cy.fixture('/establishments/initial/page-3.json').then((establishments) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/basic/3/10', 
        {
          statusCode: 200,
          body: establishments
        }).as('getEstablishmentsPg3')
    })

    cy.fixture('/establishments/by-authority/bristol/page-1.json').then((establishments) => {
      cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments?pageNumber=1&pageSize=10&localAuthorityId=324', 
        {
          statusCode: 200,
          body: establishments
        }).as('getFilteredEstablishmentsPg1')
    })

  });
  

  it('should render the first page with expected state', () => {
    cy.visit('/')

    // The favorite table must be visible.
    cy.get(SELECTORS.FAV_TABLE.TABLE).should("be.visible")

    // The mocked authority must not exist.
    cy.contains("Mocked Aberdeen City").should("not.exist");

    // Loading indicator for Authorities dropdown must be visible.
    cy.get(SELECTORS.LOADING.AUTHORITY_DROPDOWN).should("be.visible");

    // Specific loading indicator for the listage must be displayed
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("be.visible");

    // The dropdown must be disabled until all the promises get resolved.
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).should("be.disabled")

    // The pagination nav must be disabled.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.disabled")

    // Fetch the establisments (general listing)
    cy.wait("@getEstablishmentsPg1")
    
    // Fetch the authority data
    cy.wait("@getAuthorities")

    // The indicator must be hidden after loading the authorities
    cy.get(SELECTORS.LOADING.AUTHORITY_DROPDOWN).should("not.exist");

    // The indicator must be hidden after loading the establishments
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("not.exist");

    // Any mocked / expected authority must be visible in the dropdown.
    cy.contains("Mocked Aberdeen City").should("be.visible")

    // Any mocked / expected establishment must be visible in the dropdown.
    cy.contains("MOCKED !NOSH!").should("be.visible")

    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.enabled")
    cy.get(SELECTORS.PAGINATION.CURRENT_PAGE).should("have.text", "1")

  })

  it('should paginate according with the navigation buttons', () => {
    
    cy.visit('/')

    cy.wait("@getEstablishmentsPg1")
    cy.wait("@getAuthorities")

    // It clicks in the next pagination button in order to go to the page 2 (2 of 3)
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).click()

    // TODO: expect the dropdown + pagination buttons to be disabled.

    cy.wait("@getEstablishmentsPg2")

    // TODO: expect the dropdown + pagination buttons to be enabled.

    // Both next and previous button must be enabled.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.enabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.enabled")
    cy.get(SELECTORS.PAGINATION.CURRENT_PAGE).should("have.text", "2")

    // Check some establishment from the second page
    cy.contains("Park Lane Primary School MOCK 2").should("be.visible")

    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).click()
    
    // TODO: expect the dropdown + pagination buttons to be disabled.

    cy.wait("@getEstablishmentsPg3")

    // TODO: expect the dropdown + pagination buttons to be enabled.

    // Since now it's in the last page, the next button must be disabled.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.enabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.CURRENT_PAGE).should("have.text", "3")
    
    // Check some establishment from the third page
    cy.contains("#Buttylicious MOCK 3").should("be.visible")

    // Select some authority from the dropdown.
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).select('Bristol')

    // TODO: expect the dropdown + pagination buttons to be disabled.

    cy.wait("@getFilteredEstablishmentsPg1")

    // TODO: expect the dropdown + pagination buttons to be enabled.

    // The pagination must be reset and both buttons must be disabled since there is a single page.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.CURRENT_PAGE).should("have.text", "1")
  })

  it('should display filtered establishments according to the authority dropdown', () => {
    
    cy.visit('/')

    cy.wait("@getEstablishmentsPg1")
    cy.wait("@getAuthorities")

    // Select some authority from the dropdown
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).select('Bristol')

    // Specific loading indicator for the listage must be displayed
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("be.visible");

    // The dropdown must be disabled until all the promises get resolved.
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).should("be.disabled")

    // The pagination nav must be disabled.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.disabled")

    cy.wait("@getFilteredEstablishmentsPg1")

    // The indicators must be hidden after loading the establishments
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("not.exist");
    cy.get(SELECTORS.LOADING.AUTHORITY_DROPDOWN).should("not.exist");

    // It checks if some establishment specific for Bristol was rendered.
    cy.contains("11Eleven MOCKED BRISTOL").should("be.visible")

    // Reset the dropdown to the initial state:
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).select('All')

    cy.wait("@getEstablishmentsPg1")

    // Check if the establishment from the initial page was rendered.
    cy.contains("MOCKED !NOSH!").should("be.visible")

  })

  it('favorites toggled by the table row should appear in the comparison table', () => {
    
    cy.visit('/')

    cy.wait("@getEstablishmentsPg1")
    cy.wait("@getAuthorities")

    var mockedNoshEstabId = "1466637";

    // Check if the target establishment does not exist in the favorites table.
    cy.get(SELECTORS.FAV_TABLE.ESTABLISHMENT_RECORD(mockedNoshEstabId)).should("not.exist")

    // Add the target establishment to the favorites through the table row checkbox.
    cy.get(SELECTORS.ESTAB_TABLE.FAV_CHECKBOX(mockedNoshEstabId)).check(); 
    
    // The establishment must be added to the favorites table
    cy.get(SELECTORS.FAV_TABLE.ESTABLISHMENT_RECORD(mockedNoshEstabId)).should("exist")

    // Refresh the browser
    cy.reload();

    cy.wait("@getEstablishmentsPg1");
    cy.wait("@getAuthorities");

    // Make sure the previous favorite establishment stays in the fav table...
    cy.get(SELECTORS.FAV_TABLE.ESTABLISHMENT_RECORD(mockedNoshEstabId)).should("exist");

    // and also checked in the establishment tabkes
    cy.get(SELECTORS.ESTAB_TABLE.FAV_CHECKBOX(mockedNoshEstabId)).should("be.checked")

    // Toggle the favorite from the fav table.
    cy.get(SELECTORS.FAV_TABLE.TOGGLE_FAV_BTN(mockedNoshEstabId)).click();

    // The corresponding establishment must be unchecked automatically in the estab. table
    cy.get(SELECTORS.ESTAB_TABLE.FAV_CHECKBOX(mockedNoshEstabId)).should("not.be.checked")

  })

  it('it should display the error indicator when the authority API fails', () => {

    cy.intercept('GET', 'http://api.ratings.food.gov.uk/Authorities/basic', {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as('getAuthoritiesError');

    cy.visit('/')

    // The favorite table must be visible.
    cy.get(SELECTORS.FAV_TABLE.TABLE).should("be.visible")

    // The mocked authority must not exist.
    cy.contains("Mocked Aberdeen City").should("not.exist");

    // Specific loading indicator for the listage must be displayed
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("be.visible");

    // The dropdown must be disabled until all the promises get resolved.
    cy.get(SELECTORS.AUTHORITY_DROPDOWN).should("be.disabled")

    // The pagination nav must be disabled.
    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.disabled")

    // Fetch the establisments (general listing)
    cy.wait("@getEstablishmentsPg1")
    
    // Fetch the authority data
    cy.wait("@getAuthoritiesError")

    // The indicator must be hidden after loading the authorities
    cy.get(SELECTORS.LOADING.AUTHORITY_DROPDOWN).should("not.exist");

    cy.get(SELECTORS.AUTHORITY_DROPDOWN).should("be.disabled")

    cy.get(SELECTORS.ERROR_AUTHORITY_DROPDOWN).should("be.visible")

    // The indicator must be hidden after loading the establishments
    cy.get(SELECTORS.LOADING.ESTABLISHMENTS_TABLE).should("not.exist");

    // Any mocked / expected establishment must be visible in the dropdown.
    cy.contains("MOCKED !NOSH!").should("be.visible")

    cy.get(SELECTORS.PAGINATION.PREV_BUTTON).should("be.disabled")
    cy.get(SELECTORS.PAGINATION.NEXT_BUTTON).should("be.enabled")
    cy.get(SELECTORS.PAGINATION.CURRENT_PAGE).should("have.text", "1")

  })


  it('it should display the error indicator when the establishment API fails', () => {

    cy.intercept('GET', 'http://api.ratings.food.gov.uk/Establishments/basic/1/10', {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as('getEstablishmentsPg1Error');

    cy.visit('/')

    // Fetch the establisments (general listing)
    cy.wait("@getEstablishmentsPg1Error")
    
    // Fetch the authority data
    cy.wait("@getAuthorities")

    // The error indicator must be visible
    cy.get(SELECTORS.ESTAB_TABLE.ERROR).should("be.visible");

  })

})