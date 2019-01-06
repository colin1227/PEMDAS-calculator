import React, { Component } from "react";
import "./style.css"
import { Form, Button, Grid } from "semantic-ui-react";

export default class Calculator extends Component {
    constructor(){
        super()
        this.state = {
                openP: "[",
                closeP: "]",
                MD: ["*","/","%"],
                AS: ["-","+"],
                exponentUsed: false,
                operatorUsed: false,
                equation:"",
                currentNumber: "",
                decimal: ".",
                numbers: [],
                nonNumbers: [],
                exponentList: []
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
        (this.state.MD.includes(e.currentTarget.value) ||
        this.state.AS.includes(e.currentTarget.value)) && 
        this.state.currentNumber !== ""
        )){
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                nonNumbers: [...this.state.nonNumbers, e.currentTarget.value],
                operatorUsed: true

            })
            this.NewNumber()
        }
        else if(isNaN(e.currentTarget.value) && 
        ((this.state.MD.includes(e.currentTarget.value) ||
        this.state.AS.includes(e.currentTarget.value)) && 
        this.state.currentNumber === "" && 
        this.state.exponentUsed
        )){
            this.setState({
                equation: this.state.equation + e.currentTarget.value,
                nonNumbers: [...this.state.nonNumbers, e.currentTarget.value],
                exponentUsed: false,
                operatorUsed: true
            })
        }

        else if(e.currentTarget.value === "." && 
        decIncluded === false){
            this.addDecimal()
        }

        else if(isNaN(e.currentTarget.value) && 
        ((this.state.MD.includes(e.currentTarget.value) === false ||
        this.state.AS.includes(e.currentTarget.value) === false) 
          ||
        (this.state.currentNumber === "" && 
        (this.state.MD.includes(e.currentTarget.value) === true ||
        this.state.AS.includes(e.currentTarget.value) === true))) ){
            return true;
        }

        else if(this.state.exponentUsed === false){
            if(e.currentTarget.value ===  "3.14159265359"){
                if(this.state.currentNumber !== ""){

                    this.setState({
                        equation: this.state.equation + "*π",
                        numbers:  [...this.state.numbers, parseFloat(e.currentTarget.value)],
                        nonNumbers: [...this.state.nonNumbers + "*"],
                        currentNumber: "",
                        operatorUsed: false,
                        exponentUsed: false
                    })
                }
                else{
                    this.setState({
                        equation: this.state.equation + "π",
                        numbers:  [...this.state.numbers, parseFloat(e.currentTarget.value)],
                        currentNumber: "",
                        operatorUsed: false,
                        exponentUsed: false
                    })
                }
            }
            else{
                this.setState({
                    equation: this.state.equation + e.currentTarget.value,
                    currentNumber: this.state.currentNumber + e.currentTarget.value,
                    operatorUsed: false
                    
                })
            }
        }
        else{
            return
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
            nonNumbers: [],
            exponentList:[],
            exponentUsed: false,
            operatorUsed: false
        })
     }

     exponent = async(e) =>{
        try{ 
            if(this.state.operatorUsed === false && this.state.exponentUsed === false){
                await this.NewNumber();
                this.setState({
                    exponentList: await [...this.state.exponentList, this.state.numbers.length - 1],
                    equation: this.state.equation + "²",
                    exponentUsed: true
                })
                
            }
            else{
                return
            }
        }
        catch(err){
            console.log(err)
        }
     }


    addDecimal = (e) => {
        this.setState({
            currentNumber: this.state.currentNumber + ".",
            equation: this.state.equation + "."
        })
    }


    NewNumber = async() => {
        try{
            this.setState({
                numbers: await [...this.state.numbers, parseFloat(this.state.currentNumber)],
                currentNumber: ""
            })
        }
        catch(err){
            console.log(err)
        }
    }


    preSolve = async() =>{
        try{
            if(this.state.currentNumber !== ""){
                await this.setState({
                    numbers: [...this.state.numbers, parseFloat(this.state.currentNumber)],
                    currentNumber: ""
                })
                this.solve()
            }
            else{
                this.solve()
            }
        }
        catch(err){
            console.log(err)
        }
    }


    solve = async() => {
        try{
            for(let index = 0; index < this.state.exponentList.length; index++){
                
                try{
                    let newNum = this.state.numbers[this.state.exponentList[index]] ** 2
                    let newNumArray = [...this.state.numbers]
                        await newNumArray.splice(this.state.exponentList[index], 1, newNum)
                   
                        await newNumArray.splice(this.state.exponentList[index], 1, newNum)
                    
                    
                    await this.setState({
                        numbers: newNumArray
                    })
                }
                catch(err){
                    console.log(err)
                }
            };
            this.setState({
                exponentList: []
            })
            let val = this.state.nonNumbers.length;
            let moved = 0;
            if(val > 0){

            for(let index = 0; index < val; index++){            
                let more = this.state.nonNumbers.includes("*") || this.state.nonNumbers.includes("/") || this.state.nonNumbers.includes("%")
                let array = this.state.numbers;
                if("*" === this.state.nonNumbers[0 + moved] ){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] * this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])+ 1]
                    let removedIndex = await this.state.numbers.indexOf(this.state.numbers[moved], moved)
                    await array.splice(removedIndex, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                
                    
                }
       
                else if("/" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] / this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let removedIndex = await this.state.numbers.indexOf(this.state.numbers[moved], moved)
                    await array.splice(removedIndex, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }

                else if("%" === this.state.nonNumbers[0 + moved]){
                    let value = this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved])] % this.state.numbers[this.state.nonNumbers.indexOf(this.state.nonNumbers[0 + moved]) + 1]
                    let removedIndex = await this.state.numbers.indexOf(this.state.numbers[moved], moved)
                    await array.splice(removedIndex, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }
                else if(more === false){
                    moved++;
                }
            }


            let val2 = this.state.nonNumbers.length;
            for(let index = 0; index < val2; index++){
                let array = this.state.numbers;
                if("+" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] + this.state.numbers[1];
                    await array.splice(0, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }
       
                else if("-" === this.state.nonNumbers[0]){
                    let value = this.state.numbers[0] - this.state.numbers[1]
                    await array.splice(0, 2, value)
                    await this.state.nonNumbers.shift()
                    await this.setState({
                        numbers: [...array]
                    })
                }
            }
        }
        else{

        }
            return this.setState({
                equation: await this.state.numbers,
                currentNumber: await this.state.numbers,
                numbers: [],
                exponentUsed: false,
                operatorUsed: false
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
                          <Button value="=" onClick={this.preSolve}>=</Button>
                          <Button value="C" onClick={this.clear}>C</Button>
                          <Button value="x²" onClick={this.exponent}>x²</Button>
                          {/* <Button value=" √" onClick={this.exponent}> √</Button> */}

                      </Grid.Row>
                      <Grid.Row>
                          <Button value="9" onClick={this.handleInput}>9</Button>
                          <Button value="8" onClick={this.handleInput}>8</Button>
                          <Button value="7" onClick={this.handleInput}>7</Button>
                          <Button value="/" onClick={this.handleInput}>/</Button>

                          
                      </Grid.Row>
                      <Grid.Row>
                          <Button value="6" onClick={this.handleInput}>6</Button>
                          <Button value="5" onClick={this.handleInput}>5</Button>
                          <Button value="4" onClick={this.handleInput}>4</Button>
                          <Button value="*" onClick={this.handleInput}>*</Button>

                      </Grid.Row>
                      <Grid.Row>
                          <Button value="3" onClick={this.handleInput}>3</Button>
                          <Button value="2" onClick={this.handleInput}>2</Button>
                          <Button value="1" onClick={this.handleInput}>1</Button>
                          <Button value="+" onClick={this.handleInput}>+</Button>
                      </Grid.Row>
                      <Grid.Row>
                          <Button value="3.14159265359" onClick={this.handleInput}>π</Button>
                          <Button value="0" onClick={this.handleInput}>0</Button>
                          <Button value="." onClick={this.handleInput}>.</Button>
                          <Button value="-" onClick={this.handleInput}>—</Button>
                      </Grid.Row>
                    </Grid>
                </Form>
            </div>
        )
    }
}