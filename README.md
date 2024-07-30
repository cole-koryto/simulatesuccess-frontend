# Simulate Success Retirement Calculator

## Purpose
The purpose of this site is to allow users to get an understanding of how their retirement portfolio will perform.
Users can enter the details of their financial situation to see how their situation could unfold across many different simulations.
They can then see how their situation unfolds through summary statistics and graphically through the balance percentile chart.
Users can provide inputs through both the site form directly or by uploading a previously saved inputs json.
If they want, users can also export their simulation results to a json file.

## Inputs
Here is an explanation of all of the inputs that are directly available on the site:

**Current Balance**: Current net balance of the user's total portfolio in today's dollars. 

**Annual Return**: The annual return of the user's total portfolio represented as a decimal number (e.g., 0.06 = 6%).

**Return Standard Dev.**: Annual standard deviation of user's total portfolio represented as a decimal number (e.g. 0.06 = 6%).

**Current Age**: User's current age as an integer.

**Life Expectancy**: How long the user expects to live, also can be considered the year to end the simulation. The simulation is over by this age (i.e. age is not inclusive). 

**Inflation**: Assumed annual inflation rate over entire simulation. Inflates all spending sources and none of the income sources. Applies to every year from current age to end of simulation even if spending source starts later.

**Number of Simulations**: The total number of simulations the program will run to explore the possible outcomes given the inputs. Capped at 10,000.

**Repeatable Results**: Whether the results of the simulations should be deterministic (i.e. if True, the same inputs will always result in the same outputs, otherwise results can vary each run due to random chance). This is implemented with random_state varaible that is set to 1 when Repeatable Results is true and none otherwise.

**Income Sources**: All sources of income during the simulation. Title is not necessary and is only used to increase user understanding. Amount is the annual amount of income from this source in today's dollars. Starting age is the age at which the income will start to be applied. Ending age is the year the income will no longer only apply, and this age is not inclusive (i.e. last income will be applied at ending age - 1). Growth is the annual amount the income source will grow per year. Income sources are not affected by inflation. Income sources are not required.

**Spending Sources**: All sources of spending during the simulation. Title is not necessary and is only used to increase user understanding. Amount is the annual amount of spending from this source in today's dollars. Starting age is the age at which the spending will start to be applied. Ending age is the year the spending will no longer only apply and, this age is not inclusive (i.e. last spending amount will be applied at ending age - 1). Growth is the annual amount the spending source will grow per year. Spending sources are affected by both their own growth rate and inflation independently. Spending sources are not required.

**Balance Percentiles**: These percentiles will be displayed in the Percentile Balance History chart and are represented with just numbers (e.g. 25 = 25%). For each percentile, it is that balance that was higher than x% of the other balances in the final year (e.g. the 75% balance was higher than 75% of the other balances in the final year).

**Distribution Type**: The type of statistical distribution to use when running the simulations (Normal or Laplace). Distributions use annual return and annual return standard deviation  as their parameters to simulate returns for each year of each simulation.


## Usage
There are two ways to provide inputs into the program. The first way is to manually type each of required fields into the input form and then click "Submit Form Inputs" when all of the data is entered.
The other option is to click the "Choose File" button and to select a json file that contains previously stored inputs for the simulation and then click "Submit Inputs From JSON".

Once either of these options has been performed, the balance percentile data will appear in the Percentile Balance History chart, summary statistics, and net income table. Please not that the Success Rate statistic is calculated by determining the percentage of simulation balances in the final year that were greater than or equal to zero.

Both the simulation inputs and all of the simulation results can be exported to json files by pressing their respective buttons below the inputs form.


## Setup
To set up this site locally, clone this GitHub repo. 
Then run these commands in the local repo:

`npm install`

`npm run dev`https://github.com/cole-koryto/simualtesuccess-api

## Backend
The code for the site backend and more documentation can be found at [cole-koryto/simualtesuccess-api](https://github.com/cole-koryto/simualtesuccess-api)
