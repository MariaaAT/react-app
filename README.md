# React App

## Project's Overview
*"Knowledge does not take place"* 

My interest in programming is growing day by day. This time I learnt React in order to o build more 
customised interactive user interfaces for the web than StreamLit or other Python libraries would allow. 
For that I taught myself HTML5 and CSS to create custom components together with off-the-shelf open source 
components available in the node package registry. Once again, I wanted to merge my interest in the environment 
and data science. Therefore, this project shows interactive plots and tables of the electricity prices from the 
current and next day, and the last year's water filling levels of lakes compared with historical values. The 
website navigator allows the user navigate through the different plots. 

### Data Acquisition

The water filling capacity data was obtained from the [NVE's API](http://api.nve.no/doc/magasinstatistikk/), 
whereas the energy prices data from the [Hvakosterstrommen API](https://www.hvakosterstrommen.no/strompris-api).
An API key wasn't required to get the values.

## Installation

This runs in any operating system and can be installed via `pip` directly from GitHub.

```
$ git clone git@github.com:MariaaAT/react-app.git 
$ cd src/
$ pip install 
```

In order to run the project and see the React App, run the following command:

```
$ npm start 
```

## Lessons learnt

- [x] useEffect and useState React Components
- [x] Create my own components and incorporate them in the main App file
- [x] Link components in a web navigator
- [x] New programming tools: JavaScript, HTML5 and CSS (specifically the app was styled using Pico.css)

## Future Challenges

*"Perfection is attained by slow degrees; it requires the hand of time."*
                                                                        - *Voltaire*

- [] Correct the week x-axis in FillingLevels.js
- [] Improve the style
- [] Continue learning and improving!