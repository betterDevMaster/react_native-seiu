import EventsView from './EventsView';
import {connect} from 'react-redux';
import {setEvents, setCurrentEvent} from '../actions';

const mapStateToProps = state => ({
  currentUser: state.register.user,
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events)),
  setCurrentEvent: currentEvent => dispatch(setCurrentEvent(currentEvent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
