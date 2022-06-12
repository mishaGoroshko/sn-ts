import React from "react";
import {create} from "react-test-renderer";
import {ProfileStatus} from './ProfileStatus';
import {updateStatusTC} from '../../../../Redux/profile-reducer';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(
            <ProfileStatus
                status={'TEST STATUS'}
                updateStatusTC={updateStatusTC}/>);
        const instance = component.getInstance();
        expect(instance?.props.status).toBe('TEST STATUS');
    });
    test("if editMode is false should be return h4", () => {
        const component = create(
            <ProfileStatus
                status={'TEST STATUS'}
                updateStatusTC={updateStatusTC}/>);
        // eslint-disable-next-line testing-library/await-async-query
        let h4 = component.root.findAllByType('h4')
        expect(h4.length).toBe(1)
    });
    test("if editMode is true should be return input", () => {
        const component = create(
            <ProfileStatus
                status={'TEST STATUS'}
                updateStatusTC={updateStatusTC}/>);
        // eslint-disable-next-line testing-library/await-async-query
        let h4 = component.root.findByType('h4')
        h4.props.onDoubleClick()
        // eslint-disable-next-line testing-library/await-async-query
        let input = component.root.findAllByType('input')
        expect(input.length).toBe(1)
    });

});