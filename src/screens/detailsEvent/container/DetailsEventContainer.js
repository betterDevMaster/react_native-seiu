import DetailsEventView from './DetailsEventView';
import {connect} from 'react-redux';
import {setEvents, setCurrentEvent} from '../../events/actions';

const mapStateToProps = state => ({
  currentEvent: state.events.currentEvent,
  events: state.events.events,
  currentUser: state.register.user,
});

const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events)),
  setCurrentEvent: currentEvent => dispatch(setCurrentEvent(currentEvent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsEventView);
