import AddEventView from './AddEventView';
import {connect} from 'react-redux';
import {setEvents, setCurrentEvent} from '../../events/actions';

const mapStateToProps = state => ({
  currentUser: state.register.user,
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  setEvents: events => dispatch(setEvents(events)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventView);
