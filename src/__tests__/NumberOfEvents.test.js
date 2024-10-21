import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={() => { }}
                setErrorAlert={() => { }}
            />
        );
    });

    test('component contains input textbox', () => {
        const input = NumberOfEventsComponent.getByRole('spinbutton');
        expect(input).toBeInTheDocument();
    });

    test('ensures the default value of textbox is 32', () => {
        const input = NumberOfEventsComponent.getByRole('spinbutton');
        expect(input.value).toBe('32');
    });

    test('textbox value changes when user updates input', async () => {
        const input = NumberOfEventsComponent.getByRole('spinbutton');
        const user = userEvent.setup();
        await user.clear(input);
        await user.type(input, '10');
        expect(input.value).toBe('10');
    });

    test('displays an error alert when the user enters an invalid number', async () => {
        const setErrorAlert = jest.fn();
        const { getAllByRole } = render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={() => { }}
                setErrorAlert={setErrorAlert}
            />
        );

        const inputs = getAllByRole('spinbutton');
        const user = userEvent.setup();
        await user.clear(inputs[0]);
        await user.type(inputs[0], '-1');

        expect(setErrorAlert).toHaveBeenCalledWith('Please enter a valid number');
    });
});