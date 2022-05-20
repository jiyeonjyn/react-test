# react-test

```bash
$ npm run test
$ npm run test -- --coverage
```

## Unit test

```bash
$ npm install @types/jest --save-dev
```

- Make a presenter.js and separate logic from components
- Write test code and test with jest

<br>

## Component test

### Snapshot test

- [https://jestjs.io/docs/snapshot-testing](https://jestjs.io/docs/snapshot-testing)
- react-test-rerender(react 버전과 맞추기)

  ```bash
  $ npm install react-test-renderer --save-dev
  ```

- `rerender.create([컴포넌트]).toJSON()`

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

- `render([컴포넌트]), screen.getBy___(), userEvent`

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

## E2E(End to End) test

- [https://www.cypress.io/](https://www.cypress.io/)

  ```bash
  $ npm install cypress @testing-library/cypress --save-dev
  ```

### E2E test

- `cy.findBy___(), should('...'), each(), wrap()`

  - class나 id가 아닌 text나 placeholderText 등 사용자가 화면을 바라볼 때 얻을 수 있는 정보를 이용
  - 사용자가 얻을 수 있는 정보가 없는 경우 title, data-testid 속성 이용

  ```js
  /// <reference types="cypress" />
  // vs code에서 cypress api의 타입에 대한 정보를 제공할 수 있도록 하기 위해 상단에 선언

  import '@testing-library/cypress/add-commands';
  // get()이 아닌 findBy___()를 이용하여 아이템을 가져오기 위해 선언
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
    // mostPopular가 들어가는 GET 요청이 생기면 cypress>fixtures>popular.json의 데이터로 치환하고
    // 이 행위를 getMostPopular라고 이름 짓는다
    cy.visit('/');
  });
  ```
