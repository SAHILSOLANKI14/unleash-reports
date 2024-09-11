import moment from 'moment';

export const getDifferenceBetweenDates = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const currentDateTimeISO = (arg) => {
  const { minutesToBeAdded } = arg || {};
  if (minutesToBeAdded) return new Date(Date.now() + 5 * 60 * 1000).toISOString();
  else return new Date().toISOString();
};

export const getRelativeDateRange = (value) => {
  let dateRange = {};
  switch (true) {
    case (value?.name && value?.id === 'today') || !value:
      dateRange.start = moment().format('YYYY-MM-DD');
      dateRange.end = moment().format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'yesterday':
      let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
      dateRange.start = moment(yesterday).format('YYYY-MM-DD');
      dateRange.end = moment(yesterday).format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'tomorrow':
      let date = moment().add(1, 'days').format('YYYY-MM-DD');
      dateRange.start = new Date(date + ' ' + '00:00').toISOString();
      dateRange.end = new Date(date + ' ' + '23:59').toISOString();
      break;

    case value?.name && value?.id === 'last30Days':
      dateRange.start = moment().subtract(30, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last90Days':
      dateRange.start = moment().subtract(90, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last180Days':
      dateRange.start = moment().subtract(180, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;
    case value?.name && value?.id === 'last365Days':
      dateRange.start = moment().subtract(365, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last7days':
      dateRange.start = moment().subtract(7, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last14days':
      dateRange.start = moment().subtract(14, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last10days':
      dateRange.start = moment().subtract(10, 'days').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'next7days':
      dateRange.start = moment().format('YYYY-MM-DD');
      dateRange.end = moment().add(7, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'next10days':
      dateRange.start = moment().format('YYYY-MM-DD');
      dateRange.end = moment().add(10, 'days').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'thisWeek':
      // let today = new Date()
      // let weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      // let weekLast = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      // dateRange.start = moment(weekStart).format('YYYY-MM-DD');
      // dateRange.end = moment(weekLast).format('YYYY-MM-DD');
      dateRange.start = moment().startOf('isoWeek').format('YYYY-MM-DD');
      dateRange.end = moment().endOf('isoWeek').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'lastWeek':
      // const d = new Date();
      // const lastWeekEnd = new Date(
      //   d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000),
      // );
      // const lastWeekStart = new Date(d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000));
      dateRange.start = moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD');
      dateRange.end = moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'thisMonth':
      dateRange.start = moment().startOf('month').format('YYYY-MM-DD');
      dateRange.end = moment().endOf('month').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'lastMonth':
      let lastMonthStart = moment().subtract(1, 'month').startOf('month');
      let lastMonthEnd = moment().subtract(1, 'month').endOf('month');
      dateRange.start = lastMonthStart.format('YYYY-MM-DD');
      dateRange.end = lastMonthEnd.format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'last3Month':
      dateRange.start = moment().subtract(3, 'months').format('YYYY-MM-DD');
      dateRange.end = moment().format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'thisQuarter':
      dateRange.start = moment().startOf('quarter').format('YYYY-MM-DD');
      dateRange.end = moment().endOf('quarter').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'thisYear':
      dateRange.start = moment().startOf('year').format('YYYY-MM-DD');
      dateRange.end = moment().endOf('year').format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'lastYear':
      let lastYearStart = moment().subtract(1, 'year').startOf('year');
      let lastYearEnd = moment().subtract(1, 'year').endOf('year');
      dateRange.start = lastYearStart.format('YYYY-MM-DD');
      dateRange.end = lastYearEnd.format('YYYY-MM-DD');
      break;

    case value?.name && value?.id === 'lastQuarter':
      let lastQuarterStart = moment().subtract(1, 'quarter').startOf('quarter');
      let lastQuarterEnd = moment().subtract(1, 'quarter').endOf('quarter');
      dateRange.start = lastQuarterStart.format('YYYY-MM-DD');
      dateRange.end = lastQuarterEnd.format('YYYY-MM-DD');
      break;

    case value?.startDate && value?.startDate !== '' && value?.endDate && value?.endDate !== '':
      dateRange.start = moment(value?.startDate).format('YYYY-MM-DD');
      dateRange.end = moment(value?.endDate).format('YYYY-MM-DD');
      break;
  }
  return dateRange;
};
