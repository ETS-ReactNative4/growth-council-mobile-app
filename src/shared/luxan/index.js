import {DateTime, Settings} from 'luxon'

// Example to set EST as the default timezone in the app.
Settings.defaultZoneName = 'America/New_York'

export {DateTime, Settings}