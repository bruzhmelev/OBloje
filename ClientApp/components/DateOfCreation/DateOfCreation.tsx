import * as React from 'react';
import * as moment from 'moment';
import { TimeService } from '../../services/TimeService';

export interface DateOfCreationProps {
  date: Date | null
}

export function DateOfCreation (props: DateOfCreationProps) {
  const { date } = props;
  return (
    <span className="badge badge-dark">
      {date ? TimeService.formatDateOfCreation(date) : 'дата создания неизвестна'}
    </span>
  );
}
