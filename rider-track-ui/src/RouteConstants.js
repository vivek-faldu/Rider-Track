
export const HOME_ROUTE = '/';
export const EVENT_REGISTRATION_PATH = '/register/:id';
export const EVENT_CREATION_PATH = '/create-event';
export const EVENT_DETAIL_PATH = '/event/:id';
export const LIVE_MAP = '/live/:id';
export const PARTICIPANT_HISTORY = '/history';
export const REGISTERED_EVENT_DETAIL_PATH = '/userevent/:id';
export const CREATED_EVENTS = '/createdevents';
export const ABOUT_US = '/about';
export const PROFILE = '/profile';
export const EVENT_EDIT_PATH = '/edit-event/:id';

export const FACEBOOK_HANDLE = 'https://www.facebook.com/Rider-Track-101638391309900/';
export const YOUTUBE_HANDLE = 'https://www.youtube.com/channel/UCoJBAtBF1WPTyAISoljCRjw';
export const TWITTER_HANDLE = 'https://twitter.com/';
export const INSTAGRAM_HANDLE = 'https://www.instagram.com/';

const showPosition = (position) => {
    return "Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude;
}

export const getLocation = () => {

    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
    }
    return 'Location cannot be fetched';
};
