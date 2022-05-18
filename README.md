# react-test

## Unit test

```bash
$ npm install @types/jest --save-dev
```

- Make a presenter.js and separate logic from components
- Write test code and test with jest

## Component test

```bash
$ npm install react-test-renderer --save-dev
```

- Snapshot test
  ```js
  it('renders', () => {
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  ```
- Component test

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

## E2E(End to End) test
