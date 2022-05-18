import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Habits from '../habits';
import renderer from 'react-test-renderer';

describe('Habits component', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 4 },
    { id: 2, name: 'Running', count: 0 },
  ];
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;
  let HabitsComponent;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();
    HabitsComponent = (
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });

  it('renders', () => {
    const component = renderer.create(HabitsComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Button Click', () => {
    beforeEach(() => {
      render(HabitsComponent); // 렌더링 먼저
    });

    it('calls onAdd when clicking the "Add" button', () => {
      const input = screen.getByPlaceholderText('Habit');
      const button = screen.getByText('Add');
      const newHabit = 'New Habit';
      userEvent.type(input, newHabit);
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it('calls onIncrement when clicking "increment" button', () => {
      const button = screen.getAllByTitle('increase')[1];
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habits[1]);
    });

    it('calls onDecrement when clicking "decrement" button', () => {
      const button = screen.getAllByTitle('decrease')[1];
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habits[1]);
    });

    it('calls onDelete when clicking "delete" button', () => {
      const button = screen.getAllByTitle('delete')[1];
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habits[1]);
    });

    it('calls onReset when clicking the "Reset All" button', () => {
      const button = screen.getByText('Reset All');
      userEvent.click(button);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
