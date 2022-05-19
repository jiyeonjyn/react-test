/// <reference types="cypress" />
// vs code에서 cypress api의 타입에 대한 정보를 제공할 수 있도록 하기 위해 상단에 선언

import '@testing-library/cypress/add-commands';
// get()이 아닌 findBy___()를 이용하여 아이템을 가져오기 위해 선언

describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Habit Tracker').should('exist');
  });

  it('adds new habit at the end', () => {
    cy.findByPlaceholderText('Habit').type('New Habit');
    cy.findByText('Add').click();
    cy.findAllByTestId('habit-name').last().should('have.text', 'New Habit');
    cy.findAllByTestId('habit-count').last().should('have.text', '0');
  });

  it('increases count', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '1');
  });

  it('decreases count', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('does not decreases below 0', () => {
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('shows active count on the header', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByTestId('total-count').should('have.text', '2');
  });

  it('reset to 0 when clicking reset all', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByText('Reset All').click();
    // each((item) => {cy.wrap(item).should('...')})
    // each 메소드에서 wrap으로 item 감싸서 테스트
    cy.findAllByTestId('habit-count').each((item) => {
      cy.wrap(item).should('have.text', '0');
    });
  });

  it('deletes an item', () => {
    cy.findAllByTitle('delete').first().click();
    cy.findAllByTestId('habit-name').first().should('have.text', 'Running');
    // habit-name 중에서 Reading이라는 텍스트를 가진 요소가 없어야 함
    cy.findAllByTestId('habit-name').findByText('Reading').should('not.exist');
  });
});
