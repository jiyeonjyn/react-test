import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../habitAddForm';
import renderer from 'react-test-renderer';

describe('HabitAddForm', () => {
  // 스냅샷 테스트
  it('renders', () => {
    // react-test-rerender 이용(react 버전과 맞게 설치)
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
    // 결과
    // <form
    //   className="add-form"
    //   onSubmit={[Function]}
    // >
    //   <input
    //     className="add-input"
    //     placeholder="Habit"
    //     type="text"
    //   />
    //   <button
    //     className="add-button"
    //   >
    //     Add
    //   </button>
    // </form>

    // @testing-library/react 이용
    // const component = render(<HabitAddForm onAdd={jest.fn()} />);
    // expect(component.container).toMatchSnapshot();
    // 결과
    // <div>
    //   <form
    //     class="add-form"
    //   >
    //     <input
    //       class="add-input"
    //       placeholder="Habit"
    //       type="text"
    //     />
    //     <button
    //       class="add-button"
    //     >
    //       Add
    //     </button>
    //   </form>
    // </div>
  });

  // 작동 테스트
  describe('Form Submit', () => {
    let onAdd;
    let input;
    let button;

    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />); // 렌더링 먼저
      input = screen.getByPlaceholderText('Habit');
      button = screen.getByText('Add');
    });

    it('calls onAdd when button is clicked and valid habit is entered', () => {
      const newHabit = 'New Habit';
      userEvent.type(input, newHabit);
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith(newHabit);
    });

    it('does not call onAdd when the habit is empty', () => {
      userEvent.type(input, '');
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
