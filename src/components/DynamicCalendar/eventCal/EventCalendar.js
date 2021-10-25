// @flow
import {
  VirtualizedList,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import React from 'react'

import styleConstructor from './style'

import DayView from './DayView'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props)
    const {
      headerColor,
      headerTextColor,
      eventBgColor,
      eventTextColor,
      activeColor,
      customFontStyles,
    } = props
    const start = props.start ? props.start : 0
    const end = props.end ? props.end : 24

    this.styles = styleConstructor(
      props.styles,
      (end - start) * 100,
      headerColor,
      headerTextColor,
      eventBgColor,
      eventTextColor,
      customFontStyles
    )
    this.state = {
      date: moment(this.props.initDate),
      index: this.props.size,
    }
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined)
    }
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: 'DD MMMM YYYY',
  }

  _getItemLayout(data, index) {
    const { width } = this.props
    return { length: width, offset: width * index, index }
  }

  _getItem(events, index) {
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      'days'
    )
    return _.filter(events, (event) => {
      const eventStartTime = moment(event.start)
      return (
        eventStartTime >= date.clone().startOf('day') &&
        eventStartTime <= date.clone().endOf('day')
      )
    })
  }

  _renderItem({ index, item }) {
    const {
      width,
      format24h,
      initDate,
      scrollToFirst = true,
      start = 0,
      end = 24,
      formatHeader,
      upperCaseHeader = false,
    } = this.props
    const date = moment(initDate).add(index - this.props.size, 'days')

    const backIcon = this.props.headerBackIcon ? (
      this.props.headerBackIcon
    ) : (
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={this.styles.arrow}
        color={this.props.activeColor}
      />
    )

    return (
      <View style={[this.styles.container, { width }]}>
        <View style={this.styles.header}>
          <TouchableOpacity
            style={this.styles.arrowButton}
            onPress={() => this._onBackButton()}
          >
            {backIcon}
          </TouchableOpacity>
          <View style={this.styles.headerTextContainer}>
            <Text style={this.styles.headerText}>{this.props.title}</Text>
          </View>
        </View>
        <DayView
          date={date}
          index={index}
          format24h={format24h}
          formatHeader={this.props.formatHeader}
          headerStyle={this.props.headerStyle}
          renderEvent={this.props.renderEvent}
          eventTapped={this.props.eventTapped}
          events={item}
          width={width}
          styles={this.styles}
          scrollToFirst={scrollToFirst}
          start={start}
          end={end}
        />
      </View>
    )
  }

  _goToPage(index) {
    if (index <= 0 || index >= this.props.size * 2) {
      return
    }
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      'days'
    )
    this.refs.calendar.scrollToIndex({ index, animated: false })
    this.setState({ index, date })
  }

  _goToDate(date) {
    const earliestDate = moment(this.props.initDate).subtract(
      this.props.size,
      'days'
    )
    const index = moment(date).diff(earliestDate, 'days')
    this._goToPage(index)
  }

  _onBackButton() {
    this.props.backButton()
  }

  render() {
    const { width, virtualizedListProps, events, initDate } = this.props

    return (
      <View style={[this.styles.container, { width }]}>
        <VirtualizedList
          scrollEnabled={false}
          ref="calendar"
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={this.props.size}
          data={events}
          getItemCount={() => this.props.size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          pagingEnabled
          renderItem={this._renderItem.bind(this)}
          style={{ width: width }}
          onMomentumScrollEnd={(event) => {
            const index = parseInt(event.nativeEvent.contentOffset.x / width)
            const date = moment(this.props.initDate).add(
              index - this.props.size,
              'days'
            )
            if (this.props.dateChanged) {
              this.props.dateChanged(date.format('YYYY-MM-DD'))
            }
            this.setState({ index, date })
          }}
          {...virtualizedListProps}
        />
      </View>
    )
  }
}
