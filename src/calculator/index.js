import React, { Component } from "react";
import "./style.css"
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
                numbers: [],
                nonNumbers: []
        }
        this.preSolve = this.preSolve.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleTypeInput = this.handleTypeInput.bind(this);
        this.solve = this.solve.bind(this);
        this.NewNumber = this.NewNumber.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
    }


    handleInput = (e) =>{
        let decIncluded = this.state.currentNumber.includes(".")
        
        if(isNaN(e.currentTarget.value) && (
        this.state.MD.includes(e.currentTarget.value) ||
        this.state.AS.includes(e.currentTarget.value)) && this.state.currentNumber !== "" ){
            console.log("1")
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                nonNumbers: [...this.state.nonNumbers, e.currentTarget.value]
            })
            this.NewNumber()
        } 

        else if(e.currentTarget.value === "." && 
        decIncluded === false){
            console.log("2")
            this.addDecimal()
        }

        else if(isNaN(e.currentTarget.value) && 
        ((this.state.MD.includes(e.currentTarget.value) === false ||
        this.state.AS.includes(e.currentTarget.value) === false) 
          ||
        (this.state.currentNumber === "" && 
        (this.state.MD.includes(e.currentTarget.value) === true ||
        this.state.AS.includes(e.currentTarget.value) === true)))){
            console.log("3")
            return true;
        }

        else{
            console.log("4")
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                currentNumber: this.state.currentNumber + e.currentTarget.value
            })
        }
    }
    

    handleTypeInput = (e) =>{
        // const decIncluded = this.state.currentNumber.includes(".")
        // if(isNaN(e.currentTarget.value) && 
        // (this.state.MD.includes(e.currentTarget.value) ||
        // this.state.AS.includes(e.currentTarget.value))){
            
        //     this.setState({
        //         equation: this.state.equation + e.currentTarget.value,
        //         nonNumbers: [...this.state.nonNumbers, e.currentTarget.value]
        //     })
        //     this.NewNumber()
        // } 

        // else if(isNaN(e.currentTarget.value) && 
        // ((this.state.P.includes(e.currentTarget.value) === false || 
        // this.state.MD.includes(e.currentTarget.value) === false ||
        // this.state.AS.includes(e.currentTarget.value) === false) 
        //   ||
        // (this.state.currentNumber === "" && 
        // (this.state.MD.includes(e.currentTarget.value) === true ||
        // this.state.AS.includes(e.currentTarget.value) === true)))){
        //     return true;
        // }
        // else if(e.currentTarget.value === "." && 
        // this.state.currentNumber !== "" &&
        // decIncluded === false){
        //     this.addDecimal()
        // }
        // else{
        //     this.setState({
        //         equation: e.currentTarget.value,
        //         currentNumber: e.currentTarget.value
        //     })
        // }
    }


    clear = () => {
        this.setState({
            equation: "",
            currentNumber: "",
            numbers: [],
            nonNumbers: []
        })
     }


    addDecimal = (e) => {
        this.setState({
            currentNumber: this.state.currentNumber + ".",
            equation: this.state.equation + "."
        })
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
            let moved = 0;
            for(let index = 0; index < val; index++){            
                let more = this.state.nonNumbers.includes("*") || this.state.nonNumbers.includes("/") || this.state.nonNumbers.includes("%")
                
                if("*" === this.state.nonNumbers[0 + moved] ){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] * this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])+ 1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    await this.state.nonNumbers.shift()
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[index]) - index, 0, value);
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                }
       
                else if("/" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] / this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    await this.state.nonNumbers.shift()
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]), 0, value);
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                }

                else if("%" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] % this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1] && number !== this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])]
                    )
                    await this.state.nonNumbers.shift()
                    if(results.length > 0){
                        await results.splice(this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]), 0, value);
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                }
                else if(more === false){
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
                    await this.state.nonNumbers.shift()
                    if(results.length > 0){
                        await results.splice(0, 0, value);
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                    else{
                        await results.push(value)
                        await this.setState({
                            numbers: [...results]
                        })
                    }
                }
       
                else if("-" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] - this.state.numbers[1]
                    let results = await this.state.numbers.filter( number => 
                        number !== this.state.numbers[1] && number !== this.state.numbers[0]
                    )
                    await this.state.nonNumbers.shift()
                    if(results.length > 0){
                        await results.splice(0, 0, value);
                        await this.setState({
                            numbers: [...results]
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

            return await this.setState({
                equation: this.state.numbers,
                currentNumber: this.state.numbers,
                numbers: []
            })
        }
        catch(err){
            console.log(err)
        }

    }

    render() {
        return(
            <div>
                <b>numbers: {this.state.numbers}</b>
                <b> current number: {this.state.currentNumber}</b>
                <Form>
                  <Form.Input onChange={this.handleTypeInput} value={this.state.equation} type="text"/>
                    <Grid columns={4}>
                      <Grid.Row>
                          <Button value="=" onClick={this.preSolve} className="asdf">=</Button>
                          <Button value="C" onClick={this.clear} className="asdf">C</Button>

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