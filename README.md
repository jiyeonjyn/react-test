# react-test

```bash
$ npm run test
$ npm run test -- --coverage
```

## ๐งฉ Unit test

```bash
$ npm install @types/jest --save-dev
```

- Make a presenter.js and separate logic from components
- Write test code and test with jest

<br>

## ๐งฉ Component test

### Snapshot test

- [https://jestjs.io/docs/snapshot-testing](https://jestjs.io/docs/snapshot-testing)
- react-test-rerender(react ๋ฒ์ ๊ณผ ๋ง์ถ๊ธฐ)

  ```bash
  $ npm install react-test-renderer --save-dev
  ```

- `rerender.create([์ปดํฌ๋ํธ]).toJSON()`

  ```js
  it('renders', () => {
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  ```

### Component test

- [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)

  ```bash
  $ npm install @testing-library/react @testing-library/user-event --save-dev
  ```

- `render([์ปดํฌ๋ํธ]), screen.getBy___(), userEvent`

  ```js
  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText('Habit');
    button = screen.getByText('Add');
  });

  it('calls onAdd when button is clicked and valid habit is entered', () => {
    userEvent.type(input, 'New Habit');
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith('New Habit');
  });
  ```

### Custom hooks test

- [https://github.com/testing-library/react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)

  <br>

## ๐งฉ E2E(End to End) test

- [https://www.cypress.io/](https://www.cypress.io/)

  ```bash
  $ npm install cypress @testing-library/cypress --save-dev
  ```

### E2E test

- `cy.findBy___(), should('...'), each(), wrap()`

  - class๋ id๊ฐ ์๋ text๋ placeholderText ๋ฑ ์ฌ์ฉ์๊ฐ ํ๋ฉด์ ๋ฐ๋ผ๋ณผ ๋ ์ป์ ์ ์๋ ์ ๋ณด๋ฅผ ์ด์ฉ
  - ์ฌ์ฉ์๊ฐ ์ป์ ์ ์๋ ์ ๋ณด๊ฐ ์๋ ๊ฒฝ์ฐ title, data-testid ์์ฑ ์ด์ฉ

  ```js
  /// <reference types="cypress" />
  // vs code์์ cypress api์ ํ์์ ๋ํ ์ ๋ณด๋ฅผ ์ ๊ณตํ  ์ ์๋๋ก ํ๊ธฐ ์ํด ์๋จ์ ์ ์ธ

  import '@testing-library/cypress/add-commands';
  // get()์ด ์๋ findBy___()๋ฅผ ์ด์ฉํ์ฌ ์์ดํ์ ๊ฐ์ ธ์ค๊ธฐ ์ํด ์ ์ธ
  ```

- cypress.json(in the root directory)
  ```json
  {
    "baseUrl": "http://localhost:3000"
  }
  ```

### Network request test

- `cy.intercept`

  ```js
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'popular.json',
    }).as('getMostPopular');
    // mostPopular๊ฐ ๋ค์ด๊ฐ๋ GET ์์ฒญ์ด ์๊ธฐ๋ฉด cypress>fixtures>popular.json์ ๋ฐ์ดํฐ๋ก ์นํํ๊ณ 
    // ์ด ํ์๋ฅผ getMostPopular๋ผ๊ณ  ์ด๋ฆ ์ง๋๋ค
    cy.visit('/');
  });
  ```

<br>

## ๐งฉ Visual test

- ์ปดํฌ๋ํธ๊ฐ ์ํฉ๋ง๋ค ์ด๋ป๊ฒ ๋ณด์ฌ์ ธ์ผ ํ๋์ง ๋ฌธ์ํ

  - [https://storybook.js.org/](https://storybook.js.org/)

- storybook๊ณผ ์ฐ๋ํ์ฌ ๋น์ฃผ์ผ ์ค๋์ท์ ์ฐ๊ณ  ๋น๊ต ๊ฐ๋ฅ

  - [https://percy.io/](https://percy.io/)
  - [https://www.chromatic.com/](https://www.chromatic.com/)
