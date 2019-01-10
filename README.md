# PEMDAS/GEMDAS Calculator
### PEMDAS or as the kids these days are calling it GEMDAS, is the Order of Operations
1st P: everything within a pair of <b>Parentheses</b> <br>
2nd E: <b>Exponents</b> <br>
3rd MD: <b>Multiplication</b> and <b>Division</b> <br>
4th AS: <b>Addition</b> and <b>Subtraction</b> <br>

## Functions
1. <b>handleInput</b>

  * First if and else if <br>
  these two conditonal statments are to add opperators to the nonNumbers array in state
  
  * Second else if adds a decimal
  
  * Third else if wont do anything <br>
  for the purpouse of values that aren't number or operators
  
  * Forth else if will add numbers to numbers in state (including π)
  
  * Else statement just returns true
  
2. handleTypeInput(<b>Incomplete</b>)

3. <b>clear</b> <br>
clears then input of all intetionally mutable state

4. <b>exponent</b> <br>
adds an exponent if applicable<br>
as the exponents are added to the specific numbers the index of that number is added the the expontentList in state <br>


5. <b>addDecimal</b> <br>
adds a decimal to states currentNumber

6. <b>NewNumber</b> <br>
 adds the states currentNumber to it numbers array and clears out current number
 
7. <b>preSolve</b> <br>
run when the equal sign is clicked, similar to NewNumber because states currentNumber<br>
is added to numbers array and clears out current number but also calls solve if there's<br>
nothing in states currentNumber then just solve is called.

8. <b>solve</b> <br>
this is the fucntion of all functions. it runs the operators in order hence order of operations.<br>
Since Parentheses have yet to be added Exponents are first, Multiplication an Division are second and <br>
Addition and Subtraction are last. 

There are three for loops that make this function work: <br>
1. the first loop will go through the exponentList in state and find the index of the number and set a variable equal to the number squared this variable is spliced into the numbers array in state in the place of the old number<br>

2. the second loop will go through the nonNumbers array and based of a mutable variable named <b>moved</b> that starts at 0 that will be how the function finds the index of the first number and <b>moved</b> + 1 for the seconond number, if the current operator selected by the loop isn't * or / <b>moved</b> moved is increased by 1. those 2 nmbers wil be set a variable results which is spliced into the numbers array at first numbers index, the two old numbers are removed and the first item from the nonNumbers array in state is spliced out at the apropiate spot in the array.

3. the final for loop does the same thing as the loop that came before it but instead dues addition and subtraction and always pull the first and second number from the numbers array in state to find the results varialbe value.

the way the answer is found by the remaining number left in states numbers.

the specified numbers start with 0 and 1 if the 

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
