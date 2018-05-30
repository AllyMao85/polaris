import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import DatePicker from '../DatePicker';
import MonthComponent from '../Month';
import Day from '../Day';

describe('<DatePicker />', () => {
  const selected = {
    start: new Date(2016, 11, 8),
    end: new Date(2016, 11, 18),
  };
  const hoverDate = selected.end;
  const month = 0;
  const year = 2017;

  describe('onChange()', () => {
    it('is called on click on Day component', () => {
      const spy = jest.fn();
      const component = mountWithAppProvider(
        <MonthComponent
          focusedDate={new Date()}
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
        />,
      );
      const day = component.find(Day);
      day.first().simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  it('does not submit an enclosing form', () => {
    const spy = jest.fn();
    const component = mountWithAppProvider(
      <form onSubmit={spy}>
        <DatePicker month={0} year={2018} />
      </form>,
    );

    const day = component.find(Day);
    day.first().simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const datePicker = mountWithAppProvider(
        <DatePicker id={id} month={0} year={2018} />,
      );

      expect(datePicker.childAt(0).prop('id')).toBe(id);
    });
  });
});
