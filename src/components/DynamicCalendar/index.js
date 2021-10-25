import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import EventCalendar from './eventCal/EventCalendar'
import { LocaleConfig } from 'react-native-calendars'
import * as defaultStyle from './defaultStyles'
import setupLocales from './locales'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

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
    setupLocales()
  }

  componentDidUpdate(prevProps) {
    if (!this.props.items || !prevProps.items) return
    const { items } = this.props
    const { items: prevItems } = prevProps
    if (items[0]?.agenda.timeFormat !== prevItems[0]?.agenda.timeFormat) {
      this.setState({ timeFormat: items[0]?.agenda.timeFormat || 0 })
    }
  }

  // runs when user clicks calendar day
  onDayPress = (day) => {
    this.setState({ chosenDay: day.dateString })
    let { oneEventAction } = this.props
    if (
      oneEventAction === 'action' &&
      this.state.datesHash.get(day.dateString) === 1
    ) {
      this.setState({ goBackTrigger: true })
      let passDate = new Date(day.dateString)
      passDate.setDate(passDate.getDate() + 1)
      let event = this.state.agendaEvents.filter((event) =>
        event.start.includes(day.dateString)
      )[0]
      let id = event ? event.id : null
      if (!id && id !== 0) return
      let { onPressCalendar } = this.props.items[Number(id)]
      if (onPressCalendar && typeof onPressCalendar === 'function') {
        onPressCalendar()
      }
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
      _fonts,
      openAccordion,
    } = this.props
    const { timeFormat } = this.state
    const mondayBeginBool = mondayBegin === 'Sunday' ? 0 : 1
    LocaleConfig.defaultLocale = language
    let monthValue = this.state.chosenDay.substring(
      this.state.chosenDay.length - 5,
      this.state.chosenDay.length - 3
    )
    if (
      this.state.chosenDay[this.state.chosenDay.length - 5].localeCompare(
        '0'
      ) === 0
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
    if (language === 'Japanese' || language === 'Chinese') {
      passedTitle =
        yearValue +
        ' ' +
        LocaleConfig.locales[language].monthNames[monthValue - 1] +
        ' ' +
        dayValue
    }

    //custom font additions
    let customFontStyles =
      this.props.agenda && this.props.agenda.styles
        ? {
            eventTitle: this.props.agenda.styles.eventTitle,
            eventSubtitle: this.props.agenda.styles.eventSubtitle,
            bodyFont: {
              fontFamily: this.props.agenda.styles.eventTitle.fontFamily,
            },
          }
        : {
            eventTitle: { fontFamily: _fonts.body },
            eventSubtitle: { fontFamily: _fonts.body },
            bodyFont: { fontFamily: _fonts.body },
          }

    // colors
    let { activeColor, textColor, disabledColor, bgColor, headingTextColor } =
      colors
    // navigation
    let { defDate, minDate, maxDate, changeMonths } = navigation
    if (maxDate === '2021-01-01') {
      maxDate = new Date().getFullYear()
      maxDate = `${maxDate + 1}-01-01`
    }
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
    if (items !== undefined && items[0] !== undefined) {
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
        if (startTime === endTime) {
          if (
            this.formatDate(new Date(eventStarttimeArray[i]), true) !==
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
              ' 23:59' !==
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
          for (let j = 1; j < dates.length; ++j) {
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
      if (items[0].eventStarttime === undefined) {
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
      if (openAccordion === 'agenda') {
        agendaRenderPass = true
      }
      this.state.datesHash = new Map()
      for (let i = 0; i < markedDatesArray.length; ++i) {
        let count = 0
        for (let j = 0; j < markedDatesArray.length; ++j) {
          if (markedDatesArray[i] === markedDatesArray[j]) {
            count++
          }
        }
        this.state.datesHash.set(markedDatesArray[i], count)
      }
      if (markingStyle === 'multi-dot') {
        markedDatesArray.forEach((day) => {
          let selected = false
          if (day === startDate) {
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
          if (day === startDate) {
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
              textDayFontFamily: customFontStyles.bodyFont.fontFamily,
              textMonthFontFamily: customFontStyles.bodyFont.fontFamily,
              'stylesheet.calendar.header': {
                dayHeader: {
                  marginTop: 2,
                  marginBottom: 7,
                  width: 50,
                  textAlign: 'center',
                  fontSize: appStyle.textDayHeaderFontSize,
                  fontWeight: 'bold',
                  color: textColor,
                  ...customFontStyles.bodyFont,
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
          activeColor={activeColor}
          customFontStyles={customFontStyles}
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
