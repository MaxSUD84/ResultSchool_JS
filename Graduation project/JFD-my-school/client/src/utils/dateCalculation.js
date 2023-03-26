import _ from "lodash";

export function calcDayOfMonth(month, year) {
  const x = month + 1;
  const y = year;
  return (
    28 +
    ((x + Math.floor(x / 8)) % 2) +
    (2 % x) +
    Math.floor(
      (1 +
        (1 - (((y % 4) + 2) % ((y % 4) + 1))) *
          (((y % 100) + 2) % ((y % 100) + 1)) +
        (1 - (((y % 400) + 2) % ((y % 400) + 1)))) /
        x
    ) +
    Math.floor(1 / x) -
    Math.floor(
      ((1 - (((y % 4) + 2) % ((y % 4) + 1))) *
        (((y % 100) + 2) % ((y % 100) + 1)) +
        (1 - (((y % 400) + 2) % ((y % 400) + 1)))) /
        x
    )
  );
  //   const x = month + 1;
  //   return 28 + ((x + Math.floor(x / 8)) % 2) + (2 % x) + 2 * Math.floor(1 / x);
}

export function calcFirstDay(month, year) {
  // const year = new Date().getFullYear();
  const numDay = new Date(year, month, 1, 0, 0, 1).getDay();
  // Sunday - Saturday : 0 - 6
  return numDay === 0 ? 6 : numDay - 1;
}

export function createArrayMonth(month, year) {
  const firstDayOrder = calcFirstDay(month, year);
  const resArr = [];
  if (firstDayOrder > 1) {
    const getPrevMonth = month ? month - 1 : 11;
    const getPrevYear = month ? year : year - 1;
    const getPrevMonthDay = calcDayOfMonth(getPrevMonth, getPrevYear);
    _.fill(Array(firstDayOrder), 1).forEach((el, i) => {
      const calcDay = getPrevMonthDay - firstDayOrder + i + 1;
      resArr.push({
        day: calcDay,
        style: 0, // prev month
        timestamp: new Date(getPrevYear, getPrevMonth, calcDay)
      });
    });
  }
  const curDayMonth = calcDayOfMonth(month, year);
  for (let index = 0; index < curDayMonth; index++) {
    resArr.push({
      day: index + 1,
      style: 1, // cur month
      timestamp: new Date(year, month, index + 1)
    });
  }
  const dayToAdd = resArr.length % 7 ? 7 - (resArr.length % 7) : 0;
  //   console.log(dayToAdd);
  if (dayToAdd) {
    _.fill(Array(dayToAdd), 1).forEach((el, i) => {
      resArr.push({
        day: i + 1,
        style: 0, // next month
        timestamp: new Date(year, month + 1, i + 1)
      });
    });
  }
  // *** изменим цвета выходных дней***
  const newResArr = resArr.map((item, i) => {
    let newStyle = item.style;
    if (item.style) {
      newStyle = (i + 1) % 7 == 6 || (i + 1) % 7 == 0 ? 2 : 1;
    }
    return {
      ...item,
      style: newStyle
    };
  });
  return newResArr;
}

export function getTextNameMonth(m) {
  if (isFinite(m) && m >= 0 && m < 12) {
    switch (m) {
      case 0:
        return "январь";
      case 1:
        return "февраль";
      case 2:
        return "март";
      case 3:
        return "апрель";
      case 4:
        return "май";
      case 5:
        return "июнь";
      case 6:
        return "июль";
      case 7:
        return "август";
      case 8:
        return "сентябрь";
      case 9:
        return "октябрь";
      case 10:
        return "ноябрь";
      case 11:
        return "декабрь";
    }
  }
}
