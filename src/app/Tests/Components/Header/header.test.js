import { h, Component } from 'preact';
import Header from '../../../Components/Header';
import { Link } from 'preact-router/match';
import { shallow, deep } from 'preact-render-spy';

describe('Initial Test of the Header', () => {
    test('Header renders 3 nav items', () => {
        const context = shallow(<Header />);
        expect(context.find('h1').text()).toBe('Preact Boilerplate');
        expect(context.find(<Link />).length).toBe(3);
    });
});