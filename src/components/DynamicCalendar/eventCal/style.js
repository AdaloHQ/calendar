// @flow
import { StyleSheet } from 'react-native'

// const eventPaddingLeft = 4
const leftMargin = 50 - 1

export default function styleConstructor(
  theme = {},
  calendarHeight,
  headerColor,
  headerTextColor,
  eventBgColor,
  eventTextColor,
  customFontStyles
) {
  let timeStyle = {}
  if (
    customFontStyles.eventSubtitle.color &&
    customFontStyles.eventSubtitle.fontFamily
  ) {
    timeStyle = {
      color: customFontStyles.eventSubtitle.color,
      fontFamily: customFontStyles.eventSubtitle.fontFamily,
    }
  }
  const style = {
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      ...theme.container,
    },
    contentStyle: {
      backgroundColor: '#ffff',
      height: calendarHeight,
      ...theme.contentStyle,
    },
    header: {
      paddingHorizontal: 30,
      height: 50,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#E6E8F0',
      color: '#ffffff',
      backgroundColor: headerColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      ...theme.header,
    },
    headerTextContainer: {
      justifyContent: 'center',
    },
    headerText: {
      fontWeight: 'bold',
      color: headerTextColor,
      fontSize: 16,
      ...theme.headerText,
      ...customFontStyles.bodyFont,
    },
    arrow: {
      fontWeight: 'bold',
      width: 15,
      height: 15,
      resizeMode: 'contain',
      tintColor: headerTextColor,
    },
    arrowButton: {
      width: 50,
      justifyContent: 'center',
      ...theme.arrowButton,
    },
    event: {
      position: 'absolute',
      backgroundColor: eventBgColor,
      opacity: 0.8,
      borderColor: '#DDE5FD',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 4,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event,
    },
    eventTitle: {
      color: eventTextColor || '#fff',
      fontWeight: '600',
      minHeight: 15,
      flexWrap: 'wrap',
      ...theme.eventTitle,
      ...customFontStyles.eventTitle,
    },
    eventSummary: {
      color: eventTextColor || '#fff',
      fontSize: 12,
      flexWrap: 'wrap',
      ...theme.eventSummary,
      ...customFontStyles.eventSubtitle,
    },
    eventTimes: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: 'bold',
      color: eventTextColor || '#fff',
      flexWrap: 'wrap',
      ...theme.eventTimes,
      ...timeStyle,
    },
    line: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line,
    },
    lineNow: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'red',
      ...theme.lineNow,
    },
    timeLabel: {
      position: 'absolute',
      left: 15,
      color: 'rgb(170,170,170)',
      fontSize: 10,
      fontWeight: '500',
      ...theme.timeLabel,
      ...customFontStyles.bodyFont,
    },
  }
  return StyleSheet.create(style)
}
