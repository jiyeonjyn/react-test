# react-test

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

- `render([컴포넌트]), screen, userEvent`

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

  <br>

## E2E(End to End) test
