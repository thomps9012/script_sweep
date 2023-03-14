# Available Endpoints and Methods

### POST <br />/api/classify

Classifies text based on it's scripting language, either by character or word

### POST <br />/api/organize

Organizes and classifies words in a given piece of text based on scripting language

### GET <br />/api/scripts <br /> /api/scripts/:id

Provide detailed information about scripts, one such as name, unicode characters, year created, and text direction
Also allows for the filtering of results based on conditions specified in the request headers

### GET <br />/api/filter

Gives the option to filter text based on a specified language script
