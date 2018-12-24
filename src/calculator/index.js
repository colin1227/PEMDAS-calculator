import React, { Component } from "react";
import { Form, Button, Grid } from "semantic-ui-react";

export default class Calculator extends Component {
    constructor(){
        super()
        this.state = {
                openP: "[",
                closeP: "]",
                E: ["**2","**3"],
                MD: ["*","/","%"],
                AS: ["-","+"],
                equation:"",
                currentNumber: "",
                decimal: ".",
                moved: 0,
                numbers: [],
                nonNumbers: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleTypeInput = this.handleTypeInput.bind(this);
        this.solve = this.solve.bind(this);
        this.NewNumber = this.NewNumber.bind(this);
    }

    handleInput = (e) =>{
        if(isNaN(e.currentTarget.value) && 
        (this.state.decimal !== e.currentTarget.value ||
         this.state.openP === e.currentTarget.value ||
         this.state.closeP === e.currentTarget.value || 
        this.state.MD.includes(e.currentTarget.value) ||
        this.state.AS.includes(e.currentTarget.value))){
            
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                nonNumbers: [...this.state.nonNumbers, e.currentTarget.value]
            })
            this.NewNumber()
        } 
        else if(isNaN(e.currentTarget.value) && 
        (this.state.P.includes(e.currentTarget.value) === false || 
        this.state.MD.includes(e.currentTarget.value) === false ||
        this.state.AS.includes(e.currentTarget.value) === false)){
            return true;
        }
        else{
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                currentNumber: this.state.currentNumber + e.currentTarget.value
            })
        }
    }

    handleTypeInput = (e) =>{
        // this.setState({
        //     equation: e.currentTarget.value
        // })
        console.log()
    }

    NewNumber = async() => {
        try{
           await this.setState({
             numbers: [...this.state.numbers, parseFloat(this.state.currentNumber)],
             currentNumber: ""
           })
        }
        catch(err){
        console.log(err)
    }
    }

    solve = async() => {
        try{
            await this.setState({
                numbers: [...this.state.numbers, parseFloat(this.state.currentNumber)],
                currentNumber: ""
            })

            let MDIndex = [];
            let ASIndex = [];
            let zero = 0;
            this.state.nonNumbers.forEach(async(element, i)=>{
                try{
                    if(element === "*" || element === "/" || element === "%" ){
                        MDIndex.push(i)
                    }
                    else if(element === "+" || element === "-"){
                        ASIndex.push(i)
                    }  
                }
                catch(err){
                    console.log("error nonNumbers")
                }
            })
       // console.log("ASIndex", ASIndex)
      for(let element = 0; element < MDIndex.length; element++){
        if(element !== 0){
            zero++;
        }

        if("*" === this.state.nonNumbers[MDIndex[element]]){
            let value = this.state.numbers[MDIndex[element] - element ] * this.state.numbers[MDIndex[element] - element + 1]
            const results = await this.state.numbers.filter( number => 
                number !== this.state.numbers[MDIndex[element] - element + 1] && number !== this.state.numbers[MDIndex[element] - element]
                )
            if(results.length > 0){
                await results.splice(MDIndex[element]- element, 0, value);
                await this.setState({
                    numbers: results
                })
            }
            else{
                await results.push(value)
                await this.setState({
                    numbers: results
                })
            }
        }
       
        if("/" === this.state.nonNumbers[MDIndex[element]]){
            let value = this.state.numbers[MDIndex[element] - element ] / this.state.numbers[MDIndex[element] - element + 1]
            let results = await this.state.numbers.filter( number => 
                number !== this.state.numbers[MDIndex[element] - element + 1] && number !== this.state.numbers[MDIndex[element] - element]
            )
            if(results.length > 0){
                await results.splice(MDIndex[element]- element, 0, value);
                await this.setState({
                    numbers: results
                })
            }
            else{
                await results.push(value)
                await this.setState({
                    numbers: [...results]
                })
            }
        }

        if("%" === this.state.nonNumbers[MDIndex[element]]){
            let value = this.state.numbers[MDIndex[element] - element ] % this.state.numbers[MDIndex[element] - element + 1]
            let results = await this.state.numbers.filter( number => 
                number !== this.state.numbers[MDIndex[element] - element + 1] && number !== this.state.numbers[MDIndex[element] - element]
            )
            if(results.length > 0){
                await results.splice(MDIndex[element]- element, 0, value);
                await this.setState({
                    numbers: results
                })
            }
            else{
                await results.push(value)
                await this.setState({
                    numbers: [...results]
                })
            }
        }
      }
    
        await this.setState({
            equation: this.state.numbers
        })
         }
        catch(err){
            console.log(err)
        }

    }

    render() {
        return(
            <div>
                <h2>moved: {this.state.moved}</h2>
                <b>numbers: {this.state.numbers}</b>
                <b> current number: {this.state.currentNumber}</b>
                <Form>
                  <Form.Input onChange={this.handleTypeInput} value={this.state.equation} type="text"/>
                    <Grid columns={4}>
                      <Grid.Row>
                          <Button value="=" onClick={this.solve}>=</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="9" onClick={this.handleInput}>9</Button>
                      <Button value="8" onClick={this.handleInput}>8</Button>
                      <Button value="7" onClick={this.handleInput}>7</Button>
                      <Button value="%" onClick={this.handleInput}>%</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="6" onClick={this.handleInput}>6</Button>
                      <Button value="5" onClick={this.handleInput}>5</Button>
                      <Button value="4" onClick={this.handleInput}>4</Button>
                      <Button value="/" onClick={this.handleInput}>/</Button>
 
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="3" onClick={this.handleInput}>3</Button>
                      <Button value="2" onClick={this.handleInput}>2</Button>
                      <Button value="1" onClick={this.handleInput}>1</Button>
                      <Button value="*" onClick={this.handleInput}>*</Button>
                      </Grid.Row>
                      <Grid.Row>
                      <Button value="." onClick={this.handleInput}>.</Button>
                      <Button value="0" onClick={this.handleInput}>0</Button>
                      <Button value="+" onClick={this.handleInput}>+</Button>
                      <Button value="-" onClick={this.handleInput}>-</Button>
                      
                      </Grid.Row>
                       </Grid>
                </Form>
            </div>
        )
    }
}