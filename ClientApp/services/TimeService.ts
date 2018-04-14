import * as moment from 'moment';

export class TimeService {
    public static formatDateOfCreation(date: Date): string {
		return moment(date).format('DD MMM YYYY');
	}
}
