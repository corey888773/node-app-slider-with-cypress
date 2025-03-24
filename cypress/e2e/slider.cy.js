describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

// 1. Gallery Navigation Tests
describe('Gallery Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('navigates to the next slide when "next" button is clicked', () => {
    cy.get('.swiper-slide-active').invoke('text').then(initialText => {
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-slide-active').invoke('text').should('not.equal', initialText);
    });
  });

  it('navigates back to the previous slide when "previous" button is clicked', () => {
    cy.get('.swiper-slide-active').invoke('text').then(secondText => {
      cy.get('.swiper-button-prev').click();
      cy.get('.swiper-slide-active').invoke('text').should('not.equal', secondText);
    });
  });
});

// 2. Slide Content Verification Tests
describe('Slide Content Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  const slidesContents = [
    {
      title: 'Rome',
      description: 'Italy'
    },
    {
      title: 'London',
      description: 'United Kingdom'
    },
    {
      title: 'Paris',
      description: 'France'
    }
  ]

  it('displays title and description on each slide', () => {
    cy.get('.swiper-slide').each(($slide, index) => {
      cy.wrap($slide).within(() => {
        cy.get('.card-description h1').should('contain', slidesContents[index].title);
        cy.get('.card-description p').should('contain', slidesContents[index].description);
      });
    });
  });
});

// 3. Responsive Behavior Tests
describe('Gallery Responsive Behavior Tests', () => {
  const viewports = [
    { device: 'desktop', width: 1280, height: 800 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'mobile', width: 375, height: 667 }
  ];

  viewports.forEach(viewport => {
    it(`displays gallery correctly on ${viewport.device}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('http://localhost:3000');
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-slide').should('have.length.at.least', 3);
      cy.get('.swiper-button-next').should('be.visible');
      cy.get('.swiper-button-prev').should('be.visible');
      cy.get('.swiper-button-next').click();
      cy.get('.swiper-button-prev').click();
    });
  });
});