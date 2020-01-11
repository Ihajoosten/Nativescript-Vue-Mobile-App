import { shallowMount, mount } from '@vue/test-utils';
import WorkedHours from '../components/Worked-hours/WorkedHoursComponent'
import { itemsProperty } from 'nativescript-drop-down';

describe('WorkedHours tests', () => {

    it('Should properly convert data to string', async () => {
        const date = "2019-12-18";
        await expect(WorkedHours.methods.convertDateToString(date)).toEqual('wo 18 december 2019');
    })
})