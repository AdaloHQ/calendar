import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventCalendar from './eventCal/EventCalendar'
import { LocaleConfig } from 'react-native-calendars'
import * as defaultStyle from './defaultStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

// construct language options
LocaleConfig.locales['Arabic'] = {
  monthNames: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيه',
    'يوليه',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  monthNamesShort: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيه',
    'يوليه',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  dayNames: [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الاربعاء',
    'الجمعة',
    'السبت',
  ],
  dayNamesShort: [
    'الاحد',
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الاربعاء',
    'الجمعة',
    'السبت',
  ],
}

LocaleConfig.locales['Chinese'] = {
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  monthNamesShort: [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ],
  dayNames: [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
}

LocaleConfig.locales['English'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

LocaleConfig.locales['French'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
}

LocaleConfig.locales['German'] = {
  monthNames: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mär.',
    'Apr.',
    'Mai',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Okt.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
}

LocaleConfig.locales['Hindi'] = {
  monthNames: [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्तूबर',
    'नवंबर',
    'दिसंबर',
  ],
  monthNamesShort: [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्तूबर',
    'नवंबर',
    'दिसंबर',
  ],
  dayNames: [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरुवार',
    'शुक्रवार',
    'शनिवार',
  ],
  dayNamesShort: [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरुवार',
    'शुक्रवार',
    'शनिवार',
  ],
}

LocaleConfig.locales['Japanese'] = {
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  monthNamesShort: [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ],
  dayNames: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
}

LocaleConfig.locales['Portuguese'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Apr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
}

LocaleConfig.locales['Spanish'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
}

LocaleConfig.locales['Russian'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'May',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Ноя.',
    'Дек.',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
}

class DynamicCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarRender: true,
      chosenDay: moment().format('YYYY-MM-DD'),
      goBackTrigger: false,
      datesHash: new Map(),
      agendaEvents: [],
      timeFormat: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.items || !prevProps.items) return
    const { items } = this.props
    const { items: prevItems } = prevProps
    if (items[0]?.agenda.timeFormat !== prevItems[0]?.agenda.timeFormat) {
      this.setState({ timeFormat: items[0].agenda.timeFormat })
    }
  }

  // runs when user clicks calendar day
  onDayPress = (day) => {
    this.setState({ chosenDay: day.dateString })
    let { oneEventAction } = this.props
    if (
      oneEventAction == 'action' &&
      this.state.datesHash.get(day.dateString) == 1
    ) {
      this.setState({ goBackTrigger: true })
      let passDate = new Date(day.dateString)
      passDate.setDate(passDate.getDate() + 1)
      let id
      for (let i = 0; i < this.state.agendaEvents.length; ++i) {
        if (
          this.formatDate(new Date(this.state.agendaEvents[i].start), false) ==
          this.formatDate(new Date(passDate), false)
        ) {
          id = this.state.agendaEvents[i].id
        }
      }
      let { onPressCalendar } = this.props.items[Number(id)]
      onPressCalendar()
    } else {
      this.setState({ calendarRender: !this.state.calendarRender })
    }
  }

  // runs when user clicks back button on agenda
  goBack = () => {
    this.setState({ calendarRender: !this.state.calendarRender })
    this.setState({ goBackTrigger: true })
  }

  // renders multi-dot markings on calendar
  multiDotRender = (number, activeColor) => {
    let markerDots = { color: activeColor }
    let multiDotArray = [markerDots]
    for (let i = 0; i < number - 1; ++i) {
      multiDotArray.push(markerDots)
    }
    return multiDotArray
  }

  // returns an array of all dates between the two inputs
  getDates = (startDate, endDate) => {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        let date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
      },
      subDays = function (days) {
        let date = new Date(this.valueOf())
        date.setDate(date.getDate() - days)
        return date
      }
    while (currentDate <= endDate) {
      currentDate = addDays.call(currentDate, 1)
      dates.push(subDays.call(currentDate, 1))
    }
    return dates
  }

  // formats date with optional time
  formatDate = (date, wantTime) => {
    let datePush = date.getFullYear() + '-'
    if (date.getMonth() + 1 > 9) {
      datePush += date.getMonth() + 1
    } else {
      datePush += '0' + (date.getMonth() + 1)
    }
    if (date.getDate() > 9) {
      datePush += '-' + date.getDate()
    } else {
      datePush += '-0' + date.getDate()
    }
    if (wantTime) {
      if (date.getHours() > 9) {
        datePush += ' ' + date.getHours()
      } else {
        datePush += ' 0' + date.getHours()
      }
      if (date.getMinutes() > 9) {
        datePush += ':' + date.getMinutes()
      } else {
        datePush += ':0' + date.getMinutes()
      }
    }
    return datePush
  }

  // pushes event details onto agenda events array
  pushAgendaEvents = (agendaEvents, i, start, end, title, subtitle) => {
    agendaEvents.push({
      id: i,
      start: start,
      end: end,
      title: title,
      summary: subtitle,
    })
  }

  // runs when user taps an event
  eventTapped = (event) => {
    let { onPressEvent } = this.props.items[Number(event.id)].agenda
    if (onPressEvent) {
      onPressEvent()
      setTimeout(() => this.setState({ calendarRender: true }), 1000)
    }
  }

  render() {
    const appStyle = { ...defaultStyle }
    // calendar
    let {
      items,
      language,
      mondayBegin,
      colors,
      navigation,
      editor,
      markingStyle,
    } = this.props
    const { timeFormat } = this.state
    const mondayBeginBool = mondayBegin == 'Sunday' ? 0 : 1
    LocaleConfig.defaultLocale = language
    let monthValue = this.state.chosenDay.substring(
      this.state.chosenDay.length - 5,
      this.state.chosenDay.length - 3
    )
    if (
      this.state.chosenDay[this.state.chosenDay.length - 5].localeCompare(
        '0'
      ) == 0
    ) {
      monthValue = this.state.chosenDay.substring(
        this.state.chosenDay.length - 4,
        this.state.chosenDay.length - 3
      )
    }
    let yearValue = this.state.chosenDay.substring(
      0,
      this.state.chosenDay.length - 6
    )
    let dayValue = this.state.chosenDay.substring(
      this.state.chosenDay.length - 2,
      this.state.chosenDay.length
    )
    let passedTitle =
      dayValue +
      ' ' +
      LocaleConfig.locales[language].monthNames[monthValue - 1] +
      ' ' +
      yearValue
    if (language == 'Japanese' || language == 'Chinese') {
      passedTitle =
        yearValue +
        ' ' +
        LocaleConfig.locales[language].monthNames[monthValue - 1] +
        ' ' +
        dayValue
    }
    // colors
    let {
      activeColor,
      textColor,
      disabledColor,
      bgColor,
      headingTextColor,
    } = colors
    // navigation
    let { defDate, minDate, maxDate, changeMonths } = navigation
    let formats = [moment.ISO_8601, 'YYYY-MM-DD']
    let startDate = moment().format('YYYY-MM-DD')

    if (moment(defDate, formats, true).isValid()) {
      startDate = defDate
    }

    if (this.state.goBackTrigger) {
      startDate = this.state.chosenDay
    }
    const nextDays = [startDate]
    let calAgendaObject = {}
    nextDays.forEach((day) => {
      calAgendaObject[day] = {
        selected: true,
      }
    })
    // agenda
    let eventBgColorPass = '#ffffff'
    let eventTextColorPass = '#000000'
    let agendaRenderPass = false
    this.state.agendaEvents = []
    if (items != undefined && items[0] != undefined) {
      let { eventBgColor, eventTextColor } = items[0].agenda
      eventBgColorPass = eventBgColor
      eventTextColorPass = eventTextColor
      let eventTitleArray = []
      let eventSubtitleArray = []
      let eventStarttimeArray = []
      let eventEndtimeArray = []
      let markedDatesArray = []
      for (let i = 0; i < items.length; ++i) {
        eventTitleArray.push(items[i].agenda.eventTitle)
        eventSubtitleArray.push(items[i].agenda.eventSubtitle)
        eventStarttimeArray.push(items[i].eventStarttime)
        eventEndtimeArray.push(items[i].eventEndtime)
        let startTime =
          new Date(eventStarttimeArray[i]).getFullYear() +
          '-' +
          (new Date(eventStarttimeArray[i]).getMonth() + 1) +
          '-' +
          new Date(eventStarttimeArray[i]).getDate()
        let endTime =
          new Date(eventEndtimeArray[i]).getFullYear() +
          '-' +
          (new Date(eventEndtimeArray[i]).getMonth() + 1) +
          '-' +
          new Date(eventEndtimeArray[i]).getDate()
        if (startTime == endTime) {
          if (
            this.formatDate(new Date(eventStarttimeArray[i]), true) !=
            this.formatDate(new Date(eventEndtimeArray[i]), true)
          ) {
            this.pushAgendaEvents(
              this.state.agendaEvents,
              i,
              this.formatDate(new Date(eventStarttimeArray[i]), true),
              this.formatDate(new Date(eventEndtimeArray[i]), true),
              eventTitleArray[i],
              eventSubtitleArray[i]
            )
            markedDatesArray.push(
              this.formatDate(new Date(eventStarttimeArray[i]), false)
            )
          }
        } else {
          if (
            this.formatDate(new Date(eventStarttimeArray[i]), false) +
              ' 23:59' !=
            this.formatDate(new Date(eventStarttimeArray[i]), true)
          ) {
            this.pushAgendaEvents(
              this.state.agendaEvents,
              i,
              this.formatDate(new Date(eventStarttimeArray[i]), true),
              this.formatDate(new Date(eventStarttimeArray[i]), false) +
                ' 23:59',
              eventTitleArray[i],
              eventSubtitleArray[i]
            )
            markedDatesArray.push(
              this.formatDate(new Date(eventStarttimeArray[i]), false)
            )
          }
          let dates = this.getDates(new Date(startTime), new Date(endTime))
          for (let j = 1; j < dates.length - 1; ++j) {
            let datePush = this.formatDate(new Date(dates[j]), false)
            this.pushAgendaEvents(
              this.state.agendaEvents,
              i,
              datePush + ' 00:00',
              datePush + ' 23:59',
              eventTitleArray[i],
              eventSubtitleArray[i]
            )
            markedDatesArray.push(datePush)
          }
          if (
            this.formatDate(new Date(eventEndtimeArray[i]), false) + ' 00:00' !=
            this.formatDate(new Date(eventEndtimeArray[i]), true)
          ) {
            this.pushAgendaEvents(
              this.state.agendaEvents,
              i,
              this.formatDate(new Date(eventEndtimeArray[i]), false) + ' 00:00',
              this.formatDate(new Date(eventEndtimeArray[i]), true),
              eventTitleArray[i],
              eventSubtitleArray[i]
            )
            markedDatesArray.push(
              this.formatDate(new Date(eventEndtimeArray[i]), false)
            )
          }
        }
      }
      if (items[0].eventStarttime == undefined) {
        let passDate = new Date(this.state.chosenDay)
        passDate.setDate(passDate.getDate() + 1)
        this.pushAgendaEvents(
          this.state.agendaEvents,
          0,
          this.formatDate(new Date(passDate), false) + ' 00:15',
          this.formatDate(new Date(passDate), false) + ' 5:15',
          'Example Title',
          'Example Subtitle'
        )
      }
      if (items[0].agenda.agendaRender) {
        agendaRenderPass = true
      }
      this.state.datesHash = new Map()
      for (let i = 0; i < markedDatesArray.length; ++i) {
        let count = 0
        for (let j = 0; j < markedDatesArray.length; ++j) {
          if (markedDatesArray[i] == markedDatesArray[j]) {
            count++
          }
        }
        this.state.datesHash.set(markedDatesArray[i], count)
      }
      if (markingStyle == 'multi-dot') {
        markedDatesArray.forEach((day) => {
          let selected = false
          if (day == startDate) {
            selected = true
          }
          calAgendaObject[day] = {
            dots: this.multiDotRender(
              this.state.datesHash.get(day),
              activeColor
            ),
            selected: selected,
          }
        })
      } else {
        markedDatesArray.forEach((day) => {
          let selected = false
          if (day == startDate) {
            selected = true
          }
          calAgendaObject[day] = {
            periods: [
              { startingDay: false, endingDay: false, color: activeColor },
            ],
            selected: selected,
          }
        })
      }
    }

    if (!(editor && agendaRenderPass) && this.state.calendarRender) {
      return (
        <View style={{ flex: 1, marginTop: 20 }}>
          <Calendar
            key={
              activeColor +
              textColor +
              disabledColor +
              bgColor +
              headingTextColor +
              this.props._height
            }
            theme={{
              calendarBackground: bgColor,
              textSectionTitleColor: textColor,
              selectedDayBackgroundColor: bgColor,
              selectedDayTextColor: activeColor,
              todayTextColor: textColor,
              dayTextColor: textColor,
              textDisabledColor: disabledColor,
              dotColor: activeColor,
              selectedDotColor: activeColor,
              monthTextColor: headingTextColor,
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              'stylesheet.calendar.header': {
                dayHeader: {
                  marginTop: 2,
                  marginBottom: 7,
                  width: 50,
                  textAlign: 'center',
                  fontSize: appStyle.textDayHeaderFontSize,
                  fontWeight: 'bold',
                  color: textColor,
                },
              },
              'stylesheet.day.basic': {
                base: {
                  height: this.props._height / 10,
                  alignItems: 'center',
                  textAlign: 'center',
                },
              },
              'stylesheet.day.multiDot': {
                base: {
                  height: this.props._height / 10,
                  alignItems: 'center',
                },
              },
            }}
            firstDay={mondayBeginBool}
            onDayPress={this.onDayPress}
            minDate={minDate}
            maxDate={maxDate}
            current={startDate}
            hideArrows={!changeMonths}
            renderArrow={(direction) =>
              direction === 'left' ? (
                <FontAwesomeIcon icon={faChevronLeft} color={activeColor} />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} color={activeColor} />
              )
            }
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            markedDates={calAgendaObject}
            markingType={markingStyle}
          />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <EventCalendar
          {...this.props}
          title={passedTitle}
          headerColor={bgColor}
          headerTextColor={headingTextColor}
          eventBgColor={eventBgColorPass}
          eventTextColor={eventTextColorPass}
          key={
            bgColor + headingTextColor + eventBgColorPass + eventTextColorPass
          }
          eventTapped={this.eventTapped}
          backButton={this.goBack}
          events={this.state.agendaEvents}
          width={this.props._width}
          initDate={this.state.chosenDay}
          scrollToFirst
          format24h={timeFormat}
        />
      </View>
    )
  }
}

export default DynamicCalendar
