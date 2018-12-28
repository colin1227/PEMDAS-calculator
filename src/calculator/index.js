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
        this.preSolve = this.preSolve.bind(this);
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
    preSolve = async() =>{
        try{
            await this.setState({
                numbers: [...this.state.numbers, parseFloat(this.state.currentNumber)],
                currentNumber: ""
            })
            this.solve()
        }
        catch(err){
            console.log(err)
        }
    }
    solve = async() => {
        try{
            let ASIndex = [];
            
            this.state.nonNumbers.forEach((element, i) =>{
                if(element === "+"|| element === "-"){
                    ASIndex.push(i)
                }
            });
            let val = this.state.nonNumbers.length;
            for(let index = 0; index < val; index++){
            let moved = 0;
            let more = this.state.nonNumbers.includes("*") || this.state.nonNumbers.includes("/") || this.state.nonNumbers.includes("%")

                if("*" === this.state.nonNumbers[0 + moved] ){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] * this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])+ 1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[index]) - index, 0, value);
                        let newNons = this.state.nonNumbers.shift()
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: [...newNons]
                        })
                    }
                    else{
                        let newNons = await this.state.nonNumbers.shift()
                        await results.push(value)
                        await this.setState({
                            numbers: results,
                            nonNumbers: [...newNons]
                        })
                    }
                }
       
                else if("/" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] / this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]), 0, value);
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: results,
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                }

                else if("%" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] % this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    console.log(value)
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]), 0, value);
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: results,
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                }
                else{
                    console.log("asdf")
                    moved++;
                }
            }


            let val2 = this.state.nonNumbers.length;
            moved = 0;
            for(let index = 0; index < val2; index++){
                if("+" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] + this.state.numbers[1];
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[1] && number !== this.state.numbers[0]
                    )
                    if(results.length > 0){
                        await results.splice(0, 0, value);
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                }
       
                else if("-" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] - this.state.numbers[1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[1] && number !== this.state.numbers[0]
                    )
                    if(results.length > 0){
                        await results.splice(0, 0, value);
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results],
                            nonNumbers: this.state.nonNumbers.shift()
                        })
                    }
                }
            }

            return await this.setState({
                equation: this.state.numbers
            })
        }
        catch(err){
            console.log("error on solve")
        }

    }

    render() {
        return(
            <div>
                <h2>index: {this.state.moved}</h2>
                <b>numbers: {this.state.numbers}</b>
                <b> current number: {this.state.currentNumber}</b>
                <Form>
                  <Form.Input onChange={this.handleTypeInput} value={this.state.equation} type="text"/>
                    <Grid columns={4}>
                      <Grid.Row>
                          <Button value="=" onClick={this.preSolve}>=</Button>
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